import React, { useState, useEffect } from 'react'
import {
    Button,
    Typography,
    Tooltip,
    Icon,
    Switch,
    colors
} from '@material-ui/core';
import * as PropTypes from 'prop-types';
import noImage from '@widgets/images/noImage.jpg';
import { convertSizeImage, convertTypeImage, convertWidthHeightImage, convertTypeImageEventSport, ImageCapacity, convertTypeImageChannel } from '@widgets/metadatas';
import clsx from 'clsx';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import styled, { css } from "styled-components"
import LoadingOverlay from 'react-loading-overlay'

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
    errorTitle: {
        textAlign: 'center',
        color: 'red',
        marginTop: '5px'
    },
    capacityTitle: {
        textAlign: 'center',
        color: 'black',
        marginTop: '5px'
    },
    imgDetail: {
        height: '250px'
    },
    formGroup: {
        position: 'relative',
        border: '1px solid ' + theme.palette.divider,
        borderRadius: 2,
        padding: '12px 12px 0 12px',
        margin: '24px 20px 16px 20px',
        width: '100%'
    },
    formGroupTitle: {
        position: 'absolute',
        top: -15,
        left: 8,
        padding: '0 7px',
        backgroundColor: theme.palette.background.paper,
    },
    formControl: {
        margin: '6px 0',
        '&:last-child': {
            marginBottom: '6px'
        }
    },
    breakAll: {
        wordBreak: 'break-all'
    },
    imageBoxDiv: {
        '&:hover': {
            '& $productImageFeaturedStar': {
                opacity: 999
            }
        },
    },
    productImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: colors.orange[400],
        opacity: 0,
        '&:hover': {
            boxShadow: '0px 2px 3px',
            color: 'white',
            backgroundColor: colors.orange[700],
            transition: 'all 0.3s ease 0s',
            borderRadius: '15px',
            cursor: 'pointer',
            outline: 'none'
        }
    }
}));

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

