import React, { useState, useEffect, useCallback } from 'react';
import {
    CmsCardedPage,
    CmsTableBasic,
    CmsLabel,
    CmsFormikTextField,
    CmsFormikDateTimePicker,
    CmsCheckbox,
} from '@widgets/components';
import { Box, Button, Chip, Icon, styled } from '@material-ui/core';
import { alertInformation, initColumn } from '@widgets/functions';
import withReducer from 'app/store/withReducer';
import reducer, { accounting } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import { keyStore } from '../common';
import { useFormik } from 'formik';
import { format } from 'date-fns';
import { DropMenu } from 'app/main/order/components/index';
import AddUserDialog from '../components/AddUserDialog';
import { unwrapResult } from '@reduxjs/toolkit';

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
    name: '',
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
                    if (key === 'status') {
                        value = JSON.stringify(search[key])
                    }
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

    return <form onSubmit={formik.handleSubmit} className="flex items-center justify-items-start  w-full space-x-8 px-8" >
        <CmsFormikTextField
            label={`Khách hàng`}
            name="name"
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

const TableDebt = ({ entities, setSearch, loading, setDetail, setOpenDialog, selects, setSelects }) => {
    const columns = [
        new initColumn({
            field: 'select',
            label: '',
            onSelectAllClick: () => {
                if (selects?.length) {
                    setSelects([]);
                    return;
                }

                let values = entities?.data.filter(val => val?.incomed !== val?.ordcount).map(value => value.id);
                setSelects(values);
            },
            classCheckAll: 'w-full',
            classHeader: 'w-5',
            sortable: false,
            isSelectAllDisabled: false
        }),
        new initColumn({ field: "STT", label: "STT", style: { width: 50 }, sortable: false }),
        new initColumn({ field: "id", label: `ID`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "customer", label: `Khách hàng`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "datecreate", label: `Ngày tạo`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "moneytotal1", label: `Tổng đơn`, alignHeader: "right", alignValue: "right", visible: true, sortable: false }),
        new initColumn({ field: "moneytotal", label: `Tổng tiền`, alignHeader: "right", alignValue: "right", visible: true, sortable: false }),
        new initColumn({ field: "moneycollected", label: `Đã trả`, alignHeader: "right", alignValue: "right", visible: true, sortable: false }),
        new initColumn({ field: "type", label: `Loại chuyển khoản`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "link", label: `Chi tiết phiếu thu`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
        new initColumn({ field: "status", label: `Tình trạng`, alignHeader: "center", alignValue: "center", visible: true, sortable: false }),
    ]

    const data = entities && entities.data && entities.data.map((item, index) => ({
        ...item,
        original: item,
        status: (
            item?.moneycollected === item?.moneytotal
                ? <Chip label="Đã thanh toán" className="bg-green-500 text-white" />
                : <Chip label="Chưa thanh toán" className="bg-red-500 text-white" />
        ),
        link: (
            <a href={`/collection/1/${item.collectid}`} target='_blank' rel="noopener noreferrer">
                Tới trang
            </a>
        ),
        select: (
            <CmsCheckbox
                key={`${index}_select`}
                checked={selects?.length ? selects.includes(item.id) : false}
                value={item.id}
                onChange={e => {
                    let check = selects.includes(item.id);
                    check
                        ? setSelects(value => value.filter(e => e !== item.id))
                        : setSelects(value => [...value, item.id])
                }}
                disabled={Boolean(item?.incomed === item?.ordcount)}
                name="select"
            />
        ),
        customer: (item?.cusname),
        moneytotal1: (
            item?.moneytotal1 || '0'
        ),
        type: (
            item?.type === 1 ? 'Tiền mặt' : 'Chuyển khoản'
        ),
        datecreate: (
            item?.datecreate ? format(new Date(item.datecreate), 'dd-MM-yyyy HH:MM') : ''
        ),
        moneytotal: (
            item?.moneytotal ? item.moneytotal.toLocaleString('en-US') : '0'
        ),
        moneycollected: (
            item?.moneycollected ? item.moneycollected.toLocaleString('en-US') : '0'
        ),
        STT: (
            <React.Fragment>
                <CmsLabel content={`${(index + 1)}`} />
            </React.Fragment>
        ),
        action: (
            <>

            </>
        )
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
            isPagination={false}
            data={data}
            // selected={selected}
            // setSelected={entity => dispatch(setSelected(entity))}
            columns={columns}
            loading={loading}
            selectedList={selects}
        />
    </>
}

function Meta() {
    const dispatch = useDispatch();
    const loading = useSelector(store => store[keyStore].loading);
    const entities = useSelector(store => store[keyStore].entities);
    const searchDefault = useSelector(store => store[keyStore].search);
    const [search, setSearch] = useState(searchDefault);
    const [openDialog, setOpenDialog] = useState('');
    const [detail, setDetail] = useState(null);
    const [selects, setSelects] = useState([]);
    console.log(detail);
    const getListTable = useCallback((search) => {
        dispatch(accounting.bill.getList({ ...search }));
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


    const handleCloseDialog = () => {
        setOpenDialog('');
    }

    const handleSubmit = async (values, form) => {
        alertInformation({
            text: `Xác nhận thao tác`,
            data: { values, form },
            confirm: async () => {
                try {
                    const resultAction = await dispatch(accounting.bill.createCollect(selects.map(val => {
                        return { ...values, orderid: 0, billingid: val }
                    })));
                    unwrapResult(resultAction);
                    setOpenDialog('');
                    getListTable(search);
                    setSelects([]);
                } catch (error) {
                } finally {
                    form.setSubmitting(false)
                }
            },
            close: () => form.setSubmitting(false)
        });
    }


    return (
        <LayoutCustom>
            {
                openDialog === 'addUser'
                &&
                <AddUserDialog
                    title='Chọn nhân viên thu tiền'
                    detail={{ orders: selects }}
                    open={openDialog === 'addUser'}
                    onSave={handleSubmit}
                    handleClose={handleCloseDialog} />
            }
            <CmsCardedPage
                classNameHeader="min-h-72 h-72 sm:h-128 sm:min-h-128"
                icon="whatshot"
                title={'Quản lý Billing'}
                toolbar={
                    <div className='flex items-center w-full'>
                        <div className='w-1/2'>
                            <Filter />
                        </div>
                        <div className='w-1/2 text-right pr-8'>
                            {
                                Boolean(selects?.length)
                                &&
                                <DropMenu
                                    crName={`Lựa chọn`}
                                    handleClose={(value, setAnchorEl) => {
                                        if (value?.id === 1)
                                            setOpenDialog('addUser')
                                        setAnchorEl(null)
                                    }}
                                    className={`min-w-128`}
                                    data={
                                        [
                                            { id: 1, name: 'Chọn nhân viên thu tiền' }
                                        ]
                                    } />
                            }
                        </div>
                    </div>
                }
                content={
                    <TableDebt entities={entities} setSearch={setSearch} loading={loading} setDetail={setDetail} setOpenDialog={setOpenDialog} selects={selects} setSelects={setSelects} />
                }
            />
        </LayoutCustom>
    );
}

export default withReducer(keyStore, reducer)(Meta);
