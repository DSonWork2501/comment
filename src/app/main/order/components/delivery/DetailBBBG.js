import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CmsTableBasic, CmsLabel, CmsTab, CmsFormikTextField, CmsFormikAutocomplete, CmsButton } from '@widgets/components';
import { Box, Button, Icon, TableCell, TableRow, Typography, styled } from '@material-ui/core';
import { initColumn } from '@widgets/functions';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import History from '@history';
import { deliveryLink, keyStore, shipStatus } from '../../common';
import { order } from '../../store/orderSlice';
import reducer from '../../store';
import { useParams } from 'react-router';
import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import { useFormik } from 'formik';
import { groupBy, map } from 'lodash';
import clsx from 'clsx';
import { DropMenu } from '../index';
import { Link } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import MapLocation from 'app/main/delivery/components/MapLocation';
import MediaDialog from 'app/main/delivery/components/MediaDialog';

const LayoutCustom = styled(Box)({
    height: "100%",
    "& .inner-scroll>div": {
        minHeight: 'initial'
    },
    '& [class^="makeStyles-header-"]': {
        minHeight: '7.8rem !important',
        height: '7.8rem !important'
    },
});

const initialValues = {
    page: 1,
    limit: 10,
    orderID: '',
    status: null
};

const Filter = ({ onSearch, search, namePage }) => {

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit
    })
    const { setFieldValue } = formik;

    useEffect(() => {
        if (search) {
            for (const key in initialValues) {
                if (search[key] !== initialValues[key]) {
                    let value = search[key];
                    setFieldValue(key, value);
                }
            }
        }
    }, [search, setFieldValue])

    function handleSubmit(value) {
        let values = { ...value };
        if (values.status)
            values.status = parseInt(values.status);
        onSearch(values);
    }

    return <form onSubmit={formik.handleSubmit} className="flex items-center justify-items-start  space-x-8 px-8" >
        <CmsFormikTextField
            label={`ID đơn hàng`}
            name="orderID"
            className="my-8"
            size="small"
            clearBlur
            formik={formik} />
        {/* <CmsFormikTextField
            label={`Sản phẩm`}
            name="name"
            className="my-8"
            size="small"
            clearBlur
            formik={formik} /> */}
        <CmsFormikAutocomplete
            className="my-8 inline-flex"
            name="status"
            formik={formik}
            label="Trạng thái"
            data={Object.values(shipStatus)}
            size="small"
            autocompleteProps={{
                getOptionLabel: (option) => option?.name || '',
                ChipProps: {
                    size: 'small'
                },
                size: 'small',
            }}
            setOption={(option) => option?.name || ''}
            valueIsId='status' />
        <Button
            style={{
                background: '#FF6231',
                color: 'white',
                height: 36,
                position: 'relative',
                top: -1
            }}
            size='small'
            variant="contained"
            type='submit'
        >
            <Icon>
                search
            </Icon>
        </Button>
        <Button
            style={{
                color: 'black',
                height: 36,
                position: 'relative',
                top: -1
            }}
            size='small'
            variant="contained"
            type='submit'
            onClick={() => formik.handleReset()}
        >
            <Icon>
                refresh
            </Icon>
        </Button>
    </form>
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
                    price: products.reduce((sum, currentItem) => sum + currentItem.price, 0),
                    numberPR: products.length,
                })),
                ...map(groupedData, (products, sku) => ({
                    ...products[0],
                    price: products.reduce((sum, currentItem) => sum + currentItem.price, 0),
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
                money = money + ((element.price || 0));
            });
        return { total, money }
    }, [listProduct])

    const columns = [
        new initColumn({ field: "STT", label: "STT", style: { width: 50 }, sortable: false }),
        new initColumn({ field: "sku", label: "ID", classHeader: "w-128", sortable: false }),
        new initColumn({ field: "image", label: `Hình ảnh`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "name", label: `Sản phẩm`, alignHeader: "center", alignValue: "left", visible: true, sortable: false }),
        new initColumn({ field: "type", label: `Loại`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "price", label: `Giá`, alignHeader: "right", alignValue: "right", visible: true, sortable: false }),
        new initColumn({ field: "numberPR", label: `Tổng số lượng`, alignHeader: "right", alignValue: "right", visible: true, sortable: false }),
    ]
    const data = listProduct?.length && listProduct.map((item, index) => ({
        ...item,
        original: item,
        image: (<img style={{ height: 100, margin: '0 auto' }} src={`${item.img ? `${process.env.REACT_APP_BASE_URL}api/product/img/${item?.img}` : 'assets/images/etc/no-image-icon.png'}`} alt={item?.img} />),
        STT: (
            <React.Fragment>
                <CmsLabel content={`${(index + 1)}`} />
            </React.Fragment>
        ),

        name: (
            <>
                <div className={clsx(item.type === 'table' ? 'text-blue-500' : '')}>
                    {item.name}
                </div>
            </>
        ),
        type: (
            <>
                {
                    item.type === 'table' ? 'Tủ' : 'Chai'
                }
            </>
        ),
        price: (
            <div>
                {
                    typeof item?.price === 'number' ? (item.price || 0).toLocaleString('en-US') : '-'
                }
            </div>
        ),
        action: (
            <div className="flex space-x-3 ">

            </div>
        ),
    }))
    return <CmsTableBasic
        className="w-full h-full "
        isServerSide={true}
        apiServerSide={params => setSearch(prev => {
            return { ...prev, ...params }
        })}
        isPagination={false}
        data={data}
        columns={columns}
        loading={loading}
        moreFooter={
            <TableRow>
                <TableCell
                    colSpan={5}
                    className="text-center p-8"
                    style={{
                        borderRight: '1px solid #ddd',
                        backgroundColor: '#F2F8F1'
                    }}
                >
                    <b>
                        TỔNG:
                    </b>
                </TableCell>
                <TableCell
                    className="text-right p-8"
                    style={{
                        borderRight: '1px solid #ddd',
                        backgroundColor: '#F2F8F1'
                    }}
                >
                    {(totalPr.money || 0).toLocaleString('en-US')}
                </TableCell>
                <TableCell
                    className="text-right p-8"
                    style={{
                        borderRight: '1px solid #ddd',
                        backgroundColor: '#F2F8F1'
                    }}
                >
                    {totalPr.total}
                </TableCell>
            </TableRow>
        }
    />
}