function CmsImageBox(props) {
    const classes = useStyles(props);
    const {
        id,
        type,
        option,
        size,
        description,
        className,
        imgData,
        setImage,
        errorValue,
        bgTet,
        valueBGTet,
        isProcess,
        rollbackImg,
        showError,
        errorMessage,
        formGroupClass,
        typeEventSport,
        groupTitleClass,
        limitCapacity,
        messageValue,
        HandleRemoveImage,
        onRemove,
        isOnlyJPG
    } = props
    const [imgDefault, setImgDefault] = useState(noImage);
    const [errorData, setErrorData] = useState('');
    const [NYButton, setNYButton] = useState(false);

    const handleChange = e => {
        const files = e.target.files
        if (files && files[0]) {
            let picture = e.target.files[0];
            const reader = new FileReader();
            const image = new Image();
            setImage(picture);
            reader.addEventListener("load", () => {
                setImgDefault(reader.result);
                image.src = reader.result;
                setErrorData('');
            });
            image.onload = function () {
                // check dimension hình
                if (size) {
                    let checkOption = convertWidthHeightImage(option, type, image.width, image.height);
                    if (checkOption === "Error") {
                        setErrorData(current => [...current, current === '' ? "Lỗi chiểu dài - chiều rộng file hình" : " & Lỗi chiểu dài - chiều rộng file hình"]);
                        errorValue(false);
                        setImgDefault(imgData)
                        setImage(null);
                        showError && errorMessage("Lỗi chiểu dài - chiều rộng file hình");
                    }
                    else {
                        errorValue(true);
                    }
                }
            };

            // check dung lượng và loại hình
            let checkSize = convertSizeImage(picture.size, limitCapacity.binary);
            let checkType = convertTypeImage(picture.type);
            if (typeEventSport || isOnlyJPG) {
                checkType = convertTypeImageEventSport(picture.type)
            }
            if (type === "channel") {
                checkType = convertTypeImageChannel(picture.type, option)
            }

            if (checkSize === "Error" && checkType === "Error") {
                setErrorData("Lỗi vượt quá dung lượng file hình & Lỗi loại file hình");
                errorValue(false);
                setImgDefault(imgData);
                setImage(null);
                showError && errorMessage("Lỗi vượt quá dung lượng file hình & Lỗi loại file hình");
                return;
            }
            else if (checkSize === "Error" && checkType !== "Error") {
                setErrorData("Lỗi vượt quá dung lượng file hình");
                errorValue(false);
                setImgDefault(imgData);
                setImage(null);
                showError && errorMessage("Lỗi vượt quá dung lượng file hình");
                return;
            }
            else if (checkSize !== "Error" && checkType === "Error") {
                setErrorData("Lỗi loại file hình");
                errorValue(false);
                setImgDefault(imgData);
                setImage(null);
                if (typeEventSport || isOnlyJPG) {
                    setErrorData("Lỗi loại file hình (chỉ upload được với file có đuôi là .jpg)");
                    showError && errorMessage("Lỗi loại file hình (chỉ upload được với file có đuôi là .jpg)");
                }
                else if (type === "channel") {
                    if (option === "Poster Kênh") {
                        setErrorData("Lỗi loại file hình (chỉ upload được với file có đuôi là .jpg)");
                        showError && errorMessage("Lỗi loại file hình (chỉ upload được với file có đuôi là .jpg)");
                    } else {
                        setErrorData("Lỗi loại file hình (chỉ upload được với file có đuôi là .png)");
                        showError && errorMessage("Lỗi loại file hình (chỉ upload được với file có đuôi là .png)");
                    }
                }
                else {
                    showError && errorMessage("Lỗi loại file hình");
                }
                return;
            }
            else {
                errorValue(true);
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const handleBGNewYear = () => {
        setNYButton(!NYButton)
        valueBGTet(!NYButton);
    }

    const removeImage = () => {
        setImgDefault(imgData);
        setImage(null);
        setErrorData('');
        errorValue(null);
        onRemove && onRemove()
    }

    function handleRemove() {
        setImgDefault(noImage)
        setImage('')
        try {
            HandleRemoveImage && HandleRemoveImage(
                () => {
                    setImgDefault(noImage)
                    setImage('')
                }
            )
        } catch (error) {

        }
    }

    useEffect(() => {
        if (imgData) {
            setImgDefault(imgData);
        }
        else {
            setImgDefault(noImage);
        }
    }, [imgData])

    useEffect(() => {
        if (messageValue) {
            setErrorData(messageValue);
            errorValue(false);
        }
    }, [messageValue, errorValue])

    return (
        <div className={clsx(formGroupClass, classes.formGroup, "flex-auto")}>
            <Typography className={clsx(groupTitleClass, classes.formGroupTitle)} style={!description ? { paddingTop: '4px' } : {}} color="primary">{`${option} `}
                {
                    size &&
                    <React.Fragment>
                        | Kích Thước: {size + ' '}
                    </React.Fragment>
                }
                {
                    bgTet &&
                    <React.Fragment>
                        | Tết:
                        <Switch
                            size="small"
                            checked={NYButton}
                            onChange={handleBGNewYear}
                            name="checkedA"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </React.Fragment>
                }
                {
                    description &&
                    <React.Fragment>
                        | <HtmlTooltip style={{ paddingTop: '2px', marginRight: '4px' }} title={option + ' - ' + description} arrow><Icon fontSize='small'>{"help_outline"}</Icon></HtmlTooltip>
                    </React.Fragment>
                }
                {
                    rollbackImg &&
                    <React.Fragment>
                        | <HtmlTooltip style={{ paddingTop: '2px' }} title={"Rollback hình ảnh"} arrow id={`${id}`} onClick={() => removeImage()}><Icon className={'text-orange-600'} fontSize='small'>{"cancel"}</Icon></HtmlTooltip>
                    </React.Fragment>
                }
            </Typography>

            <div className={clsx(className, classes.imageBoxDiv, 'grid justify-items-center')}>
                <Tooltip title="Xóa hình"><Icon className={classes.productImageFeaturedStar} onClick={() => handleRemove()}>clear</Icon></Tooltip>
                <input accept={typeEventSport || isOnlyJPG ? ".jpg" : ".jpg, .png, .jpeg"} id={`widgets-upload-file-${id}`} type="file" style={{ display: "none" }} onChange={e => { handleChange(e); e.target.value = null }} />
                <label component="span" className="flex flex-col" htmlFor={`widgets-upload-file-${id}`}>
                    <Button component="span">
                        <img className={classes.imgDetail} id={`${id}`} alt="" src={imgDefault ? imgDefault : noImage} />
                    </Button>
                </label>
                {errorData && errorData !== '' ?
                    <Typography variant="subtitle2" className={classes.errorTitle}>{`${errorData}`}</Typography>
                    :
                    <Typography variant="subtitle2" className={classes.capacityTitle}>Dung Lượng Tối Đa : {limitCapacity.id}</Typography>
                }
            </div>
            <DarkBackground disappear={isProcess}>
                <LoadingOverlay
                    claasName='absolute h-full'
                    styles={{
                        wrapper: {
                            height: '100%'
                        }
                    }}
                    active={true}
                    // spinner={<BounceLoader />}
                    spinner={true}
                    text="Đang upload hình..."
                >
                </LoadingOverlay>
            </DarkBackground>
        </div>
    )
}

CmsImageBox.propTypes = {
    id: PropTypes.any,
    type: PropTypes.string,
    option: PropTypes.string,
    size: PropTypes.string,
    description: PropTypes.string,
    className: PropTypes.string,
    setImage: PropTypes.func,
    errorValue: PropTypes.any,
    bgTet: PropTypes.bool,
    valueBGTet: PropTypes.any,
    isProcess: PropTypes.bool,
    rollbackImg: PropTypes.bool,
    showError: PropTypes.bool,
    errorMessage: PropTypes.func,
    formGroupClass: PropTypes.string,
    typeEventSport: PropTypes.bool,
    groupTitleClass: PropTypes.string,
    limitCapacity: PropTypes.object,
    HandleRemoveImage: PropTypes.func,
    isOnlyJPG: PropTypes.bool,
}

CmsImageBox.defaultProps = {
    id: 0,
    type: "",
    option: "",
    size: "",
    description: "",
    className: "",
    errorValue: true,
    bgTet: false,
    isProcess: false,
    rollbackImg: false,
    showError: false,
    errorMessage: null,
    formGroupClass: "",
    typeEventSport: false,
    groupTitleClass: "",
    limitCapacity: ImageCapacity['1MB'],
    HandleRemoveImage: null,
    isOnlyJPG: false,
}

export default React.memo(CmsImageBox)
