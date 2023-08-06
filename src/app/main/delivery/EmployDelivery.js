import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Menu, MenuItem, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { faArrowLeft, faCameraRotate, faCircleXmark, faLocationDot, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowDropDown } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { order } from '../order/store/orderSlice';
import { useLocation, useParams } from 'react-router';
import reducer from './store';
import withReducer from 'app/store/withReducer';
import { CmsButtonProgress, CmsCheckbox, CmsTab, CmsUploadFile } from '@widgets/components';
import History from '@history/@history';
import { groupBy, map } from 'lodash';
import { DropMenu } from '../order/components/index';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import { useRef } from 'react';
import Connect from '@connect/@connect';
import { shipStatus } from '../order/common';
import { unwrapResult } from '@reduxjs/toolkit';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import HeadDelivery from './components/Header';
import { returnListProductByOrderID, returnTotalAllProduct } from './common';
import OPTDialog from './components/OPTDialog';
import FuseMessage from '@fuse/core/FuseMessage/FuseMessage';
import { showMessage } from 'app/store/fuse/messageSlice';
import { getLocation } from '.';
import MapLocation from './components/MapLocation';

export const modalSmall = {
    '& .MuiDialog-paperFullWidth': {
        width: `calc(100% - 30px)`, // Change this to the desired background color
    },
    '& .MuiDialog-paper': {
        margin: '15px 22px'
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
};

export const useStyles = makeStyles((theme) => ({
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
    modalSmall,
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

export const DropMenuMobile = ({ phone, name, className }) => {
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
                {phone}
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
                    Tên NV : {name}
                </MenuItem>
                <MenuItem style={{ minHeight: 'initial' }} onClick={handleClose}>
                    SĐT : {phone}
                </MenuItem>
            </Menu>
        </div>
    );
}

export const fileEndpoint = 'tempfile';
const keyStore = 'stores';
const initialValues = {

};

export const deliveryLink = (session) => [
    { id: 1, name: "Sản phẩm", link: `/employ-delivery/1/${session}`, icon: "" },
    { id: 2, name: "Đơn hàng", link: `/employ-delivery/2/${session}`, icon: "" },
    { id: 3, name: "Tỉnh thành", link: `/employ-delivery/3/${session}`, icon: "" },
    { id: 4, name: "Bản đồ", link: `/employ-delivery/4/${session}`, icon: "" },
];

const List = ({ listProduct, totalPr }) => {
    return <div className='flex '>
        <table className='w-full text-10'>
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
                    if (Boolean(element.parentid)) {
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
                            price: e?.price || 0,
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

export const saveFile = (file, name) => {
    return new Promise((resolve, reject) => {
        try {
            const data = new FormData();
            data.append('enpoint', fileEndpoint);
            data.append('files', file, name);
            return Connect.live.uploadFile.insert(data)
                .then(res => resolve(res))
                .catch(err => reject(err))
        } catch (error) {
            reject(error)
        }
    })
}

const handleSaveFileOut = async (value, handleRefresh, dispatch, file, successFc) => {
    try {
        const pr = file.map(val => saveFile(val.file, val.name))
        await Promise.all(pr);
        const resultAction = await dispatch(order.shipper.update(value))
        unwrapResult(resultAction);
        handleRefresh()
        successFc()
        History.push(window.location.pathname)
    } catch (error) {
        window.alert(error)
    }
}

const TableWithCustomer = ({ setCheck, val, index, noBorder, handleRefresh }) => {
    // const dispatch = useDispatch();
    // const location = useLocation(), params2 = new URLSearchParams(location.search)
    //     , shipID = parseInt(params2.get('shipID'));

    // const handleSaveFile = async (file, name) => {
    //     //setOpen(false)
    //     //window.alert(JSON.stringify(file));
    //     handleSaveFileOut({
    //         typeItem: 2,
    //         data: [
    //             {
    //                 id: parseInt(shipID),
    //                 receiveimg: name,
    //             }
    //         ]
    //     }, handleRefresh, dispatch, file, () => { })
    //     // try {
    //     //     const data = new FormData();
    //     //     data.append('enpoint', 'tempfile');
    //     //     data.append('files', file);
    //     //     await Connect.live.uploadFile.insert(data);
    //     //     const resultAction = await dispatch(order.shipper.update())
    //     //     unwrapResult(resultAction);
    //     //     handleRefresh()
    //     //     History.push(window.location.pathname)
    //     // } catch (error) {
    //     //     window.alert(error)
    //     // }
    // }

    return <>
        <tbody key={val.id}>
            <tr key={val.sku}>
                <td style={{ width: 20, borderRight: '1px dashed #bbbbbb' }} className='text-center'>
                    <div>
                        <b>
                            {index + 1}
                        </b>
                    </div>

                    {
                        !noBorder
                        &&
                        <CmsCheckbox
                            checked={val.checked}
                            onChange={event => {
                                setCheck(e => {
                                    return e.includes(val.id) ? e.filter(el => el !== val.id) : [...e, val.id];
                                })
                            }}
                            disabled={val.shipping.status !== 1 && val.shipping.status !== 2}
                        />
                    }
                </td>
                <td className='pl-2'>
                    <div className='flex items-baseline mb-2'>
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
                    <div className='flex items-baseline mb-2'>
                        <FontAwesomeIcon icon={faUser} className='mr-2 text-10' />
                        {val.customername} - {val.customeremail}
                    </div>
                    <div className='flex items-baseline mb-2'>
                        <FontAwesomeIcon icon={faPhone} className='mr-2 text-10' />
                        {val.customermoblie}
                    </div>
                    <div className='flex items-baseline'>
                        <FontAwesomeIcon icon={faLocationDot} className='mr-2 text-10' />
                        {val.customeraddress}, {val.customerward}, {val.customerdistrict}, {val.customercity}
                    </div>
                </td>
                <td className='text-right' style={{ width: 85 }}>
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
                                History.push(window.location.pathname + `?openCame=1&&shipID=${val.shipping.id}`)
                            }

                            if (value?.id === 2) {
                                History.push(`/delivery/${val.shipping.id}/${encodeURIComponent(val.shipping.deliverysession)}/${val.shipping.orderid}`)
                            }
                            //setOpenDialog('photo')
                            setAnchorEl(null)
                        }} />
                </td>
            </tr>
            {/* <tr>
                <td colSpan={3}>
                    <img src='https://ibp.tastycounter.vn/api/common/files/1690110599015.jpeg'/>
                </td>
            </tr> */}
            {
                !noBorder
                &&
                <tr>
                    <td colSpan={3} className='p-4'>
                        <hr style={{ borderColor: 'aliceblue' }}></hr>
                    </td>
                </tr>
            }
        </tbody >
    </>
}

const DetailOrder = ({ entities, listProductTemp, totalPr, orderID }) => {
    return <>
        <table className='w-full text-10'>
            {
                entities?.data?.length && entities.data.map((val, index) => {
                    return val.id === parseInt(orderID) ? <TableWithCustomer val={val} key={val.id} index={0} noBorder /> : null
                })
            }
        </table>

        <List listProduct={listProductTemp} totalPr={totalPr} />
    </>
}

const OrderTable = ({ entities, loading, setSearch, handleRefresh }) => {
    const classes = useStyles();
    const location = useLocation(), params2 = new URLSearchParams(location.search)
        , orderID = parseInt(params2.get('orderID')), openCame = parseInt(params2.get('openCame'))
        , shipID = parseInt(params2.get('shipID'));
    const [check, setCheck] = useState([]);
    const dispatch = useDispatch();

    const listProductTemp = useMemo(() => {
        return returnListProductByOrderID(entities, orderID)
    }, [entities, orderID])
    const totalPr = useMemo(() => {
        return returnTotalAllProduct(listProductTemp)
    }, [listProductTemp])

    const handleSaveFile = async (array, setLoading) => {
        //setOpen(false)
        //window.alert(JSON.stringify(file));
        setLoading(true);
        const files = array.map(val => val.name).join(',');

        if (shipID) {
            const current = entities.data.find(element => {
                return element.shipping.id === parseInt(shipID)
            });

            getLocation(({ latitude, longitude }) => {
                handleSaveFileOut({
                    typeItem: 2,
                    data: [
                        {
                            id: current.shipping.id,
                            receiveimg: files,
                            session: current.shipping.session,
                            orderid: current.shipping.orderid,
                            deliveryid: current.shipping.deliveryid,
                            location: JSON.stringify({
                                start: { latitude, longitude },
                            })
                        }
                    ]
                }, handleRefresh, dispatch, array, () => {
                    setLoading(false);
                })
            }, dispatch);

        } else {
            getLocation(({ latitude, longitude }) => {
                const data = check.map(val => {
                    const current = entities.data.find(element => {
                        return element.id === parseInt(val)
                    });

                    return {
                        id: current.shipping.id,
                        receiveimg: files,
                        session: current.shipping.session,
                        orderid: current.shipping.orderid,
                        deliveryid: current.shipping.deliveryid,
                        location: JSON.stringify({
                            start: { latitude, longitude },
                        })
                    }
                })

                handleSaveFileOut({
                    typeItem: 2,
                    data
                }, handleRefresh, dispatch, array, () => {
                    setCheck([]);
                    setLoading(false);
                })
            }, dispatch)

        }


        // handleSaveFileOut({
        //     typeItem: 2,
        //     data: check.map(val => ({ id: val, receiveimg: name }))
        // }, handleRefresh, dispatch, file, () => {
        //     setCheck([]);
        // })
        // try {
        //     const data = new FormData();
        //     data.append('enpoint', 'tempfile');
        //     data.append('files', file);
        //     await Connect.live.uploadFile.insert(data);
        //     const resultAction = await dispatch(order.shipper.update())
        //     unwrapResult(resultAction);
        //     handleRefresh()
        //     History.push(window.location.pathname)
        // } catch (error) {
        //     window.alert(error)
        // }
    }

    return <>
        {
            parseInt(openCame) === 1 && <TakePhotoDialog className={classes.modal2} phone={entities?.data[0]?.shipping?.phone} saveFile={handleSaveFile} isNeedOpt />
        }

        <div className='p-8 rounded-4 shadow-4'>
            <div className='flex justify-between' style={{ height: 25 }}>
                <b>
                    {
                        !Boolean(orderID)
                        &&
                        <CmsCheckbox
                            //checked={false}
                            onChange={event => {
                                if (check?.length) {
                                    setCheck([]);
                                    return;
                                }

                                let values = entities?.data.map(value => value.id);
                                setCheck(values);
                            }}
                            checked={(check?.length > 0 && check?.length === entities?.data?.length)}
                            indeterminate={check?.length > 0 && check?.length < entities?.data?.length}
                        />
                    }

                    Tổng đơn hàng {Boolean(orderID) ? orderID : ''}
                </b>
                {
                    Boolean(check?.length)
                    &&
                    <DropMenu
                        crName={'Lựa chọn'}
                        className={clsx('text-white px-4 py-2 text-9 bg-green-500'
                            , `hover:bg-green-500`
                        )}
                        data={[
                            {
                                name: 'Chụp hình đơn đã chọn',
                                id: 1,
                            },
                        ]
                        }
                        small
                        handleClose={(value, setAnchorEl) => {
                            if (value?.id === 1) {
                                History.push(window.location.pathname + `?openCame=1`)
                            }
                            setAnchorEl(null)
                        }} />
                }
            </div>
            {
                orderID
                    ? <DetailOrder entities={entities} listProductTemp={listProductTemp} totalPr={totalPr} orderID={orderID} />
                    : <div className='flex '>
                        <table className='w-full text-10'>
                            <tbody>
                                <tr>
                                    <td colSpan={3} className='p-4'>
                                        <hr style={{ borderColor: 'aliceblue' }}></hr>
                                    </td>
                                </tr>
                            </tbody>

                            {
                                entities?.data?.length && entities.data.map((val, index) => (
                                    <TableWithCustomer setCheck={setCheck} val={{ ...val, checked: check.includes(val.id) }} key={val.id} index={index} handleRefresh={handleRefresh} />
                                ))
                            }
                        </table>
                    </div>
            }
        </div>
    </>

}

const DistrictTable = ({ entities, loading, setSearch, handleRefresh }) => {
    const classes = useStyles();
    const location = useLocation(), params2 = new URLSearchParams(location.search)
        , orderID = parseInt(params2.get('orderID')), openCame = parseInt(params2.get('openCame'))
        , shipID = parseInt(params2.get('shipID'));
    const [check, setCheck] = useState([]);
    const dispatch = useDispatch();
    const districtTemp = useMemo(() => {
        if (entities?.data?.length)
            return groupBy(entities.data, 'districtid');

        return null
    }, [entities])
    const listProductTemp = useMemo(() => {
        return returnListProductByOrderID(entities, orderID)
    }, [entities, orderID])

    const totalPr = useMemo(() => {
        return returnTotalAllProduct(listProductTemp)
    }, [listProductTemp])

    const handleSaveFile = async (array, setLoading) => {
        //setOpen(false)
        //window.alert(JSON.stringify(file));
        setLoading(true);
        const files = array.map(val => val.name).join(',');

        if (shipID) {
            const current = entities.data.find(element => {
                return element.shipping.id === parseInt(shipID)
            });

            getLocation(({ latitude, longitude }) => {
                handleSaveFileOut({
                    typeItem: 2,
                    data: [
                        {
                            id: current.shipping.id,
                            receiveimg: files,
                            session: current.shipping.session,
                            orderid: current.shipping.orderid,
                            deliveryid: current.shipping.deliveryid,
                            location: JSON.stringify({
                                start: { latitude, longitude },
                            })
                        }
                    ]
                }, handleRefresh, dispatch, array, () => {
                    setLoading(false);
                })
            }, dispatch);

        } else {
            getLocation(({ latitude, longitude }) => {
                const data = check.map(val => {
                    const current = entities.data.find(element => {
                        return element.id === parseInt(val)
                    });

                    return {
                        id: current.shipping.id,
                        receiveimg: files,
                        session: current.shipping.session,
                        orderid: current.shipping.orderid,
                        deliveryid: current.shipping.deliveryid,
                        location: JSON.stringify({
                            start: { latitude, longitude },
                        })
                    }
                })

                handleSaveFileOut({
                    typeItem: 2,
                    data
                }, handleRefresh, dispatch, array, () => {
                    setCheck([]);
                    setLoading(false);
                })
            }, dispatch)

        }


        // handleSaveFileOut({
        //     typeItem: 2,
        //     data: check.map(val => ({ id: val, receiveimg: name }))
        // }, handleRefresh, dispatch, file, () => {
        //     setCheck([]);
        // })
        // try {
        //     const data = new FormData();
        //     data.append('enpoint', 'tempfile');
        //     data.append('files', file);
        //     await Connect.live.uploadFile.insert(data);
        //     const resultAction = await dispatch(order.shipper.update())
        //     unwrapResult(resultAction);
        //     handleRefresh()
        //     History.push(window.location.pathname)
        // } catch (error) {
        //     window.alert(error)
        // }
    }

    return <>
        {
            parseInt(openCame) === 1 && <TakePhotoDialog className={classes.modal2} phone={entities?.data[0]?.shipping?.phone} saveFile={handleSaveFile} isNeedOpt />
        }

        <div className='p-8 rounded-4 shadow-4'>
            <div className='flex justify-between' style={{ height: 25 }}>
                <b>
                    Tổng đơn hàng {Boolean(orderID) ? orderID : ''}
                </b>
            </div>
            <div >
                {
                    orderID
                        ? <DetailOrder entities={entities} listProductTemp={listProductTemp} totalPr={totalPr} orderID={orderID} />
                        : <table className='w-full text-10' >
                            <tbody>
                                {
                                    Object.keys(districtTemp).map(val => (
                                        districtTemp[val].map((item, index) => (
                                            <tr>
                                                <td colSpan={1} rowSpan={index === 0 ? districtTemp[val]?.length : 0}
                                                    className={clsx('p-4', index > 0 ? 'hidden' : '')}
                                                    style={{ borderBottom: (Object.keys(districtTemp)?.length > 1) ? '1px solid rgb(219 219 219)' : '', borderRight: '1px solid rgb(219 219 219)' }}>
                                                    {
                                                        item.customerdistrict
                                                    }
                                                </td>
                                                <td className='pl-4 py-4' style={{ borderBottom: (Object.keys(districtTemp)?.length > 1) ? '1px solid rgb(219 219 219)' : '' }}>
                                                    <div className='flex items-baseline mb-2'>
                                                        <b className='mr-2'>
                                                            ID
                                                        </b>
                                                        <Link
                                                            to={`${window.location.pathname}?orderID=${item.id}`}
                                                        >
                                                            <div style={{ color: 'aqua', textDecoration: 'underline', cursor: 'pointer' }}>
                                                                {item.id}
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className='flex items-baseline mb-2'>
                                                        <FontAwesomeIcon icon={faUser} className='mr-2 text-10' />
                                                        {item.customername} - {item.customeremail}
                                                    </div>
                                                    <div className='flex items-baseline mb-2'>
                                                        <FontAwesomeIcon icon={faPhone} className='mr-2 text-10' />
                                                        {item.customermoblie}
                                                    </div>
                                                    <div className='flex items-baseline'>
                                                        <FontAwesomeIcon icon={faLocationDot} className='mr-2 text-10' />
                                                        {item.customeraddress}, {item.customerward}, {item.customerdistrict}, {item.customercity}
                                                    </div>
                                                </td>
                                                <td className='text-right' style={{ width: 100, borderBottom: (Object.keys(districtTemp)?.length > 1) ? '1px solid rgb(219 219 219)' : '' }}>
                                                    <DropMenu
                                                        crName={shipStatus[item.shipping.status].name}
                                                        className={clsx('text-white px-4 py-2 text-9'
                                                            , `hover:${shipStatus[item.shipping.status].className}`
                                                            , shipStatus[item.shipping.status].className
                                                        )}
                                                        data={[
                                                            {
                                                                name: 'Chụp hình',
                                                                id: 1,
                                                                show: item.shipping.status === 1
                                                            },
                                                            {
                                                                name: 'Giao hàng',
                                                                id: 2,
                                                                show: item.shipping.status === 2
                                                            }
                                                        ]
                                                            //  .filter(val => val.show)
                                                        }
                                                        handleClose={(value, setAnchorEl) => {
                                                            if (value?.id === 1) {
                                                                History.push(window.location.pathname + `?openCame=1&&shipID=${item.shipping.id}`)
                                                            }

                                                            if (value?.id === 2) {
                                                                History.push(`/delivery/${item.shipping.id}/${encodeURIComponent(item.shipping.deliverysession)}/${item.shipping.orderid}`)
                                                            }
                                                            //setOpenDialog('photo')
                                                            setAnchorEl(null)
                                                        }} />
                                                </td>
                                            </tr>
                                        ))
                                    ))
                                }
                            </tbody>
                        </table>
                }
            </div>
        </div>
    </>

}

export const TakePhotoDialog = ({ open, phone, className, saveFile, check, isNeedOpt }) => {
    const classes = useStyles();
    const webcamRef = useRef(null);
    const [frontCamera, setFrontCamera] = useState(false);
    const [photoData, setPhotoData] = useState([]);
    const location = useLocation(), params2 = new URLSearchParams(location.search)
        , openCameUrl = parseInt(params2.get('openCame'));
    //const loading = useSelector(store => store[keyStore].order.btnLoading)
    const [file, setFile] = useState(null);
    const [openCame, setOpenCame] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState('');
    const [type, setType] = useState(true);
    const dispatch = useDispatch();

    const videoConstraints = {
        width: window.innerWidth,
        height: window.innerHeight,
        facingMode: frontCamera ? 'user' : 'environment',
    };

    useEffect(() => {
        setOpenCame(parseInt(openCameUrl) === 1);
        setPhotoData([]);
        setFile(null);
    }, [openCameUrl])

    const handleCapture = () => {
        const imageSrc = webcamRef.current.getScreenshot({
            width: 960, // Set the desired width for the screenshot (e.g., 1280)
            height: 540, // Set the desired height for the screenshot (e.g., 720)
            screenshotQuality: 1.0, // Set the screenshot quality to 1.0 for maximum quality (no compression)
        });
        setPhotoData(prev => [...prev, imageSrc]);
    };

    const handleCameraSwitch = () => {
        setFrontCamera(prevFrontCamera => !prevFrontCamera);
    };

    const savePhoto = () => {
        if (photoData?.length) {
            let fileArray = photoData.map((val, i) => {
                const blob = dataURItoBlob(val);
                const name = `${Date.now()}_${i}.jpeg`;
                const file = new File([blob], name, { type: 'image/jpeg' });
                return { name, file }
            })

            // Update the input file element's value to include the captured photo
            saveFile(fileArray, setLoading)
            // const inputFile = document.getElementById('photoInput');
            // inputFile.files = [file];
        }
    }

    const handleAddCapturedPhoto = () => {
        if (isNeedOpt) {
            setType(true);
            setOpenDialog('2FA');
        } else {
            savePhoto();
        }
    };

    const saveFileSelect = () => {
        if (file?.length) {
            let fileArray = [];
            for (let i = 0; i < file.length; i++) {
                const fileN = file[i];

                const name = `${Date.now()}_${i}.jpeg`;
                const fileWithMetadata = new Blob([fileN], { type: fileN.type });
                fileWithMetadata.name = name;

                fileArray.push({
                    file: fileWithMetadata,
                    name: name
                })
            }
            saveFile(fileArray, setLoading)
        }
    }

    const handleSaveFile = () => {
        if (isNeedOpt) {
            setOpenDialog('2FA');
            setType(false);
        } else {
            saveFileSelect();
        }
    }

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

    const handleSave2FA = (otp) => {
        Connect.live.order.other.checkOpt({ phone, otp }).then(val => {
            if (type) {
                if (photoData?.length) {
                    savePhoto();
                }
            } else {
                if (file?.length) {
                    saveFileSelect()
                }
            }
        }).catch(() => {
            setTimeout(() => {
                dispatch(showMessage({ variant: "error", message: 'Sai mã OPT' }))
            }, 0);
        })
    }

    return <>
        {
            openDialog === '2FA' && <OPTDialog className={classes.modalSmall} open={true} handleSave={handleSave2FA} handleClose={() => setOpenDialog('')} />
        }
        <Dialog className={classes.modal2} open={openCame} fullWidth maxWidth="md">
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
                        <button onClick={handleCapture} style={{ width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid white', borderRadius: '50%', fontSize: '30px', background: 'white' }}>
                        </button>
                        <button onClick={handleCameraSwitch} style={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid white', borderRadius: '50%', fontSize: '18px', color: 'white' }}>
                            <FontAwesomeIcon icon={faCameraRotate} />
                        </button>
                    </div>

                </div>

                {Boolean(photoData?.length) &&
                    <>
                        <div className="photo-preview flex flex-wrap w-full mt-8 ">
                            {
                                photoData.map((val, i) => (<div className='w-1/2 mb-8 relative' key={i}>
                                    <img src={val} alt="Captured" className='w-full mb-8' />
                                    <div className='absolute top-8 right-8'>
                                        <CmsButtonProgress
                                            type="submit"
                                            label={"Xóa"}
                                            onClick={() => setPhotoData((prev) => prev.filter((data) => data !== val))}
                                            className='bg-red-500 hover:bg-red-900 absolute top-8 right-8'
                                            size="small" />
                                    </div>
                                </div>))
                            }
                            {/* <Button
                            size='small'
                            variant='contained'
                            color='primary'
                            onClick={handleAddCapturedPhoto}
                            className='absolute top-8 right-8'
                        >
                            Lưu
                        </Button> */}
                        </div>
                        <div>
                            <CmsButtonProgress
                                loading={loading}
                                type="submit"
                                label={"Lưu"}
                                onClick={handleAddCapturedPhoto}
                                size="small" />
                        </div>
                    </>
                }

                <div className='flex justify-between items-center mt-8'>
                    <div className='flex items-center'>
                        <CmsUploadFile
                            size="small"
                            label="Chọn file hình"
                            id="uploadfile"
                            fileProperties={
                                {
                                    accept: '.png, .jpeg, .jpg, .gif'
                                }
                            }
                            isMultiple
                            className='mr-8'
                            setValue={(value, setLoading, resetFileInput) => {
                                setFile(value)
                                resetFileInput();
                            }} />
                        {
                            file && `Đã chọn ${file?.length} hình`
                        }
                    </div>
                    {
                        file &&
                        // <Button
                        //     size='small'
                        //     variant='contained'
                        //     color='primary'
                        //     onClick={handleSaveFile}
                        // >
                        //     Lưu
                        // </Button>
                        <div>
                            <CmsButtonProgress
                                loading={loading}
                                type="submit"
                                label={"Lưu"}
                                onClick={handleSaveFile}
                                size="small" />
                        </div>
                    }
                </div>

            </DialogContent>
        </Dialog>
    </>
}

const EmployDelivery = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector(store => store[keyStore].order.loading);
    const entities = useSelector(store => store[keyStore].order.detailDelivery);
    const [search, setSearch] = useState(initialValues);
    const params = useParams(), type = params.type, session = params.session;
    const location = useLocation(), params2 = new URLSearchParams(location.search)
        , orderID = (params2.get('orderID'));
    const [openDialog, setOpenDialog] = useState('');
    const checkAllReceive = useMemo(() => {
        if (entities?.data?.length) {
            const pass = entities.data.filter(val => {
                return val.shipping.status === 2
            })

            return pass.length === entities.data.length
        }

        return false
    }, [entities])

    const getListTable = useCallback((search) => {
        dispatch(order.shipper.getDetailShipDelivery({ ...search, session: decodeURIComponent(session) }));
    }, [dispatch, session])

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

    const handleSave2FA = (value) => {
        setOpenDialog('')
    }

    if (loading)
        return <FuseLoading />

    return (
        <div>
            <link rel="stylesheet" href="assets/css/CameraComponent.css" />
            <FuseMessage />
            <Dialog className={classes.modal} open={true} fullWidth maxWidth="md">

                <DialogTitle>
                    <div className={classes.root}>
                        <div style={{
                            background: '#fafafa!important',
                        }} >
                            <HeadDelivery entities={entities} />
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
                        <CmsTab data={deliveryLink(session)} value={0} isLink={true} onChange={(e, value) => {
                            History.push(deliveryLink(session).find(e => e.id === value)?.link)
                        }} />

                        {
                            orderID
                                ?
                                <Link
                                    to={`${window.location.pathname}`}
                                >
                                    <div className='text-10' style={{ width: 54, color: '#e35c5c', textDecoration: 'underline', cursor: 'pointer' }}>
                                        <FontAwesomeIcon icon={faArrowLeft} className='mr-2' />
                                        Trở lại
                                    </div>
                                </Link>
                                : <>
                                    {
                                        (checkAllReceive && type === '2')
                                        &&
                                        <Button
                                            size='small'
                                            variant='outlined'
                                            color='primary'
                                            style={{ textTransform: 'initial' }}
                                            className='cursor-default'
                                        >
                                            Nhận đủ
                                        </Button>
                                    }
                                </>
                        }
                    </div>


                    {
                        type === '1'
                            ? <ProductTable entities={entities} loading={loading} setSearch={setSearch} />
                            : type === '2'
                                ? <OrderTable entities={entities} loading={loading} setSearch={setSearch} handleRefresh={handleRefresh} />
                                : type === '3'
                                    ? <DistrictTable entities={entities} loading={loading} setSearch={setSearch} handleRefresh={handleRefresh} />
                                    : <MapLocation entities={entities} loading={loading} setSearch={setSearch} handleRefresh={handleRefresh} />
                    }
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
            {
                openDialog === '2FA' && <OPTDialog className={classes.modalSmall} open={true} handleSave={handleSave2FA} handleClose={() => setOpenDialog('')} />
            }
        </div>
    );
}
export default withReducer(keyStore, reducer)(EmployDelivery);
