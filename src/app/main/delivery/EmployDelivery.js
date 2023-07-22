import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Menu, MenuItem, TableCell, TableRow, makeStyles, withStyles } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { faBox, faCircleCheck, faHandHoldingDollar, faHandHoldingHand, faList, faLocationDot, faPhone, faTruckFast, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import CmsFormikUploadFile from '@widgets/components/cms-formik/CmsFormikUploadFile';
import * as Yup from 'yup';
import { ArrowDropDown } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { order } from '../order/store/orderSlice';
import { useParams } from 'react-router';
import reducer from './store';
import withReducer from 'app/store/withReducer';
import { CmsLabel, CmsTab } from '@widgets/components';
import History from '@history/@history';
import { groupBy, map } from 'lodash';
import { initColumn } from '@widgets/functions';
import { DropMenu } from '../order/components/index';

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
            paddingTop: 0,
            paddingBottom: 0
        },
        '& .MuiDialogContent-root': {
            paddingLeft: 8,
            paddingRight: 8
        }
    },
    menu: {
        '& ul': {
            padding: '0 !important'
        }
    }
}));

function getSteps() {
    return ['Nhận hàng', 'Đang vận chuyển', 'Đã giao hàng', 'Đã Thanh toán', 'Hoàn thành'];
}

const DropMenu_ = ({ crName, className }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button aria-controls="dropdown-menu" className={className} size="small" style={{ textTransform: 'initial' }} color="primary" variant="outlined" aria-haspopup="true" onClick={handleClick}>
                {crName}
                <ArrowDropDown />
            </Button>
            <Menu
                id="dropdown-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                className={classes.menu}
            >
                <MenuItem style={{ minHeight: 'initial' }} onClick={handleClose}>
                    Tên NV : Trương Công Mạnh
                </MenuItem>
                <MenuItem style={{ minHeight: 'initial' }} onClick={handleClose}>
                    SĐT : 0363341099
                </MenuItem>
                <MenuItem style={{ minHeight: 'initial' }} onClick={handleClose}>
                    Chức vụ : Nhân viên giao hàng
                </MenuItem>
            </Menu>
        </div>
    );
}

const keyStore = 'stores';
const initialValues = {

};

export const deliveryLink = (id) => [
    { id: 1, name: "Sản phẩm", link: `/employ-delivery/1`, icon: "" },
    { id: 2, name: "Đơn hàng", link: `/employ-delivery/2`, icon: "" },
];

const ProductTable = ({ entities, loading, setSearch }) => {
    const listProduct = useMemo(() => {
        let data = [], table = [];
        if (entities?.data?.length) {
            entities.data.forEach(element => {
                element.productorder.forEach(e => {
                    if (element.parentid === 1) {
                        data.push({
                            sku: e.sku,
                            img: e.image,
                            name: e.name,
                            price: e.price,
                        });
                    } else {
                        JSON.parse(e.model).forEach(el => {
                            el?.slots?.length && el.slots.forEach(elm => {
                                data.push(elm.item);
                            })
                        })
                        table.push({
                            sku: e.sku,
                            img: e.image,
                            name: e.name,
                            price: 0,
                            type: 'table'
                        })
                    }
                })
            });
            const groupedData = groupBy(data, 'sku');
            const groupedTable = groupBy(table, 'sku');

            return [
                ...map(groupedTable, (products, sku) => ({
                    ...products[0],
                    numberPR: products.length,
                })),
                ...map(groupedData, (products, sku) => ({
                    ...products[0],
                    numberPR: products.length,
                }))
            ];
        }

        return []
    }, [entities])
    const totalPr = useMemo(() => {
        let total = 0, money = 0;
        if (listProduct?.length)
            listProduct.forEach(element => {
                total = total + element.numberPR;
                money = money + ((element.price || 0) * element.numberPR);
            });
        return { total, money }
    }, [listProduct])

    return <div className='p-8 rounded-4 shadow-4'>
        <div>
            <b>
                Tổng sản phẩm
            </b>
        </div>
        <div className='flex '>
            <table className='w-full'>
                <tbody>
                    <tr>
                        <td colSpan={3} className='p-4'>
                            <hr style={{ borderColor: 'aliceblue' }}></hr>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    {
                        listProduct.map(val => (
                            <tr style={{ verticalAlign: 'baseline' }} key={val.sku}>
                                <td>
                                    <b>
                                        {val.numberPR}x
                                    </b>
                                </td>
                                <td>
                                    {val.name}
                                </td>
                                <td className='text-right'>
                                    {typeof val.price === 'number'
                                        ? val.price.toLocaleString('en-US')
                                        : '-'}đ
                                </td>
                            </tr>
                        ))
                    }
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
                        <td >
                            <b>
                                {totalPr.total}
                            </b>
                        </td>
                        <td>
                            <b>
                                Tổng tiền:
                            </b>
                        </td>
                        <td className='text-right'>
                            <b>
                                {totalPr.money.toLocaleString('en-US')} đ
                            </b>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
}

