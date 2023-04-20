import React, { useState, useEffect } from 'react';
import {
    IconButton,
    Icon,
    Typography,
    Paper
} from '@material-ui/core'
import * as PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { orange } from '@material-ui/core/colors'
import noImage from '@widgets/images/noImage.jpg'
import styled, { css } from "styled-components"
import LoadingOverlay from 'react-loading-overlay';
import CmsAlert from './CmsAlert';
import { useRef } from 'react';

/**
 * 
 * @description Component CmsImageBox
 */

const DarkBackground = styled.div`
 display: none; /* Hidden by default */
 position: absolute; /* Stay in place */
 z-index: 999; /* Sit on top */
 left: 0;
 top: 7px;
 width: 100%; /* Full width */
 height: 98%; /* Full height */
 overflow: auto; /* Enable scroll if needed */
 background-color: rgb(0, 0, 0); /* Fallback color */
 background-color: rgba(0, 0, 0, 0.4);
 ${props =>
        props.disappear &&
        css`
 display: block; /* show */
 `}
`;

const useStyles = makeStyles(theme => ({
    imageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: orange[400],
        opacity: 0
    },
    imageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
    },
    imageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            '& $imageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $imageFeaturedStar': {
                opacity: 1
            },
            '&:hover $imageFeaturedStar': {
                opacity: 1
            }
        }
    }
}));

function CmsImageBox2(props) {
    const classes = useStyles(props)
    const { divBeforeImage, title, btitle, btitleClassName, value, setValue, styleImage, id, loading, disablebtitle = false, disable = false, moreOption, CheckError } = props
    const [image, setImage] = useState(null)
    const fileRef = useRef(); 

    useEffect(() => {
        if (value) {
            setImage(value)
        }
    }, [value])

    const handleUploadChange = async (e) => {
        function readFileAsync() {
            return new Promise((resolve, reject) => {
                const file = e.target.files[0];
                setValue(file)
                if (!file) {
                    return
                }
                const reader = new FileReader();
                reader.onload = () => {
                    resolve(`data:${file.type};base64,${btoa(reader.result)}`);
                }
                reader.onerror = reject
                reader.readAsBinaryString(file);
            })
        }
        if(CheckError){
            CmsAlert.fire({
                heightAuto: false,
                icon: 'warning',
                text: CheckError
            })
            if (fileRef) fileRef.current.value = null;
        }else{
            const newImage = await readFileAsync();
            setImage(newImage)
        }
    }
    return (
        <div className="w-full flex flex-col justify-between">
            {title && <div className="flex items-center justify-between">
                <Typography className="text-16 px-16 font-medium" color="textSecondary">
                    {title}
                </Typography>
                {moreOption && <IconButton size="small">
                    <Icon>more_vert</Icon>
                </IconButton>}
            </div>}
            <div className="text-center py-12">
                <Paper className="w-full rounded-8 shadow-5 overflow-hidden hover:shadow-20 relative grid justify-items-center">
                    <div className="text-center p-16">
                        {disable === false && <input accept="image/*" ref={fileRef} className="hidden" id={`image-file_${id}`} name="image" type="file" onChange={handleUploadChange} />}
                        <label htmlFor={`image-file_${id}`}>
                            <div className={clsx(classes.imageItem, "flex items-center justify-center relative cursor-pointer", divBeforeImage)}>
                                {!image && <img className={styleImage.className} width={styleImage.width || ''} height={styleImage.height || ''} src={noImage} alt={"NoImage"} />}
                                {image && <img className={styleImage.className} width={styleImage.width || ''} height={styleImage.height || ''} src={image} alt={"Content"} />}
                            </div>
                        </label>
                    </div>
                    <DarkBackground disappear={loading} id={`image-file_${id}_loading`}>
                        <LoadingOverlay
                            className='absolute h-full'
                            styles={{
                                wrapper: {
                                    height: '100%',
                                    width: '100%'
                                },
                            }}
                            active={true}
                            // spinner={<BounceLoader />}
                            spinner={true}
                            text="Đang upload hình..."
                        >
                        </LoadingOverlay>
                    </DarkBackground>
                </Paper>
            </div>
            {disablebtitle === false && <Typography className="p-20 pt-0 h-56 flex justify-center items-end text-13 font-medium" color="textSecondary">
                <span className={clsx(btitleClassName, "truncate")}>{btitle}</span>
            </Typography>}
        </div>
    );
}

CmsImageBox2.propTypes = {
    title: PropTypes.string,
    btitle: PropTypes.string,
    value: PropTypes.any,
    setValue: PropTypes.func,
    styleImage: PropTypes.object,
    id: PropTypes.string,
    loading: PropTypes.bool,
    btitleClassName: PropTypes.string,
    disablebtitle: PropTypes.bool,
    disable: PropTypes.bool,
    moreOption: PropTypes.object,
    divBeforeImage: PropTypes.string,
    fileRef: PropTypes.any
}

CmsImageBox2.defaultProps = {
    title: "",
    btitle: "",
    value: null,
    setValue: null,
    styleImage: { height: '', width: '', className: 'max-w-none w-auto' },
    id: '',
    loading: false,
    btitleClassName: "",
    disablebtitle: false, 
    disable: false,
    moreOption: null,
    divBeforeImage: '',
}

export default React.memo(CmsImageBox2)
