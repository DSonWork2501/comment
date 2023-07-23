import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Menu, MenuItem, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { faArrowLeft, faCameraRotate, faCircle, faCircleXmark, faLocationDot, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowDropDown } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { order } from '../order/store/orderSlice';
import { useLocation, useParams } from 'react-router';
import reducer from './store';
import withReducer from 'app/store/withReducer';
import { CmsTab } from '@widgets/components';
import History from '@history/@history';
import { groupBy, map } from 'lodash';
import { DropMenu } from '../order/components/index';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import { useRef } from 'react';
import './css/CameraComponent.css'; // Import the CSS file
import Connect from '@connect/@connect';
import { shipStatus } from '../order/common';
import { unwrapResult } from '@reduxjs/toolkit';

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
        },
        '& .MuiTab-root ,& .MuiTabs-root': {
            minHeight: '35px !important'
        }
    },
    modal2: {
        '& .MuiDialog-paperFullWidth': {
            width: `calc(100%)`, // Change this to the desired background color
        },
        '& .MuiDialog-paperScrollPaper': {
            maxHeight: 'calc(100%)',
        },
        '& .MuiDialog-paper': {
            margin: 0
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
        },
        '& .MuiTab-root ,& .MuiTabs-root': {
            minHeight: '35px !important'
        }
    },
    menu: {
        '& ul': {
            padding: '0 !important'
        }
    }
}));

const DropMenuMobile = ({ crName, className }) => {
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

const List = ({ listProduct, totalPr }) => {
    return <div className='flex '>
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
}

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
        </div> <List listProduct={listProduct} totalPr={totalPr} />
    </div>
}

const TableWithCustomer = ({ val, index, noBorder, handleRefresh }) => {
    const [detail, setDetail] = useState(null);
    const dispatch = useDispatch();
    const className = useStyles();

    console.log(detail);

    const handleSaveFile = async (file, name) => {
        //setOpen(false)
        //window.alert(JSON.stringify(file));
        window.alert(detail)
        try {
            const data = new FormData();
            data.append('enpoint', 'tempfile');
            data.append('files', file);
            await Connect.live.uploadFile.insert(data);
            const resultAction = await dispatch(order.shipper.update({
                typeItem: 2,
                data: [
                    {
                        id: detail.shipping.id,
                        receiveimg: name
                    }
                ]
            }))
            unwrapResult(resultAction);
            handleRefresh()
            History.push(window.location.pathname)
        } catch (error) {
            window.alert(error)
        }
    }

    return <>
        <TakePhotoDialog className={className.modal2} saveFile={handleSaveFile} />

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
                        <Link
                            to={`${window.location.pathname}?orderID=${val.id}`}
                        >
                            <div style={{ color: 'aqua', textDecoration: 'underline', cursor: 'pointer' }}>
                                {val.id}
                            </div>
                        </Link>
                    </div>
                    <div className='flex items-center mb-2'>
                        <FontAwesomeIcon icon={faUser} className='mr-2 text-10' />
                        {val.customername} - {val.customeremail}
                    </div>
                    <div className='flex items-center mb-2'>
                        <FontAwesomeIcon icon={faPhone} className='mr-2 text-10' />
                        {val.customermoblie}
                    </div>
                    <div className='flex items-center'>
                        <FontAwesomeIcon icon={faLocationDot} className='mr-2 text-10' />
                        {val.customeraddress}, {val.customerward}, {val.customerdistrict}, {val.customercity}
                    </div>
                </td>
                <td className='text-right' style={{ width: 85 }}>
                    <div onClick={() => console.log(detail)}>check </div>
                    <DropMenu
                        crName={shipStatus[val.shipping.status].name}
                        className={clsx('text-white px-4 py-2 text-9'
                            , `hover:${shipStatus[val.shipping.status].className}`
                            , shipStatus[val.shipping.status].className
                        )}
                        data={[
                            {
                                name: 'Chụp hình',
                                id: 1,
                                show: val.shipping.status === 1
                            },
                            {
                                name: 'Giao hàng',
                                id: 2,
                                show: val.shipping.status === 2
                            }
                        ]
                            //  .filter(val => val.show)
                        }
                        handleClose={(value, setAnchorEl) => {
                            if (value?.id === 1) {
                                setDetail(val);
                                History.push(window.location.pathname + '?openCame=1')

                            }
                            //setOpenDialog('photo')
                            setAnchorEl(null)
                        }} />
                </td>
            </tr>
            {
                !noBorder
                &&
                <tr>
                    <td colSpan={3} className='p-4'>
                        <hr style={{ borderColor: 'aliceblue' }}></hr>
                    </td>
                </tr>
            }
        </tbody>
    </>
}