const OrderTable = ({ entities, loading, setSearch }) => {
    const listProduct = useMemo(() => {
        let data = [];
        if (entities?.data?.length) {
            entities.data.forEach(element => {
                element?.productorder?.length && element.productorder.forEach(e => {
                    if (element.parentid === 1) {
                        data.push({
                            ...element,
                            dataOfItem: {
                                sku: e.sku,
                                img: e.image,
                                name: e.name,
                                price: e.price,
                            },
                            keyRow: 1
                        });
                    } else {
                        data.push({
                            ...element, dataOfItem: {
                                sku: e.sku,
                                img: e.image,
                                name: e.name,
                                price: 0,
                                type: 'table',
                            },
                            keyRow: 1
                        });

                        JSON.parse(e?.model).forEach(el => {
                            el?.slots?.length && el.slots.forEach(elm => {
                                data.push({ ...element, dataOfItem: elm.item, keyRow: 2 });
                            })
                        })
                    }
                })
            });
            const groupedData = groupBy(data, 'id');
            return data.map(val => {
                return { ...val, numberPR: groupedData[val.id]?.length }
            })
        }

        return []
    }, [entities])

    const listProductTemp = useMemo(() => {
        let data = [], table = [];
        if (entities?.data?.length) {
            entities.data.forEach(element => {
                element.productorder.forEach(e => {
                    if (element.parentid === 1) {
                        data.push({
                            sku: e.sku,
                            img: e.image,
                            name: e.name,
                            price: e.price,
                        });
                    } else {
                        JSON.parse(e.model).forEach(el => {
                            el?.slots?.length && el.slots.forEach(elm => {
                                data.push(elm.item);
                            })
                        })
                        table.push({
                            sku: e.sku,
                            img: e.image,
                            name: e.name,
                            price: 0,
                            type: 'table'
                        })
                    }
                })
            });
            const groupedData = groupBy(data, 'sku');
            const groupedTable = groupBy(table, 'sku');

            return [
                ...map(groupedTable, (products, sku) => ({
                    ...products[0],
                    numberPR: products.length,
                })),
                ...map(groupedData, (products, sku) => ({
                    ...products[0],
                    numberPR: products.length,
                }))
            ];
        }

        return []
    }, [entities])
    const totalPr = useMemo(() => {
        let total = 0, money = 0;
        if (listProductTemp?.length)
            listProductTemp.forEach(element => {
                total = total + element.numberPR;
            });
        return { total, money }
    }, [listProductTemp])

    return <div className='p-8 rounded-4 shadow-4'>
        <div>
            <b>
                Tổng đơn hàng
            </b>
        </div>
        <div className='flex '>
            <table className='w-full'>
                <tbody>
                    <tr>
                        <td colSpan={3} className='p-4'>
                            <hr style={{ borderColor: 'aliceblue' }}></hr>
                        </td>
                    </tr>
                </tbody>
                {
                    entities?.data?.length && entities.data.map((val, index) => (
                        <>
                            <tbody key={val.id}>
                                <tr key={val.sku}>
                                    <td style={{ width: 20 }}>
                                        <b>
                                            {index + 1}
                                        </b>
                                    </td>
                                    <td>
                                        <div className='flex items-center mb-2'>
                                            <b className='mr-2'>
                                                ID
                                            </b>
                                            <div style={{ color: 'aqua', textDecoration: 'underline', cursor: 'pointer' }}>
                                                {val.id}
                                            </div>
                                        </div>
                                        <div className='flex items-center mb-2'>
                                            <FontAwesomeIcon icon={faUser} className='mr-2' />
                                            {val.customername} - {val.customeremail}
                                        </div>
                                        <div className='flex items-center mb-2'>
                                            <FontAwesomeIcon icon={faPhone} className='mr-2' />
                                            {val.customermoblie}
                                        </div>
                                        <div className='flex items-center'>
                                            <FontAwesomeIcon icon={faLocationDot} className='mr-2' />
                                            {val.customeraddress}, {val.customerward}, {val.customerdistrict}, {val.customercity}
                                        </div>
                                    </td>
                                    <td className='text-right' style={{ width: 85 }}>
                                        <DropMenu
                                            crName={'Chờ lấy hàng'}
                                            className={clsx('text-white px-4 py-2  text-9 bg-orange-500'
                                            )}
                                            data={[
                                                {
                                                    name: 'Chụp hình',
                                                    id: 1
                                                }
                                            ]}
                                            handleClose={(value, setAnchorEl) => {
                                                setAnchorEl(null)
                                            }} />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className='p-4'>
                                        <hr style={{ borderColor: 'aliceblue' }}></hr>
                                    </td>
                                </tr>
                            </tbody>
                        </>

                    ))
                }
                {/* <tbody>
                    {
                        listProduct.map(val => (
                            <tr style={{ verticalAlign: 'baseline' }} key={val.sku}>
                                <td>
                                    <b>
                                        {val.numberPR}x
                                    </b>
                                </td>
                                <td>
                                    {val.name}
                                </td>
                                <td className='text-right'>
                                    {typeof val.price === 'number'
                                        ? val.price.toLocaleString('en-US')
                                        : '-'}đ
                                </td>
                            </tr>
                        ))
                    }
                </tbody> */}
                <tbody>
                    <tr>
                        <td colSpan={3} className='p-4'>
                            <hr style={{ borderColor: 'aliceblue' }}></hr>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr style={{ verticalAlign: 'baseline' }}>
                        <td >
                            <b>
                                {totalPr.total}
                            </b>
                        </td>
                        <td>
                            <b>
                                Tổng tiền:
                            </b>
                        </td>
                        <td className='text-right'>
                            <b>
                                {totalPr.money.toLocaleString('en-US')} đ
                            </b>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
}