const OrderTable = ({ entities, loading, setSearch }) => {
    const listProduct = useMemo(() => {
        let data = [];
        if (entities?.data?.length) {
            entities.data.forEach(element => {
                element?.productorder?.length && element.productorder.forEach(e => {
                    if (Boolean(element.parentid)) {
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
                                price: e.price,
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
                            price: e.price,
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
                    price: products.reduce((sum, currentItem) => sum + currentItem.price, 0),
                    numberPR: products.length,
                })),
                ...map(groupedData, (products, sku) => ({
                    ...products[0],
                    price: products.reduce((sum, currentItem) => sum + currentItem.price, 0),
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
                money = money + ((element.price || 0));
            });
        return { total, money }
    }, [listProductTemp])

    const columns = [
        // new initColumn({ field: "STT", label: "STT", style: { width: 50 }, sortable: false }),
        new initColumn({ field: "id", label: "ID", classHeader: "w-128", sortable: false }),
        new initColumn({ field: "image", label: `Hình ảnh`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "name", label: `Sản phẩm`, alignHeader: "center", alignValue: "left", visible: true, sortable: false }),
        new initColumn({ field: "customer", label: `Khách hàng`, alignHeader: "center", alignValue: "left", visible: true, sortable: false }),
        new initColumn({ field: "type", label: `Loại`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "sl", label: `SL`, alignHeader: "right", alignValue: "right", visible: true, sortable: false }),
        new initColumn({ field: "price", label: `Giá`, alignHeader: "right", alignValue: "right", visible: true, sortable: false }),
        new initColumn({ field: "OPT", label: `OPT`, alignHeader: "right", alignValue: "right", visible: true, sortable: false }),
        new initColumn({ field: "status", label: `Trạng thái`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
    ]

    const data = listProduct.length && listProduct.map((item, index) => ({
        original: item,
        id: item.id,
        rowSpan: {
            id: item?.numberPR || 1,
            status: item?.numberPR || 1,
            STT: item?.numberPR || 1,
            OPT: item?.numberPR || 1,
            customer: item?.numberPR || 1,
        },
        OPT: (item?.shipping?.code),
        keyRow: item.keyRow,
        image: (<img style={{ height: 100, margin: '0 auto' }} src={`${item.dataOfItem.img ? `${process.env.REACT_APP_BASE_URL}api/product/img/${item.dataOfItem?.img}` : 'assets/images/etc/no-image-icon.png'}`} alt={item.dataOfItem?.img} />),
        name: (<>
            {
                item.dataOfItem.type === 'table'
                    ? <b className='text-blue-500'>{item.dataOfItem.name}</b>
                    : <CmsLabel content={`--- ${(item.dataOfItem.name)}`} />
            }
        </>),
        sl: (1),
        type: (<>
            {
                item.dataOfItem.type === 'table'
                    ? 'Tủ'
                    : 'Chai'
            }
        </>),
        price: (
            <div>
                {
                    typeof item?.dataOfItem?.price === 'number' ? (item?.dataOfItem?.price || 0).toLocaleString('en-US') : '-'
                }
            </div>
        ),
        STT: (
            <React.Fragment>
                <CmsLabel content={`${(index + 1)}`} />
            </React.Fragment>
        ),
        customer: (
            <>
                <div>
                    <b className='mr-4'>
                        Tên khách hàng:
                    </b>
                    {item?.customername}
                </div>
                <div>
                    <b className='mr-4'>
                        Số điện thoại:
                    </b>
                    {item?.customermoblie}
                </div>
                <div>
                    <b className='mr-4'>
                        Địa chỉ:
                    </b>
                    {item?.customeraddress}, {item?.customerward}, {item?.customerdistrict}, {item?.customercity}
                </div>
                {/* <div>
                    <b className='mr-4'>
                        Hình nhận hàng:
                    </b>
                    {item.shipping?.receiveimg.split(',').map(val => (
                        val ? <img alt='val' src={`${baseurl}/common/files/${val}?application=3`} /> : null
                    ))}
                </div> */}
            </>
        ),
        status: <div>
            <DropMenu
                crName={shipStatus[item.shipping.status].name}
                className={clsx('text-white px-4 py-2  text-12'
                    , `hover:${shipStatus[item.shipping.status].className}`
                    , shipStatus[item.shipping.status].className
                )}
                data={[]}

                handleClose={(value, setAnchorEl) => {
                    setAnchorEl(null)
                }} />
            {/* <CmsLabel component={'span'} content={orderStatus[item.status].name} className={clsx('text-white p-6 rounded-12', orderStatus[item.status].className)} /> */}
        </div>,
        action: (
            <div className="flex space-x-3 ">

            </div>
        ),
    }))

    return <CmsTableBasic
        className="w-full h-full"
        isServerSide={true}
        apiServerSide={params => setSearch(prev => {
            return { ...prev, ...params }
        })}
        isPagination={false}
        data={data}
        columns={columns}
        loading={loading}
        isClearHoverBg
        removeSelect
        moreFooter={
            <TableRow>
                <TableCell
                    colSpan={5}
                    className="text-center p-8"
                    style={{
                        borderRight: '1px solid #ddd',
                        backgroundColor: '#F2F8F1'
                    }}
                >
                    <b>
                        TỔNG:
                    </b>
                </TableCell>

                <TableCell
                    className="text-right p-8"
                    style={{
                        borderRight: '1px solid #ddd',
                        backgroundColor: '#F2F8F1'
                    }}
                >
                    {totalPr.total}
                </TableCell>
                <TableCell
                    style={{
                        borderRight: '1px solid #ddd',
                        backgroundColor: '#F2F8F1'
                    }}
                    className='p-8 text-right'
                >
                    {totalPr.money.toLocaleString('en-US')}
                </TableCell>
                <TableCell
                    style={{
                        borderRight: '1px solid #ddd',
                        backgroundColor: '#F2F8F1'
                    }}
                    className='p-8'
                >

                </TableCell>
                <TableCell
                    style={{
                        borderRight: '1px solid #ddd',
                        backgroundColor: '#F2F8F1'
                    }}
                    className='p-8'
                >

                </TableCell>

            </TableRow>
        }
    />
}

const DistrictTable = ({ entities, loading, setSearch, handleRefresh }) => {
    const districtTemp = useMemo(() => {
        if (entities?.data?.length)
            return groupBy(entities.data, 'districtid');

        return null
    }, [entities])

    const mergedArray = useMemo(() => {
        let array = [];
        if (districtTemp) {
            Object.keys(districtTemp).forEach(element => {
                array = [...array, ...districtTemp[element].map((val, index) => ({ ...val, keyRow: index + 1 }))]
            });
        }

        return array
    }, [districtTemp])


    const columns = [
        new initColumn({ field: "district", label: "Tỉnh thành", classHeader: "w-128", sortable: false }),
        new initColumn({ field: "customer", label: `Khách hàng`, alignHeader: "center", alignValue: "left", visible: true, sortable: false }),
        new initColumn({ field: "status", label: `Trạng thái`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
    ]

    const data = mergedArray.length && mergedArray.map((item, index) => ({
        original: item,
        rowSpan: {
            district: districtTemp[item.districtid]?.length || 1,
            status: districtTemp[item.districtid]?.length || 1,
        },
        keyRow: item.keyRow,
        district: (
            <>
                {item?.customerdistrict}
            </>
        ),
        customer: (
            <>
                <div>
                    <b className='mr-4'>
                        Tên khách hàng:
                    </b>
                    {item?.customername}
                </div>
                <div>
                    <b className='mr-4'>
                        Số điện thoại:
                    </b>
                    {item?.customermoblie}
                </div>
                <div>
                    <b className='mr-4'>
                        Địa chỉ:
                    </b>
                    {item?.customeraddress}, {item?.customerward}, {item?.customerdistrict}, {item?.customercity}
                </div>
            </>
        ),
        status: <div>
            <DropMenu
                crName={shipStatus[item.shipping.status].name}
                className={clsx('text-white px-4 py-2  text-12'
                    , `hover:${shipStatus[item.shipping.status].className}`
                    , shipStatus[item.shipping.status].className
                )}
                data={[]}

                handleClose={(value, setAnchorEl) => {
                    setAnchorEl(null)
                }} />
            {/* <CmsLabel component={'span'} content={orderStatus[item.status].name} className={clsx('text-white p-6 rounded-12', orderStatus[item.status].className)} /> */}
        </div>,
        action: (
            <div className="flex space-x-3 ">

            </div>
        ),
    }))

    return <CmsTableBasic
        className="w-full h-full"
        isServerSide={true}
        apiServerSide={params => setSearch(prev => {
            return { ...prev, ...params }
        })}
        isPagination={false}
        data={data}
        columns={columns}
        loading={loading}
        isClearHoverBg
        removeSelect
    />

}

function DetailBBBG() {
    const dispatch = useDispatch();
    const loading = useSelector(store => store[keyStore].order.loading);
    const entities = useSelector(store => store[keyStore].order.detailDelivery);
    const [search, setSearch] = useState(initialValues);
    const params = useParams(), id = params.id, type = params.type;
    const [openDialog, setOpenDialog] = useState('');

    const getListTable = useCallback((search) => {
        dispatch(order.other.getDetailDelivery({ ...search, id }));
    }, [dispatch, id])

    useEffect(() => {
        getListTable(search);
    }, [search, getListTable, dispatch])

    if (loading) {
        return <FuseLoading />
    }

    return (
        <LayoutCustom>
            {
                openDialog === 'media'
                &&
                <MediaDialog open entities={entities} />
            }
            <div className='w-full  h-full' style={{ padding: '0 3.2rem' }}>
                <div className="w-full flex justify-between items-start py-8">
                    <div className='flex'>
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="text-32">whatshot</Icon>
                        </FuseAnimate>
                        <div className="flex flex-col w-full">
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <React.Fragment>
                                    <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
                                        Chi tiết biên bản bàn giao
                                    </Typography>
                                </React.Fragment>
                            </FuseAnimate>
                        </div>
                    </div>
                    <CmsButton label={`Trở về`}
                        variant="text"
                        color="default"
                        component={Link}
                        to={'/order/delivery'}
                        className="mx-2"
                        startIcon="arrow_back" />
                </div>
                <div className='p-8 '>
                    <div className='p-8 rounded-4 shadow-4 flex bg-white'>
                        <div className='w-1/2'>
                            <div>
                                <b className='mr-4'>
                                    Mã biên bản:
                                </b>
                                {id}
                            </div>
                            <div>
                                <b className='mr-4'>
                                    Tên người vận chuyển:
                                </b>
                                {entities?.data?.length && entities.data[0]?.shipping?.shipname}
                            </div>

                        </div>
                        <div className='w-1/2'>
                            <div>
                                <b className='mr-4'>
                                    Số đơn:
                                </b>
                                {entities?.data?.length}
                            </div>
                            <div>
                                <b className='mr-4'>
                                    Ghi chú:
                                </b>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='p-8 '>
                    <div className='py-8 rounded-4 shadow-4 bg-white'>
                        <CmsTab data={deliveryLink(id)} value={0} isLink={true} onChange={(e, value) => {
                            History.push(deliveryLink(id).find(e => e.id === value)?.link)
                        }} />
                        <div className='w-3/6 py-8'>
                            <Filter
                                onSearch={setSearch}
                                search={search}
                            />
                        </div>
                        {
                            type === '1'
                                ? <ProductTable entities={entities} loading={loading} setSearch={setSearch} />
                                : type === '2'
                                    ? <OrderTable entities={entities} loading={loading} setSearch={setSearch} />
                                    : type === '3'
                                        ? <DistrictTable entities={entities} loading={loading} setSearch={setSearch} />
                                        : <MapLocation open={type === '4'} entities={entities} loading={loading} setSearch={setSearch} />
                            // ? <DistrictTable entities={entities} loading={loading} setSearch={setSearch} handleRefresh={handleRefresh} />
                            // : <MapLocation open={type === '4'} entities={entities} loading={loading} setSearch={setSearch} handleRefresh={handleRefresh} />
                        }

                    </div>
                </div>
            </div>
            {/* <CmsCardedPage
                classNameHeader="min-h-72 h-72 sm:h-128 sm:min-h-128"
                icon="whatshot"
                title={"Quản lý hợp đồng"}
                toolbar={

                }
                content={
                    <>
                      
                    </>
                }
            /> */}
        </LayoutCustom>
    );
}

export default withReducer(keyStore, reducer)(DetailBBBG);
