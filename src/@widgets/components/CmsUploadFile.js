import React, { useState } from 'react'
import {
    Typography,
    Button,
    Icon
} from '@material-ui/core'
import * as PropTypes from 'prop-types';
import FileProperties from '@widgets/metadatas/FileProperties';

/**
 * 
 * @description Component CmsUploadFIle
 */
function CmsUploadFile(props) {
    const {
        id,
        className,
        setValue,
        label,
        size,
        showFileName,
        fileProperties,
        isMultiple
    } = props
    const [file, setFile] = useState([])
    const handleChange = e => {
        const files = e.target.files
        setFile(Object.values(files))
        setValue(Object.values(files), setLoading)
    }
    const [loading, setLoading] = useState(false)

    return (
        <div className={className}>
            {isMultiple ? (
                <input multiple accept={fileProperties.accept} id={`widgets-upload-file-${id}`} type="file" style={{ display: "none" }} disabled={loading} onChange={handleChange} />
            ) : (<input accept={fileProperties.accept} id={`widgets-upload-file-${id}`} type="file" style={{ display: "none" }} disabled={loading} onChange={handleChange} />
            )}
            <label className="flex flex-row items-center space-x-3" htmlFor={`widgets-upload-file-${id}`}>
                <Button
                    variant="contained"
                    startIcon={loading ? <Icon className="animate-spin">cached</Icon> : <Icon>cloud_upload</Icon>}
                    component="span"
                    color="secondary"
                    size={size}
                    className="normal-case font-normal"
                    disabled={loading}
                >
                    {label || "Chọn file"}
                </Button>
                {showFileName && file.length === 1 && <Typography variant="subtitle2">{file[0].name}</Typography>}
                {showFileName && file.length > 1 && <Typography>{`Total: ${file.length} files`}</Typography>}
                {showFileName && file.length === 0 && <Typography>Vui Lòng Upload Files !</Typography>}
            </label>
        </div>
    )
}

CmsUploadFile.propTypes = {
    label: PropTypes.string,
    id: PropTypes.any,
    className: PropTypes.string,
    setValue: PropTypes.func,
    showFileName: PropTypes.bool,
    fileProperties: PropTypes.any, // fileProperties '@widgets/metadatas/FileProperties'
    isMultiple: PropTypes.bool,
    size: PropTypes.oneOf(["large", "medium", "small"]),
}

CmsUploadFile.defaultProps = {
    label: "",
    id: 0,
    className: "",
    setValue: null,
    showFileName: false,
    fileProperties: FileProperties["other"],
    isMultiple: false,
    size: "medium"
}

export default React.memo(CmsUploadFile)
