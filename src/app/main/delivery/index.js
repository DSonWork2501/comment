import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles, withStyles } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { faBox, faCircleCheck, faHandHoldingDollar, faHandHoldingHand, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import CmsFormikUploadFile from '@widgets/components/cms-formik/CmsFormikUploadFile';
import * as Yup from 'yup';

const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#784af4',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
});

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(203 239 231) 0%, rgb(54 171 139) 50%, rgb(5 52 46) 100%)',
        boxShadow: '2px 4px 15px 4px #14201185',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    console.log(props);
    const icons = {
        1: <FontAwesomeIcon
            icon={faHandHoldingHand}
            style={{ color: "white", fontSize: 19 }} />,
        2: <FontAwesomeIcon
            icon={faTruckFast}
            style={{ color: "white", fontSize: 19 }} />,
        3: <FontAwesomeIcon
            icon={faBox}
            style={{ color: "white", fontSize: 19 }} />,
        4: <FontAwesomeIcon
            icon={faHandHoldingDollar}
            style={{ color: "white", fontSize: 19 }} />,
        5: <FontAwesomeIcon
            icon={faCircleCheck}
            style={{ color: "white", fontSize: 19 }} />,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },

    modal: {
        '& .MuiDialog-paperFullWidth': {
            width: `calc(100% - 30px)`, // Change this to the desired background color
        },
        '& .MuiDialog-paper': {
            margin: 15
        },
        '& .MuiBackdrop-root': {
            backgroundColor: 'rgb(159 155 155 / 50%)'
        },
        '& .MuiStepper-root': {
            padding: 0
        },
        '& .MuiDialogTitle-root': {
            borderBottom: '1px solid gray',
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 8,
            paddingBottom: 0
        },
        '& .MuiDialogContent-root': {
            paddingLeft: 8,
            paddingRight: 8
        }
    }
}));

function getSteps() {
    return ['Nhận hàng', 'Đang vận chuyển', 'Đã giao hàng', 'Đã Thanh toán', 'Hoàn thành'];
}

const Delivery = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    // const handleNext = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // };

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };

    // const handleReset = () => {
    //     setActiveStep(0);
    // };

    const handleSave = (values) => {

    }

    const formik = useFormik({
        initialValues: {},
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSave,
        validationSchema: Yup.object({
        })
    })

    async function upLoadFile(file, { setLoading, resetFile, form }) {
    }

    return (
        <div>
            <Dialog className={classes.modal} open={true} fullWidth maxWidth="md">
                <DialogTitle>
                    <div className={classes.root}>
                        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </div>
                </DialogTitle>
                <DialogContent className='text-11'>
                    <div className='flex flex-wrap w-full p-8 rounded-4 shadow-4'>
                        <div>
                            <div>
                                <b className='mr-4'>
                                    Mã đơn hàng:
                                </b>
                                006-DK123
                            </div>
                            <div>
                                <b className='mr-4'>
                                    Tên khách hàng:
                                </b>
                                Trường Công Mạnh
                            </div>
                            <div>
                                <b className='mr-4'>
                                    Số điện thoại:
                                </b>
                                0363341099
                            </div>
                            <div>
                                <b className='mr-4'>
                                    Địa chỉ:
                                </b>
                                47/44 Nguyễn thị tần, p.8, q.8, Tp. Hồ Chí Minh
                            </div>
                        </div>
                    </div>
                    <hr className='my-8' style={{ borderColor: 'aliceblue' }}></hr>
                    <div className='p-8 rounded-4 shadow-4'>
                        <div>
                            <b>
                                Đơn hàng
                            </b>
                        </div>
                        <div className='flex '>
                            <table className='w-full'>
                                <tbody>
                                    <tr style={{ verticalAlign: 'baseline' }}>
                                        <td>
                                            <b>
                                                1x
                                            </b>
                                        </td>
                                        <td>
                                            Tủ bảo quản rượu 121 chai WINE CHILLER KA110WR
                                        </td>
                                        <td className='text-right'>
                                            100,000,000đ
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td colSpan={3} className='p-4'>
                                            <hr style={{ borderColor: 'aliceblue' }}></hr>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr style={{ verticalAlign: 'baseline' }}>
                                        <td colSpan={2}>
                                            Tạm tính
                                        </td>
                                        <td className='text-right'>
                                            100,000,000đ
                                        </td>
                                    </tr>
                                    <tr style={{ verticalAlign: 'baseline' }}>
                                        <td colSpan={2}>
                                            Phí áp dụng: <b className='ml-4'>1.4km</b>
                                        </td>
                                        <td className='text-right'>
                                            20,000đ
                                        </td>
                                    </tr>
                                    <tr style={{ verticalAlign: 'baseline' }}>
                                        <td colSpan={2}>
                                            Discount
                                        </td>
                                        <td className='text-right'>
                                            20,000đ
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td colSpan={3} className='p-4'>
                                            <hr style={{ borderColor: 'aliceblue', borderStyle: 'dashed' }}></hr>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr style={{ verticalAlign: 'baseline' }}>
                                        <td colSpan={2}>
                                            <b>
                                                Tổng Cộng
                                            </b>
                                        </td>
                                        <td className='text-right'>
                                            <b>
                                                100,000,000đ
                                            </b>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td colSpan={2}>
                                            <b>
                                                Thanh toán bằng
                                            </b>
                                        </td>
                                        <td className='text-right flex items-center justify-end truncate'>
                                            <img alt='photoMomo' src='https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png?20201011055544' width={25} className='mr-4' />
                                            <b>
                                                Ví momo
                                            </b>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <div className='flex justify-between w-full items-center'>
                        <div className='w-1/2 text-left'>
                            <CmsFormikUploadFile
                                id="uploadfile"
                                name="fileInput"
                                fileProperties={
                                    { accept: ".doc, .docx, .xls, .xlsx" }
                                }
                                label='Chọn hình'
                                setValue={upLoadFile}
                                formik={formik}
                                showFileName={false} />
                            {/* {
                                formik && get(formik?.touched, 'file') && Boolean(get(formik?.errors, 'file'))
                                &&
                                <FormHelperText
                                    style={{
                                        color: '#f44336'
                                    }}
                                    className='mx-16'
                                >
                                    {get(formik.errors, 'file')}
                                </FormHelperText>
                            } */}
                        </div>
                        <div className='w-1/2 text-right'>
                            <Button
                                onClick={() => setActiveStep(prev => { if (prev === 4) return 0; return prev + 1 })}
                                variant='outlined'
                                color="primary">
                                Vận chuyển
                            </Button>
                        </div>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default Delivery;