const OrderTable = ({ entities, loading, setSearch, handleRefresh }) => {
    const location = useLocation(), params2 = new URLSearchParams(location.search)
        , orderID = parseInt(params2.get('orderID'));

    const listProductTemp = useMemo(() => {
        let data = [], table = [];
        if (entities?.data?.length) {
            entities.data.forEach(element => {
                element.productorder.forEach(e => {
                    if (parseInt(orderID) === element.id)
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
    }, [entities, orderID])
    const totalPr = useMemo(() => {
        let total = 0, money = 0;
        if (listProductTemp?.length)
            listProductTemp.forEach(element => {
                total = total + element.numberPR;
                money = money + ((element.price || 0) * element.numberPR);
            });
        return { total, money }
    }, [listProductTemp])

    return <div className='p-8 rounded-4 shadow-4'>
        <div>
            <b>
                Tổng đơn hàng {Boolean(orderID) ? orderID : ''}
            </b>
        </div>
        {
            orderID
                ? <>
                    <table style={{ width: '100%' }}>
                        {
                            entities?.data?.length && entities.data.map((val, index) => {
                                return val.id === parseInt(orderID) ? <TableWithCustomer val={val} key={val.id} index={0} noBorder /> : null
                            })
                        }
                    </table>

                    <List listProduct={listProductTemp} totalPr={totalPr} />
                </>
                : <div className='flex '>
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
                                <TableWithCustomer val={val} key={val.id} index={index} handleRefresh={handleRefresh} />
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
                    </table>
                </div>
        }
    </div>
}

const TakePhotoDialog = ({ open, className, saveFile }) => {
    const webcamRef = useRef(null);
    const [frontCamera, setFrontCamera] = useState(false);
    const [photoData, setPhotoData] = useState(null);
    const location = useLocation(), params2 = new URLSearchParams(location.search)
        , openCameUrl = parseInt(params2.get('openCame'));

    const [openCame, setOpenCame] = useState(false);

    const videoConstraints = {
        width: window.innerWidth,
        height: window.innerHeight,
        facingMode: frontCamera ? 'user' : 'environment',
    };

    useEffect(() => {
        setOpenCame(parseInt(openCameUrl) === 1)
    }, [openCameUrl])

    const handleCapture = () => {
        const imageSrc = webcamRef.current.getScreenshot({
            width: 1280, // Set the desired width for the screenshot (e.g., 1280)
            height: 720, // Set the desired height for the screenshot (e.g., 720)
            screenshotQuality: 1.0, // Set the screenshot quality to 1.0 for maximum quality (no compression)
        });
        setPhotoData(imageSrc);
    };

    const handleCameraSwitch = () => {
        setFrontCamera(prevFrontCamera => !prevFrontCamera);
    };

    const handleAddCapturedPhoto = () => {
        if (photoData) {
            const blob = dataURItoBlob(photoData);
            const name = `${Date.now()}.jpeg`;
            const file = new File([blob], name, { type: 'image/jpeg' });
            // Update the input file element's value to include the captured photo
            saveFile(file, name)
            // const inputFile = document.getElementById('photoInput');
            // inputFile.files = [file];
        }
    };

    // Helper function to convert base64 to Blob
    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    return <Dialog className={className} open={openCame} fullWidth maxWidth="md">
        <DialogContent className='text-11' style={{ paddingTop: 8 }}>
            <div className="camera-container">
                <div className="camera-view relative mb-8">
                    <button onClick={() => History.push(window.location.pathname)}
                        style={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            opacity: .5,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid white',
                            borderRadius: '50%',
                            fontSize: '25px',
                            color: 'white',
                            zIndex: 1
                        }}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                </div>
                <div className="camera-controls flex justify-between w-full px-8 items-center ">
                    <div style={{ width: 35, height: 35 }}>

                    </div>
                    <button onClick={handleCapture} style={{ width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid white', borderRadius: '50%', fontSize: '30px', color: 'white' }}>
                        <FontAwesomeIcon icon={faCircle} />
                    </button>
                    <button onClick={handleCameraSwitch} style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid white', borderRadius: '50%', fontSize: '18px', color: 'white' }}>
                        <FontAwesomeIcon icon={faCameraRotate} />
                    </button>
                </div>

            </div>
            {photoData &&
                <div className="photo-preview w-full mt-8 relative">
                    <img src={photoData} alt="Captured" className='w-full mb-8' />
                    <Button
                        size='small'
                        variant='contained'
                        color='primary'
                        onClick={handleAddCapturedPhoto}
                        className='absolute top-8 right-8'
                    >
                        Lưu
                    </Button>
                </div>
            }
        </DialogContent>
    </Dialog>
}

const EmployDelivery = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector(store => store[keyStore].order.loading);
    const entities = useSelector(store => store[keyStore].order.detailDelivery);
    const [search, setSearch] = useState(initialValues);
    const params = useParams(), id = params.id, type = params.type;

    const getListTable = useCallback((search) => {
        dispatch(order.other.getDetailDelivery({ ...search, id: id || '1689803176', session: '' }));
    }, [dispatch, id])

    useEffect(() => {
        getListTable(search);
    }, [search, getListTable, dispatch])

    const handleRefresh = () => {
        getListTable(search);
    }

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
                                    <DropMenuMobile crName={`0363341099`} />
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
                    <div className='flex justify-between items-center'>
                        <CmsTab data={deliveryLink(1)} value={0} isLink={true} onChange={(e, value) => {
                            History.push(deliveryLink(1).find(e => e.id === value)?.link)
                        }} />
                        <Link
                            to={`${window.location.pathname}`}
                        >
                            <div className='text-10' style={{ width: 54, color: '#e35c5c', textDecoration: 'underline', cursor: 'pointer' }}>
                                <FontAwesomeIcon icon={faArrowLeft} className='mr-2' />
                                Trở lại
                            </div>
                        </Link>
                    </div>


                    {
                        type === '1'
                            ? <ProductTable entities={entities} loading={loading} setSearch={setSearch} />
                            : <OrderTable entities={entities} loading={loading} setSearch={setSearch} handleRefresh={handleRefresh} />
                    }
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default withReducer(keyStore, reducer)(EmployDelivery);