const EmployDelivery = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector(store => store[keyStore].order.loading);
    const entities = useSelector(store => store[keyStore].order.detailDelivery);
    const [search, setSearch] = useState(initialValues);
    const params = useParams(), id = params.id, type = params.type;

    const getListTable = useCallback((search) => {
        dispatch(order.other.getDetailDelivery({ ...search, id: '1689803176', session: '' }));
    }, [dispatch, id])

    useEffect(() => {
        getListTable(search);
    }, [search, getListTable, dispatch])

    // const handleSave = (values) => {

    // }

    // const formik = useFormik({
    //     initialValues: {},
    //     keepDirtyOnReinitialize: true,
    //     enableReinitialize: true,
    //     onSubmit: handleSave,
    //     validationSchema: Yup.object({
    //     })
    // })

    async function upLoadFile(file, { setLoading, resetFile, form }) {
    }

    return (
        <div>
            <Dialog className={classes.modal} open={true} fullWidth maxWidth="md">
                <DialogTitle>
                    <div className={classes.root}>
                        <div style={{
                            background: '#fafafa!important',
                        }} >
                            <div className='p-8 text-right flex justify-between items-center '>
                                <div className='text-center'>
                                    WINE LOGO
                                </div>
                                <div style={{ width: 110 }}>
                                    <DropMenu_ crName={`0363341099`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent className='text-11'>
                    <div className='flex flex-wrap w-full p-8 rounded-4 shadow-4'>
                        <div>
                            <div>
                                <b className='mr-4'>
                                    Mã biên bản:
                                </b>
                                {entities?.data?.length && entities.data[0]?.shipping?.deliveryid}
                            </div>
                            <div>
                                <b className='mr-4'>
                                    Tổng đơn:
                                </b>
                                {entities?.data?.length}
                            </div>
                        </div>
                    </div>
                    <hr className='my-8' style={{ borderColor: 'aliceblue' }}></hr>
                    <CmsTab data={deliveryLink(1)} value={0} isLink={true} onChange={(e, value) => {
                        History.push(deliveryLink(1).find(e => e.id === value)?.link)
                    }} />
                    {
                        type === '1'
                            ? <ProductTable entities={entities} loading={loading} setSearch={setSearch} />
                            : <OrderTable entities={entities} loading={loading} setSearch={setSearch} />
                    }
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default withReducer(keyStore, reducer)(EmployDelivery);
