import React, { useState, useEffect, useCallback } from 'react';
import { CmsCardedPage, CmsTableBasic, CmsLabel, CmsIconButton, CmsTab, CmsFormikTextField, CmsFormikDateTimePicker } from '@widgets/components';
import { Box, Button, Chip, Icon, TableCell, TableRow, styled } from '@material-ui/core';
import { alertInformation, initColumn } from '@widgets/functions';
import withReducer from 'app/store/withReducer';
import reducer, { accounting, setReduxState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { keyStore, links } from '../common';
import AddMetaDialog from '../components/AddMetaDialog';
import { unwrapResult } from '@reduxjs/toolkit';
import History from '@history';
import { useParams } from 'react-router';
import { useFormik } from 'formik';
import { format } from 'date-fns';
import ViewModelsDialog from '../components/ViewModelsDialog';

const LayoutCustom = styled(Box)({
    height: "100%",
    "& .inner-scroll>div:first-child": {
        minHeight: '70px'
    },
    "& .inner-scroll": {
        position: 'relative',
        top: -58
    },
});

const initialValues = {
    phone: '',
    fromDate: null,
    toDate: null,
};

const Filter = ({ onSearch, search, namePage }) => {

    const formik = useFormik({
        initialValues: search,
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
        onSearch(values);
    }

    return <form onSubmit={formik.handleSubmit} className="flex items-center justify-items-start lg:w-3/4 xl:w-2/4 w-full space-x-8 px-8" >
        <CmsFormikTextField
            label={`Số điện thoại`}
            name="Phone"
            className="my-8"
            size="small"
            clearBlur
            formik={formik} />
        <CmsFormikDateTimePicker
            allDateTime={false}
            label="Từ ngày"
            format="yyyy-MM-dd"
            className="my-8"
            name="fromDate"
            formik={formik}
            size="small"
            isOpenKeyBoard={false} />
        <CmsFormikDateTimePicker
            allDateTime={false}
            label="Đến ngày"
            format="yyyy-MM-dd"
            className="my-8"
            name="toDate"
            formik={formik}
            size="small"
            isOpenKeyBoard={false} />
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

const TableDebt = ({ entities, setSearch, loading, setDetail, setOpenDialog }) => {

    const columns = [
        new initColumn({ field: "STT", label: "STT [1]", style: { width: 75, top: 28 }, sortable: false }),
        new initColumn({ field: "name", label: `Khách hàng [2]`, style: { top: 28 }, alignHeader: "center", alignValue: "left", visible: true, sortable: false }),
        new initColumn({ field: "phone", label: `Số điện thoại [3]`, style: { top: 28 }, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "totaldebt_before", label: `Nợ phải thu [4]`, style: { top: 28 }, alignHeader: "right", alignValue: "right", visible: true, sortable: false }),
        new initColumn({ field: "totalpay_before", label: `Có phải trả [5]`, style: { top: 28 }, alignHeader: "right", alignValue: "right", visible: true, sortable: false }),
        new initColumn({ field: "totaldebt", label: `Nợ [6]`, style: { top: 28 }, alignHeader: "right", alignValue: "right", visible: true, sortable: false }),
        new initColumn({ field: "totalpay", label: `Có [7]`, style: { top: 28 }, alignHeader: "right", alignValue: "right", visible: true, sortable: false }),
        new initColumn({ field: "remain", label: `Nợ còn lại`, style: { top: 28 }, alignHeader: "right", alignValue: "right", visible: true, sortable: false }),
    ]

    const data = entities && entities.data && entities.data.map((item, index) => ({
        ...item,
        original: item,
        STT: (
            <React.Fragment>
                <CmsLabel content={`${(index + 1)}`} />
            </React.Fragment>
        ),
        totaldebt: item?.totaldebt ? item.totaldebt.toLocaleString('en-US') : '0',
        totalpay: item?.totalpay ? item.totalpay.toLocaleString('en-US') : '0',
        totaldebt_before: item?.totaldebt_before ? item.totaldebt_before.toLocaleString('en-US') : '0',
        totalpay_before: item?.totalpay_before ? item.totalpay_before.toLocaleString('en-US') : '0',
        remain: item?.remain ? item.remain.toLocaleString('en-US') : '0',
        name: (
            <div>
                <div>
                    {item?.cusname}
                </div>
                <div>
                    {item?.email}
                </div>
            </div>
        ),
        status: (
            <React.Fragment>
                {
                    item.status === 0
                    &&
                    <Chip label="Tắt" color='secondary' />
                }

                {
                    item.status === 1
                    &&
                    <Chip label="Hoạt động" color='primary' />
                }
            </React.Fragment>
        ),
        // action: (
        //     <CmsIconButton
        //         tooltip="Cập nhật tiền"
        //         delay={50}
        //         icon="attach_money"
        //         className="bg-blue-500 text-white shadow-3  hover:bg-blue-900"
        //         onClick={() => {
        //             setDetail(item);
        //             setOpenDialog('money');
        //         }}
        //     />
        // )
    }))

    if (!data) {
        return <FuseLoading />
    }

    return <>
        <CmsTableBasic
            className="w-full h-full"
            isServerSide={true}
            apiServerSide={params => setSearch(prev => {
                return { ...prev, ...params }
            })}
            pagination={entities?.pagination}
            data={data}
            // selected={selected}
            // setSelected={entity => dispatch(setSelected(entity))}
            columns={columns}
            loading={loading}
            upperHead={
                <TableRow>
                    <TableCell
                        style={{ borderRight: '1px solid #ddd' }}
                        className="text-center px-8 py-0"
                    >
                    </TableCell>
                    <TableCell
                        colSpan={2}
                        style={{ borderRight: '1px solid #ddd' }}
                        className="text-center px-8 py-0"
                    >
                        Đối tượng
                    </TableCell>
                    <TableCell
                        colSpan={2}
                        style={{ borderRight: '1px solid #ddd' }}
                        className="text-center px-8 py-0"
                    >
                        Số dư đầu kỳ
                    </TableCell>
                    <TableCell
                        colSpan={2}
                        style={{ borderRight: '1px solid #ddd' }}
                        className="text-center px-8 py-0"
                    >
                        Phát sinh trong kỳ
                    </TableCell>
                    <TableCell
                        colSpan={2}
                        style={{ borderRight: '1px solid #ddd' }}
                        className="text-center px-8 py-0"
                    >
                    </TableCell>
                </TableRow>
            }
        />
    </>
}

const TableDebtOther = ({ entities, setSearch, loading, setDetail, setOpenDialog, handleDrop }) => {

    const columns = [
        new initColumn({ field: "STT", label: "STT", style: { width: 50 }, sortable: false }),
        new initColumn({ field: "billingid", label: `Hóa đơn`, alignHeader: "center", alignValue: "left", visible: true, sortable: false }),
        new initColumn({ field: "createdate", style: { width: 100 }, label: `Ngày tạo`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "usercreate", label: `Người lập phiếu`, alignHeader: "center", alignValue: "left", visible: true, sortable: false }),
        new initColumn({ field: "customer", label: `Khách hàng`, alignHeader: "center", alignValue: "left", visible: true, sortable: false }),
        new initColumn({ field: "incomevalue2", style: { width: 150 }, label: `Tổng thanh toán`, alignHeader: "center", alignValue: "right", visible: true, sortable: false }),
        new initColumn({ field: "diff", style: { width: 150 }, label: `Số ngày quá nợ`, alignHeader: "center", alignValue: "right", visible: true, sortable: false }),
        new initColumn({ field: "type", style: { width: 150 }, label: `Loại thanh toán`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "status", label: `Trạng thái`, alignHeader: "center", alignValue: "right", visible: true, sortable: false }),
    ]

    const data = entities && entities.data && entities.data.map((item, index) => {
        const value = JSON.parse(item.incomes);
        console.log(value);
        return ({
            ...item,
            diff: -item.diff,
            original: item,
            type: (item.type === 1 ? 'Tiền mặt' : 'Chuyển khoản'),
            customer: (
                <div>
                    <div>
                        {item?.cusname}
                    </div>
                    <div>
                        {item?.email}
                    </div>
                    <div>
                        {item?.address ? item?.address + ', ' : ''} {item?.ward ? item?.ward + ', ' : ''}  {item?.district ? item?.district + ', ' : ''} {item?.city || ''}
                    </div>
                </div>
            ),
            incomevalue: (
                item?.incomevalue ? item.incomevalue.toLocaleString('en-US') : '0'
            ),
            incomevalue1: (
                '0'
            ),
            incomevalue2: (
                <b className='text-green'>
                    {
                        item?.incomevalue ? item.incomevalue.toLocaleString('en-US') : '0'
                    }
                </b>
            ),
            STT: (
                <React.Fragment>
                    <CmsLabel content={`${(index + 1)}`} />
                </React.Fragment>
            ),
            createdate: (
                item?.createdate ? format(new Date(item.createdate), 'dd-MM-yyyy') : null
            ),
            status: (
                <React.Fragment>
                    {
                        item.status === 1
                        &&
                        <Chip label="Chưa thanh toán" className='bg-red-500 text-white' />
                    }

                    {
                        item.status === 2
                        &&
                        <Chip label="Đã thanh toán" className='bg-green-500 text-white' />
                    }
                </React.Fragment>
            ),
            action: (
                <div className='flex space-x-8'>
                    <CmsIconButton
                        tooltip="Chi tiết"
                        delay={50}
                        icon="visibility"
                        className="bg-green-500 text-white shadow-3  hover:bg-green-900"
                        onClick={() => {
                            setDetail(item);
                            setOpenDialog('detail');
                        }}
                    />

                    <CmsIconButton
                        tooltip="Xác nhận tiền"
                        delay={50}
                        icon="check"
                        className="bg-blue-500 text-white shadow-3  hover:bg-blue-900"
                        onClick={() => {
                            setDetail(item);
                            setOpenDialog('money');
                        }}
                    />

                    {
                        item?.type === 2
                        &&
                        <CmsIconButton
                            tooltip="Hủy"
                            delay={50}
                            icon="delete"
                            className="bg-red-500 text-white shadow-3  hover:bg-red-900"
                            onClick={() => {
                                handleDrop(item);
                            }}
                        />
                    }
                </div>
            )
        })
    })

    if (!data) {
        return <FuseLoading />
    }

    return <>
        <CmsTableBasic
            className="w-full h-full"
            isServerSide={true}
            apiServerSide={params => setSearch(prev => {
                return { ...prev, ...params }
            })}
            pagination={entities?.pagination}
            data={data}
            // selected={selected}
            // setSelected={entity => dispatch(setSelected(entity))}
            columns={columns}
            loading={loading}
        />
    </>
}

// const addDays = (date, numberDate) => {
//     const newDate = new Date(date);
//     newDate.setDate(newDate.getDate() + numberDate);
//     return newDate
// };

const minusDays = (date, numberDate) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - numberDate);
    return newDate
};

const returnSearch = (type) => {

}

function Meta({ type }) {
    const dispatch = useDispatch();
    const loading = useSelector(store => store[keyStore].loading);
    const entities = useSelector(store => store[keyStore].incomes);
    const customerDebt = useSelector(store => store[keyStore].customerDebt);
    const summary = useSelector(store => store[keyStore].summary);
    const searchDefault = useSelector(store => store[keyStore].search);
    const [search, setSearch] = useState({ ...searchDefault, ...returnSearch(type) });
    const [openDialog, setOpenDialog] = useState('');
    const [detail, setDetail] = useState(null);
    const [pass, setPass] = useState(false);


    const getListTable = useCallback((search) => {
        if (summary && pass) {
            let filter = { ...search };

            filter.type === '1'
                ? dispatch(accounting.income.getListCustomerDebt({ ...filter, status: 1 }))
                : dispatch(accounting.income.getList({ ...filter, status: 1 }));
        }
    }, [dispatch, summary, pass])

    useEffect(() => {
        if (summary && type) {
            setSearch(prev => {
                let filter = { ...prev };
                if (type === '1') {
                    filter.fromDate = format(minusDays(new Date(), 30), 'yyyy-MM-dd 00:00');
                    filter.toDate = format(new Date(), 'yyyy-MM-dd HH:mm');
                }

                if (type === '2') {
                    filter.fromDate = format(minusDays(new Date(), -summary?.diff), 'yyyy-MM-dd 00:00');
                    filter.toDate = format(new Date(), 'yyyy-MM-dd HH:mm');
                }

                if (type === '3') {
                    filter.fromDate = format(minusDays(new Date(), -summary?.diff), 'yyyy-MM-dd 00:00');
                    filter.toDate = format(minusDays(new Date(), 1), 'yyyy-MM-dd HH:mm');
                }

                if (type === '4') {
                    filter.fromDate = format(new Date(), 'yyyy-MM-dd 00:00');
                    filter.toDate = format(new Date(), 'yyyy-MM-dd HH:mm');
                }
                setPass(true)
                console.log(filter);

                return { ...filter, type }
            })
        }

    }, [type, summary])

    useEffect(() => {
        dispatch(accounting.income.getSummary());
    }, [dispatch])

    const searchString = JSON.stringify(search);
    useEffect(() => {
        let search = JSON.parse(searchString);
        getListTable(search);
    }, [searchString, getListTable, dispatch])

    useEffect(() => {
        if (openDialog === '')
            setDetail(null);
    }, [openDialog])

    useEffect(() => {
        return () => {
            dispatch(setReduxState({
                summary: null,
                incomes: null
            }))
        }
    }, [dispatch])

    const handleCloseDialog = () => {
        setOpenDialog('');
    }

    const handleSubmit = async (values, form) => {
        const value = JSON.parse(detail.incomes),
            data = value.map(val => ({
                "id": val.id,
                "orderid": val.orderid,
                "billingid": val.billingid,
                "status": 2,
                "note": values.note,
            }))

        alertInformation({
            text: `Xác nhận thao tác`,
            data: { values, form },
            confirm: async () => {
                try {
                    const resultAction = await dispatch(accounting.income.confirm(data));
                    unwrapResult(resultAction);
                    setOpenDialog('');
                    getListTable(search);
                } catch (error) {
                } finally {
                    form.setSubmitting(false)
                }
            },
            close: () => form.setSubmitting(false)
        });
    }
    // const clearSearchValue = (value) => setSearch(prev => {
    //     const values = { ...value };
    //     const search = { ...prev };
    //     for (const key in values) {
    //         if (!values[key] && typeof values[key] !== 'number') {
    //             delete search[key];
    //             delete values[key];
    //         }
    //     }
    //     return { ...search, ...values, page: 1 };
    // })

    return (
        <LayoutCustom>
            {
                openDialog === 'money'
                &&
                <AddMetaDialog
                    open={openDialog === 'money'}
                    handleClose={handleCloseDialog}
                    handleSubmit={handleSubmit}
                    title={'Xác nhận đã nhận tiền'}
                    detail={detail}
                />
            }

            {
                openDialog === 'detail'
                &&
                <ViewModelsDialog
                    open={openDialog === 'detail'}
                    handleClose={handleCloseDialog}
                    title={'Chi tiết phiếu thu'}
                    detail={detail}
                />
            }

            <CmsCardedPage
                classNameHeader="min-h-72 h-72 sm:h-128 sm:min-h-128"
                icon="whatshot"
                title={'Quản lý thanh toán'}
                toolbar={
                    <>
                        <CmsTab data={links(summary)} value={0} isLink={true} onChange={(e, value) => {
                            History.push(links(summary).find(e => e.id === value)?.link)
                        }} />
                    </>
                }
                moreToolbar={
                    <>
                        <Filter search={search} />
                    </>
                }
                content={
                    <>
                        {
                            type === '1'
                                ? <TableDebt entities={customerDebt} setSearch={setSearch} loading={loading} setDetail={setDetail} setOpenDialog={setOpenDialog} />
                                : <TableDebtOther entities={entities} setSearch={setSearch} loading={loading} setDetail={setDetail} setOpenDialog={setOpenDialog} handleDrop={(item) => {
                                    const value = JSON.parse(item.incomes),
                                        data = value.map(val => ({
                                            "id": val.id,
                                            "orderid": val.orderid,
                                            "billingid": val.billingid,
                                            "status": 0,
                                        }))

                                    alertInformation({
                                        text: `Xác nhận thao tác`,
                                        data: {},
                                        confirm: async () => {
                                            try {
                                                const resultAction = await dispatch(accounting.income.drop(data));
                                                unwrapResult(resultAction);
                                                getListTable(search);
                                            } catch (error) {
                                            } finally {
                                            }
                                        },
                                    });
                                }} />
                        }
                    </>
                }
            // rightHeaderButton={
            //     <div>
            //         <CmsButton
            //             label={t("ADD_NEW")}
            //             onClick={() => setOpenDialog('meta')}
            //             className="mx-2"
            //             startIcon="add" />
            //     </div>
            // }
            />
        </LayoutCustom>
    );
}

const CheckTab = () => {
    const params = useParams(), type = (params.type);

    if (!type) {
        History.push('/accounting/debts/2')
        return null
    } else {
        return <Meta type={type} />
    }
}

export default withReducer(keyStore, reducer)(CheckTab);
