import React, { useEffect, useRef, useState } from 'react'
import {
    Typography,
    Button,
    Icon,
    FormHelperText
} from '@material-ui/core'
import * as PropTypes from 'prop-types';
import FileProperties from '@widgets/metadatas/FileProperties';
import { get } from 'lodash';

/**
 * 
 * @description Component CmsUploadFIle
 */
function CmsFormikUploadFile(props) {
    const {
        id,
        className,
        setValue,
        label,
        size,
        showFileName,
        fileProperties,
        isMultiple,
        formik,
        name
    } = props
    const [file, setFile] = useState([])
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false)

    const resetFile = () => {
        inputRef.current.value = null;
        setFile([]);
    };

    const handleChange = e => {
        const files = e.target.files;
        let form = null;
        setFile(Object.values(files))
        if (formik) {
            formik.setFieldValue(name, isMultiple ? files : files[0]);
            form = formik;
        }
        setValue && setValue(Object.values(files), { setLoading, resetFile, form })
    }

    const { values, isSubmitting } = formik, fileData = values[name];
    useEffect(() => {
        if (!fileData && !isSubmitting) {
            resetFile()
        }
    }, [fileData, isSubmitting])

    return (
        <div className={className}>
            {isMultiple ? (
                <input ref={inputRef} multiple accept={fileProperties.accept} id={`widgets-upload-file-${id}`} type="file" style={{ display: "none" }} disabled={loading} onChange={handleChange} />
            ) : (<input ref={inputRef} accept={fileProperties.accept} id={`widgets-upload-file-${id}`} type="file" style={{ display: "none" }} disabled={loading} onChange={handleChange} />
            )}
            <label className="flex flex-row items-center space-x-3" htmlFor={`widgets-upload-file-${id}`}>
                <Button
                    variant="contained"
                    startIcon={formik?.isSubmitting ? <Icon className="animate-spin">cached</Icon> : <Icon>cloud_upload</Icon>}
                    component="span"
                    color="secondary"
                    size={size}
                    className="normal-case font-normal"
                    disabled={formik?.isSubmitting}
                >
                    {label || "Chọn file"}
                </Button>
                {showFileName && file.length === 1 && <Typography variant="subtitle2">{file[0].name}</Typography>}
                {showFileName && file.length > 1 && <Typography>{`Total: ${file.length} files`}</Typography>}
                {showFileName && file.length === 0 && <Typography>Vui Lòng Upload Files !</Typography>}
            </label>
            {
                formik && get(formik?.touched, name) && Boolean(get(formik?.errors, name))
                &&
                <FormHelperText
                    style={{
                        color: '#f44336'
                    }}
                    className='mx-16'
                >
                    {get(formik.errors, name)}
                </FormHelperText>
            }
        </div>
    )
}

CmsFormikUploadFile.propTypes = {
    label: PropTypes.string,
    id: PropTypes.any,
    className: PropTypes.string,
    setValue: PropTypes.func,
    showFileName: PropTypes.bool,
    fileProperties: PropTypes.any, // fileProperties '@widgets/metadatas/FileProperties'
    isMultiple: PropTypes.bool,
    size: PropTypes.oneOf(["large", "medium", "small"]),
}

CmsFormikUploadFile.defaultProps = {
    label: "",
    id: 0,
    className: "",
    setValue: null,
    showFileName: false,
    fileProperties: FileProperties["other"],
    isMultiple: false,
    size: "medium"
}

export default React.memo(CmsFormikUploadFile)
