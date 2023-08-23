import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Menu, MenuItem, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { faArrowLeft, faDollarSign, faImages, faLocationDot, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowDropDown } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import withReducer from 'app/store/withReducer';
import { CmsCheckbox, CmsTab } from '@widgets/components';
import History from '@history/@history';
import { flatMap, groupBy } from 'lodash';
import { DropMenu } from '../order/components/index/index';
import { Link } from 'react-router-dom';
import Connect from '@connect/@connect';
import { unwrapResult } from '@reduxjs/toolkit';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import { returnListProductByOrderID, returnTotalAllProduct } from './common';
import OPTDialog from './components/OPTDialog';
import FuseMessage from '@fuse/core/FuseMessage/FuseMessage';
import { getLocation } from '.';
import MapLocation from './components/MapLocation';
import { accounting as acc } from '../accounting/store';
import { shipStatus } from '../accounting/common';
import HeadDelivery from '../delivery/components/Header';
import { TakePhotoDialog } from '../delivery/EmployDelivery';
import { format } from 'date-fns';
import reducer from './store';
import MediaDialog from '../delivery/components/MediaDialog';

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
        },
        '& .gm-style-iw': {
            padding: '4px !important'
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
const keyStore = 'accounting';
const initialValues = {

};

export const deliveryLink = (session) => [
    { id: 1, name: "Bill", link: `/employ-collection/1/${session}`, icon: "" },
    { id: 4, name: "Bản đồ", link: `/employ-collection/4/${session}`, icon: "" },
];

const List = ({ listProduct, totalPr }) => {
    return <div className='flex '>
        <table className='w-full text-10'>
            <tbody>
                <tr>
                    <td colSpan={2} className='p-4'>
                        <hr style={{ borderColor: 'aliceblue' }}></hr>
                    </td>
                </tr>
            </tbody>
            <tbody>
                {
                    listProduct.map((val, index) => (
                        <tr style={{ verticalAlign: 'baseline' }} key={index}>
                            <td>
                                Order ID: {val.collection.orderid} - {format(new Date(val.collection.createdate), 'dd-MM-yyyy HH:mm')}
                            </td>
                            <td className='text-right'>
                                {typeof val.collection.valuecollect === 'number'
                                    ? val.collection.valuecollect.toLocaleString('en-US')
                                    : '-'}đ
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            <tbody>
                <tr>
                    <td colSpan={2} className='p-4'>
                        <hr style={{ borderColor: 'aliceblue' }}></hr>
                    </td>
                </tr>
            </tbody>
            <tbody>
                <tr style={{ verticalAlign: 'baseline' }}>
                    <td>
                        <b>
                            Tổng tiền:
                        </b>
                    </td>
                    <td className='text-right'>
                        <b>
                            {totalPr.toLocaleString('en-US')} đ
                        </b>
                    </td>
                </tr>
            </tbody>
        </table>
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
        const resultAction = await dispatch(acc.bill.update(value))
        unwrapResult(resultAction);
        handleRefresh()
        successFc()
        History.push(window.location.pathname)
    } catch (error) {
        window.alert(error)
    }
}

const TableWithCustomer = ({ setCheck, val, index, noBorder, handleRefresh }) => {

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
                                    return e.includes(val.billingid) ? e.filter(el => el !== val.billingid) : [...e, val.billingid];
                                })
                            }}
                            disabled={val.status !== 1 && val.status !== 2}
                        />
                    }
                </td>
                <td className='pl-2'>
                    <div className='flex items-baseline mb-2'>
                        <b className='mr-2'>
                            ID
                        </b>
                        <Link
                            to={`${window.location.pathname}?billingID=${val.billingid}`}
                        >
                            <div style={{ color: 'aqua', textDecoration: 'underline', cursor: 'pointer' }}>
                                {val.billingid}
                            </div>
                        </Link>
                    </div>
                    <div className='flex items-baseline mb-2'>
                        <FontAwesomeIcon icon={faUser} className='mr-2 text-10' />
                        {val.cusname}
                    </div>
                    <div className='flex items-baseline mb-2'>
                        <FontAwesomeIcon icon={faPhone} className='mr-2 text-10' />
                        {val.cusphone}
                    </div>
                    <div className='flex items-baseline'>
                        <FontAwesomeIcon icon={faLocationDot} className='mr-2 text-10' />
                        {val.address}, {val.ward}, {val.district}, {val.city}
                    </div>
                    <div className='flex items-baseline text-green-500'>
                        <FontAwesomeIcon icon={faDollarSign} className='mr-2 text-10 relative top-1' />
                        {(val.valuecollect || 0).toLocaleString('en-US')}
                    </div>
                </td>
                <td className='text-right' style={{ width: 85 }}>
                    <DropMenu
                        crName={shipStatus[val.status].name}
                        className={clsx('text-white px-4 py-2 text-9'
                            , `hover:${shipStatus[val.status].className}`
                            , shipStatus[val.status].className
                        )}
                        data={[
                            {
                                name: 'Chụp hình',
                                id: 1,
                                show: val.status <= 2
                            },
                            {
                                name: 'Thu tiên',
                                id: 2,
                                show: true
                            },
                            {
                                name: 'Mở google map',
                                id: 3,
                            }
                        ]
                            .filter(val => val.show)
                        }
                        handleClose={(value, setAnchorEl) => {
                            if (value?.id === 1) {
                                History.push(window.location.pathname + `?openCame=1&&billingID=${val.billingid}`)
                            }

                            if (value?.id === 2) {
                                History.push(`/collect/${val.billingid}/${encodeURIComponent(val.collectsession)}`)
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

const DetailOrder = ({ entities, objectCollection, billingID }) => {
    const total = useMemo(() => {
        let t = 0;
        if (objectCollection[billingID]?.length)
            objectCollection[billingID].forEach(element => {
                t = t + element.collection.valuecollect;
            });

        return t
    }, [objectCollection, billingID]);
    return <>
        <table className='w-full text-10'>
            {
                entities?.data?.length && entities.data.map((val, index) => {
                    return val.billingid === billingID ? <TableWithCustomer val={val} key={val.id} index={0} noBorder /> : null
                })
            }
        </table>
        {
            Boolean(objectCollection[billingID]?.length)
            &&
            <List listProduct={objectCollection[billingID]} totalPr={total} />
        }
    </>
}

const OrderTable = ({ entities, loading, setSearch, handleRefresh, objectCollection }) => {
    const classes = useStyles();
    const location = useLocation(), params2 = new URLSearchParams(location.search)
        , openCame = parseInt(params2.get('openCame'))
        , billingID = (params2.get('billingID'));
    const [check, setCheck] = useState([]);
    const dispatch = useDispatch();

    const handleSaveFile = async (array, setLoading) => {
        //setOpen(false)
        //window.alert(JSON.stringify(file));
        setLoading(true);
        const files = array.map(val => val.name).join(',');

        if (billingID) {
            const current = objectCollection[billingID]

            getLocation(({ latitude, longitude }) => {
                handleSaveFileOut({
                    typeItem: 2,
                    data: current.map(va => (
                        {
                            ...va.collection,
                            avatar: files,
                            location: JSON.stringify({
                                start: { latitude, longitude },
                            })
                        }
                    ))
                }, handleRefresh, dispatch, array, () => {
                    setLoading(false);
                })
            }, dispatch);

        } else {
            getLocation(({ latitude, longitude }) => {
                const data = check.map(val => {
                    const current = objectCollection[val]

                    return current.map(va => ({
                        ...va.collection,
                        // id: va.collection.id,
                        avatar: files,
                        // session: va.collection.session,
                        // orderid: va.collection.orderid,
                        // billingid: va.collection.billingid,
                        // collectid: va.collection.collectid,
                        location: JSON.stringify({
                            start: { latitude, longitude },
                        })
                    }))
                })

                handleSaveFileOut({
                    typeItem: 2,
                    data: flatMap(data)
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
            parseInt(openCame) === 1 && <TakePhotoDialog className={classes.modal2} phone={entities?.data[0]?.phone} saveFile={handleSaveFile} isNeedOpt />
        }

        <div className='p-8 rounded-4 shadow-4'>
            <div className='flex justify-between' style={{ height: 25 }}>
                <b >
                    {
                        !Boolean(billingID)
                        &&
                        <CmsCheckbox
                            className='relative -top-1'
                            onChange={event => {
                                if (check?.length) {
                                    setCheck([]);
                                    return;
                                }

                                let values = entities?.data.map(value => value.billingid);
                                setCheck(values);
                            }}
                            checked={(check?.length > 0 && check?.length === entities?.data?.length)}
                            indeterminate={check?.length > 0 && check?.length < entities?.data?.length}
                        />
                    }

                    Tổng bill {Boolean(billingID) ? billingID : ''}
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
                                name: 'Chụp hình mặt cá nhân',
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
                billingID
                    ? <DetailOrder entities={entities} objectCollection={objectCollection} billingID={billingID} />
                    :
                    <div className='flex '>
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
                                    <TableWithCustomer setCheck={setCheck} val={{ ...val, checked: check.includes(val.billingid) }} key={val.billingid} index={index} handleRefresh={handleRefresh} />
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
        , billingID = (params2.get('billingID'));
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

        if (billingID) {
            const current = entities.data.find(element => {
                return element.shipping.id === billingID
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
                                                                show: item.collection.status <= 2
                                                            },
                                                            {
                                                                name: 'Thu tiên',
                                                                id: 2,
                                                                show: true
                                                            }
                                                        ]
                                                            .filter(val => val.show)
                                                        }
                                                        handleClose={(value, setAnchorEl) => {
                                                            if (value?.id === 1) {
                                                                History.push(window.location.pathname + `?openCame=1&&billingID=${item.billingid}`)
                                                            }

                                                            if (value?.id === 2) {
                                                                History.push(`/employ-collection/${item.billingid}/${encodeURIComponent(item.shipping.deliverysession)}/${item.shipping.orderid}`)
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

const EmployDelivery = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector(store => store[keyStore].loading);
    const entities = useSelector(store => store[keyStore].collectionBill);
    const collectionOrder = useSelector(store => store[keyStore].collectionOrder);
    const [search, setSearch] = useState(initialValues);
    const params = useParams(), type = params.type, session = params.session;
    const location = useLocation(), params2 = new URLSearchParams(location.search)
        , billingID = (params2.get('billingID'));
    const [openDialog, setOpenDialog] = useState('');
    const checkAllReceive = useMemo(() => {
        if (entities?.data?.length) {
            const pass = entities.data.filter(val => {
                return val.status >= 2
            })

            return pass.length === entities.data.length
        }

        return false
    }, [entities])
    const isPassReceive = useMemo(() => {
        if (entities?.data?.length) {
            const pass = entities.data.filter(val => {
                return val.status >= 2
            })

            return Boolean(pass?.length)
        }

        return false
    }, [entities])
    const objectCollection = useMemo(() => {
        if (collectionOrder?.data?.length) {
            const data = [...collectionOrder.data.map(val => ({ ...val, billingid: val.collection.billingid })),
            ];

            return groupBy(data, 'billingid')
        }

        return {}
    }, [collectionOrder])

    const getListTable = useCallback((search) => {
        dispatch(acc.bill.getCollectOrderPhone({ ...search, session: decodeURIComponent(session) }));
        dispatch(acc.bill.getCollectBillPhone({ ...search, session: decodeURIComponent(session) }));
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
            {
                openDialog === 'media'
                &&
                <MediaDialog
                    open
                    entities={collectionOrder}
                    classes={classes.modal2}
                    handleClose={() => setOpenDialog('')} />
            }
            <link rel="stylesheet" href="assets/css/CameraComponent.css" />
            <FuseMessage />
            <Dialog className={classes.modal} open={true} fullWidth maxWidth="md">

                <DialogTitle>
                    <div className={classes.root}>
                        <div style={{
                            background: '#fafafa!important',
                        }} >
                            <HeadDelivery phone={entities?.data[0]?.phone} name={entities?.data[0]?.collector} />
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent className='text-11'>
                    <div className='flex flex-wrap w-full p-8 rounded-4 shadow-4'>
                        <div className='w-3/4'>
                            <div>
                                <b className='mr-4'>
                                    Mã biên bản:
                                </b>
                                {entities?.data?.length && entities.data[0]?.collectid}
                            </div>
                            <div>
                                <b className='mr-4'>
                                    Tổng bill:
                                </b>
                                {entities?.data?.length}
                            </div>
                        </div>
                        <div className='w-1/4 text-right'>
                            {
                                isPassReceive
                                &&
                                <Button
                                    size='small'
                                    variant="contained"
                                    type='submit'
                                    color='primary'
                                    style={{
                                        textTransform: 'initial',
                                        minWidth: 'initial'
                                    }}
                                    onClick={() => {
                                        setOpenDialog('media')
                                    }}
                                >
                                    <FontAwesomeIcon icon={faImages} />
                                </Button>
                            }
                        </div>
                    </div>
                    <hr className='my-8' style={{ borderColor: 'aliceblue' }}></hr>
                    <div className='flex justify-between items-center'>
                        <CmsTab data={deliveryLink(session)} value={0} isLink={true} onChange={(e, value) => {
                            History.push(deliveryLink(session).find(e => e.id === value)?.link)
                        }} />

                        {
                            billingID
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
                                        (checkAllReceive && type === '2' && false)
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
                            ? <OrderTable
                                objectCollection={objectCollection}
                                entities={entities}
                                loading={loading}
                                setSearch={setSearch}
                                handleRefresh={handleRefresh} />
                            : type === '3'
                                ? <DistrictTable
                                    entities={entities}
                                    loading={loading}
                                    setSearch={setSearch}
                                    handleRefresh={handleRefresh} />
                                : <MapLocation open={type === '4'} entities={{
                                    ...entities,
                                    data: entities?.data?.length ? entities.data.map(val => ({
                                        ...val,
                                        customeraddress: val.address,
                                        customerward: val.ward,
                                        customerdistrict: val.district,
                                        customercity: val.city
                                    }))
                                        : []
                                }} loading={loading} setSearch={setSearch} handleRefresh={handleRefresh} />
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
