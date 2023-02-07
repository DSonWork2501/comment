import React from 'react'
import {
    Icon,
    makeStyles
} from '@material-ui/core'
import * as PropTypes from 'prop-types';
import { colors } from '@material-ui/core';
// import FileProperties from '@widgets/metadatas/FileProperties';
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : colors.orange[400],
        opacity : 0
    },
    productImageUpload      : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
    },
    productImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            '& $productImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $productImageFeaturedStar'      : {
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
    const {
        formik,
        className,
        name,
        onChange,
        onDelete
    } = props
    function handleUploadChange(e)
    {
        const files = e.target.files;
        if ( !files )
        {
            return;
        }
        let array = formik.values[name]
        // let fileArr = []
        
        formik.setFieldValue(name,
            [
                ...array.map((x,index)=>({id: index, url: x.url, position: index + 1, isNew: x.isNew})),
                ...Object.values(files).map((file, index)=>(
                    {
                        'id'  : array.length + index,
                        'url' : URL.createObjectURL(file),
                        'position': array.length + 1 + index,
                        'isNew': 1
                    }
                ))
            ]
        );
        onChange && onChange(Object.values(files).map((x, index)=>({
            'id'  : array.length + index,
            'file' : x,
            'position': array.length + 1 + index
        })))

        // reader.onerror = function () {
        //     console.log("xảy ra lỗi khi upload hình!");
        // };
    }
    function handleSetField(id)
    {
        formik.setFieldValue(name, formik.values[name].filter(x=>x.id !== id));
        onDelete && onDelete(id)
    }
    let array = formik && formik.values && formik.values[name]
    return (
        <div className={className}>
            <input
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
                            "flex items-center justify-center relative w-208 h-208 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
                        )}
                >
                    <Icon fontSize="large" color="action">cloud_upload</Icon>
                </label>
                {array.map(item => (
                    <div
                        className={
                            clsx(
                                classes.productImageItem,
                                "flex items-center justify-center relative w-208 h-208 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5",
                                // (media.id === form.featuredImageId) && 'featured'
                                )
                        }
                        key={item.id}
                    >
                        <Icon  className={classes.productImageFeaturedStar} onClick={() => handleSetField(item.id)}>clear</Icon>
                        <img className="max-w-none w-auto h-full" src={item.url} alt="images"/>
                    </div>
                ))}
            </div>
        </div>
    )
}

CmsFormikUploadMultipleImage.propTypes = {
    formik: PropTypes.any,
    label: PropTypes.string,
    name: PropTypes.string
}

CmsFormikUploadMultipleImage.defaultProps = {
    label: "",
    image: [],
    name: ""
}

export default React.memo(CmsFormikUploadMultipleImage)
