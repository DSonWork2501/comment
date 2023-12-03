import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as PropTypes from 'prop-types'
import CmsButtonProgress from './CmsButtonProgress';
import { LinearProgress, styled } from '@material-ui/core';

const LayoutCustom = styled(Dialog)({
    "&.style .MuiDialog-container>div": {
        height: 'calc(100% - 64px)'
    }
});

function CmsDialog(props) {
    const {
        isForm,
        open,
        handleClose,
        handleCalcel,
        handleSave,
        title,
        titleClass,
        text,
        size,
        disabledSave,
        isCloseDialogSubmit,
        disableCloseOutSite,
        fullScreen,
        loading,
        contentClass,
        btnTitle,
        saveButtonText,
        backdropProps,
        className,
        btnFootComponent,
        detailcomment,
        onDetail,
        setOnDetail,
        setActiveComment,
        setCheckRoot,
        ...otherProps
    } = props;

    const isString = myVar => (typeof myVar === 'string')

    return (
        <LayoutCustom
            fullWidth
            maxWidth={size}
            open={open}
            onClose={disableCloseOutSite ? null : handleClose}
            aria-labelledby="form-dialog-title"
            fullScreen={fullScreen}
            {...otherProps}
            BackdropProps={backdropProps}
            className={className}
        >
            {
                loading && <LinearProgress />
            }

            {
                title
                &&
                <DialogTitle className={titleClass} id="form-dialog-title">{title}</DialogTitle>
            }

            {!isForm ? <>
                <DialogContent className={contentClass}>
                    {isString(text)
                        ? <DialogContentText>{text}</DialogContentText>
                        : <React.Fragment>{text}</React.Fragment>
                    }
                    {props.children}
                </DialogContent>
                <DialogActions>
                    {detailcomment && onDetail &&
                        <Button
                            onClick={() => {
                                setOnDetail(false)
                                setActiveComment(null)
                                setCheckRoot(false)
                            }}
                            color="primary"
                        >
                            BACk
                        </Button>
                    }

                    <Button
                        onClick={() => {
                            handleClose()
                            if (handleCalcel) {
                                handleCalcel()
                            }
                        }}
                        color="primary">
                        {handleSave ? "Hủy" : "Đóng"}
                    </Button>
                    {btnFootComponent && btnFootComponent({ handleClose })}
                    {handleSave && (
                        <CmsButtonProgress
                            disabled={disabledSave}
                            onClick={() => {
                                handleSave()
                                isCloseDialogSubmit && handleClose()
                            }}
                            color="primary"
                            label={`${btnTitle || 'Lưu'}`}
                            loading={loading}
                        >

                        </CmsButtonProgress>
                    )}
                </DialogActions>
            </>
                : <form onSubmit={handleSave}>
                    <DialogContent>
                        {isString(text)
                            ? <DialogContentText>{text}</DialogContentText>
                            : <React.Fragment>{text}</React.Fragment>
                        }
                        {props.children}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                handleClose()
                                if (handleCalcel) {
                                    handleCalcel()
                                }
                            }}
                            color="primary">
                            Đóng
                        </Button>
                        <Button
                            type="submit"
                            disabled={disabledSave}
                            onClick={() => {
                                isCloseDialogSubmit && handleClose()
                            }}
                            color="primary">
                            {btnTitle || 'Lưu'}
                        </Button>
                    </DialogActions>
                </form>
            }
        </LayoutCustom>
    );
}

CmsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func,
    handleSave: PropTypes.func,
    handleCalcel: PropTypes.func,
    title: PropTypes.string,
    titleClass: PropTypes.string,
    text: PropTypes.any,
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    disabledSave: PropTypes.bool,
    isCloseDialogSubmit: PropTypes.bool,
    disableCloseOutSite: PropTypes.bool,
    isForm: PropTypes.bool,
    fullScreen: PropTypes.bool,
    contentClass: PropTypes.string,
    backdropProps: PropTypes.object,
    className: PropTypes.string,
}

CmsDialog.defaultProps = {
    open: false,
    handleClose: null,
    handleSave: null,
    handleCalcel: null,
    title: "",
    titleClass: "",
    text: "",
    size: "sm",
    disabledSave: false,
    isCloseDialogSubmit: true,
    isForm: false,
    fullScreen: false,
    contentClass: '',
    backdropProps: {},
    className: ''
}

export default React.memo(CmsDialog)
