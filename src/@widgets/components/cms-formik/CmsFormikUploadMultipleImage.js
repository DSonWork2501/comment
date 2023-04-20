import React, { useRef } from 'react'
import {
    Icon,
    makeStyles
} from '@material-ui/core'
import * as PropTypes from 'prop-types';
import { colors } from '@material-ui/core';
// import FileProperties from '@widgets/metadatas/FileProperties';
import clsx from 'clsx'
import CmsAlert from '../CmsAlert';

const useStyles = makeStyles(theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: colors.orange[400],
        opacity: 0
    },
    productImageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
    },
    productImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            '& $productImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $productImageFeaturedStar': {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
}));

/**
 * 
 * @description Component CmsUploadMultipleImage
 */
function CmsFormikUploadMultipleImage(props) {
    const classes = useStyles(props);
    const fileRef = useRef(props);
    const {
        formik,
        className,
        name,
        onChange,
        onDelete,
        domain,
        CheckError
    } = props
    function handleUploadChange(e) {
        if (CheckError) {
            CmsAlert.fire({
                heightAuto: false,
                icon: 'warning',
                text: CheckError
            })
            if (fileRef) fileRef.current.value = null;
        } else {
            const files = e.target.files;
            if (!files) {
                return;
            }
            onChange && onChange(files)
        }
    }
    function handleSetField(id, index_item) {
        formik.setFieldValue(name, formik.values[name].filter((x, index) => index !== index_item));
        onDelete && onDelete(id)
    }
    let array = formik && formik.values && formik.values[name]

    return (
        <div className={className}>
            <input
                ref={fileRef}
                accept="image/*"
                className="hidden"
                id="button-file"
                type="file"
                multiple
                onChange={handleUploadChange}
            />
            <div className="flex justify-center sm:justify-start flex-wrap">
                <label
                    htmlFor="button-file"
                    className={
                        clsx(
                            classes.productImageUpload,
                            "flex items-center justify-center relative w-160 h-160 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
                        )}
                >
                    <Icon fontSize="large" color="action">cloud_upload</Icon>
                </label>
                {array?.map((item, index) => (
                    <div
                        className={
                            clsx(
                                classes.productImageItem,
                                "flex items-center justify-center relative w-160 h-160 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5",
                                // (media.id === form.featuredImageId) && 'featured'
                            )
                        }
                        key={`${index}_image_div`}
                    >
                        <Icon key={`${index}_icon`} className={classes.productImageFeaturedStar} onClick={() => handleSetField(item.id, index)}>clear</Icon>
                        <img key={`${index}_image`} className="max-w-none w-auto h-full" src={`${domain}${item}`} alt="images" />
                    </div>
                )) || <></>}
            </div>
        </div>
    )
}

CmsFormikUploadMultipleImage.propTypes = {
    formik: PropTypes.any,
    label: PropTypes.string,
    name: PropTypes.string,
    domain: PropTypes.string
}

CmsFormikUploadMultipleImage.defaultProps = {
    label: "",
    image: [],
    name: "",
    domain: ""
}

export default React.memo(CmsFormikUploadMultipleImage)
