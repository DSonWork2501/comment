import { CmsButton, CmsCardedPage, CmsFormikDateTimePicker, CmsFormikTextField, CmsTab, CmsTableBasic } from "@widgets/components";
import { initColumn } from "@widgets/functions";
import withReducer from "app/store/withReducer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keyStore } from "../../common";
import reducer from "../../store";
import { getList as getCustomer } from "../../store/customerSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faCircleUser, faComment, faDiagramProject, faDice, faEnvelope, faFileInvoice, faLocationDot, faPhone, faTag, faTicket } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router";
import History from "@history";
import { useFormik } from "formik";
import { Button, Icon } from "@material-ui/core";
import { format } from "date-fns";
import { Link } from "react-router-dom/cjs/react-router-dom";

const links = (id) => [
    { id: 1, name: "Tổng quan", link: "/customer-manage/1/overview/1" },
    { id: 2, name: "Lịch sử tích điểm", link: "/customer-manage/1/overview/2" },
    { id: 3, name: "Lịch sử giao dịch", link: "/customer-manage/1/overview/3" },
    { id: 4, name: "Chi tiết công nợ", link: "/customer-manage/1/overview/4" },
    { id: 5, name: "Lịch CSKH", link: "/customer-manage/1/overview/5" },
    { id: 6, name: "Hành hóa đã mua", link: "/customer-manage/1/overview/6" },
    { id: 7, name: "Người liên hệ", link: "/customer-manage/1/overview/7" },
    { id: 8, name: "Tài liệu đính kèm", link: "/customer-manage/1/overview/8" },
]

const Tab1 = () => {
    return <>
        <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 text-16 text-green-400 pb-16">
                <b>
                    Thông tin khách hàng
                </b>
            </div>
            <div className="w-1/5 px-4">
                <img className="rounded-full" alt="img user" src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80' />
            </div>
            <div className="w-2/5 px-4">
                <div className="flex flex-wrap border-b py-8">
                    <div className="w-128">
                        Mã khách hàng:
                    </div>
                    <div>
                        632104
                    </div>
                </div>
                <div className="flex flex-wrap border-b py-8">
                    <div className="w-128">
                        Tên khách hàng:
                    </div>
                    <div>
                        Trương Công Mạnh
                    </div>
                </div>
                <div className="flex flex-wrap border-b py-8">
                    <div className="w-128">
                        Ngày sinh:
                    </div>
                    <div>
                        08/10/1997
                    </div>
                </div>
                <div className="flex flex-wrap border-b py-8">
                    <div className="w-128">
                        Giới tính:
                    </div>
                    <div>
                        Nam
                    </div>
                </div>
                <div className="flex flex-wrap border-b py-8">
                    <div className="w-128">
                        Điện thoại
                    </div>
                    <div>
                        0363341099
                    </div>
                </div>
                <div className="flex flex-wrap border-b py-8">
                    <div className="w-128">
                        Email:
                    </div>
                    <div>
                        t.c.manh1997@gmail.com
                    </div>
                </div>
                <div className="flex flex-wrap border-b py-8">
                    <div className="w-128">
                        Công nợ đầu kỳ:
                    </div>
                    <div>
                        0
                    </div>
                </div>
                <div className="flex flex-wrap border-b py-8">
                    <div className="w-128">
                        Giới hạn công nợ:
                    </div>
                    <div>
                        0
                    </div>
                </div>
                <div className="flex flex-wrap border-b py-8">
                    <div className="w-128">
                        Số tài khoản:
                    </div>
                    <div>

                    </div>
                </div>
                <div className="flex flex-wrap border-b py-8">
                    <div className="w-128">
                        Tên ngân hàng:
                    </div>
                    <div>

                    </div>
                </div>
            </div>
            <div className="w-2/5 px-4">
                <div className="flex flex-wrap border-b py-8">
                    <div className="w-192">
                        Khách hàng/NCC mặc định:
                    </div>
                    <div>
                    </div>
                </div>
                <div className="flex flex-wrap border-b py-8">
                    <div className="w-192">
                        Nhân viên phụ trách:
                    </div>
                    <div>
                        HAO
                    </div>
                </div>
                <div className="flex flex-wrap border-b py-8">
                    <div className="w-192">
                        Tỉnh, thành phố:
                    </div>
                    <div>
                    </div>
                </div>
                <div className="flex flex-wrap border-b py-8">
                    <div className="w-192">
                        Quận, huyện:
                    </div>
                    <div>
                    </div>
                </div>
                <div className="flex flex-wrap border-b py-8">
                    <div className="w-192">
                        Phường, xã:
                    </div>
                    <div>
                    </div>
                </div>
                <div className="flex flex-wrap border-b py-8">
                    <div className="w-192">
                        Địa chỉ:
                    </div>
                    <div>
                    </div>
                </div>
                <div className="flex flex-wrap border-b py-8">
                    <div className="w-192">
                        Ghi chú:
                    </div>
                    <div>
                    </div>
                </div>
                <div className="flex flex-wrap border-b py-8">
                    <div className="w-192">
                        Mã số thuế:
                    </div>
                    <div>
                    </div>
                </div>
                <div className="flex flex-wrap border-b py-8">
                    <div className="w-192">
                        Chi nhánh ngân hàng:
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    </>
}

const Tab2 = () => {
    const entities = useSelector(store => store[keyStore].customer.entities)
    const search = useSelector(store => store[keyStore].customer.search)
    const loading = useSelector(store => store[keyStore].customer.loading)

    const columns = [
        new initColumn({ field: "name", label: "Mã phiếu", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "phone", label: "Thời gian", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "stage", label: "Loại giao dịch", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "stage", label: "Giá trị", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "stage", label: "Ghi chú", alignHeader: "center", alignValue: "left", sortable: false }),
    ]

    const data = entities?.data?.map(item => ({
        id: item.id,
        action: (
            <div className="md:flex md:space-x-3 grid grid-rows-2 grid-flow-col gap-4">

            </div>
        ) || []
    }))

    return <>
        <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 text-16 text-green-400 pb-16">
                <b>
                    Lịch sử tích điểm
                </b>
            </div>
            <div className="w-full px-4">
                <CmsTableBasic
                    className="w-full h-full bg-white border-t border-l"
                    isServerSide={true}
                    data={data}
                    search={search}
                    columns={columns}
                    loading={loading}
                />
            </div>
        </div>
    </>
}

const Tab3 = () => {
    const entities = useSelector(store => store[keyStore].customer.entities)
    const search = useSelector(store => store[keyStore].customer.search)
    const loading = useSelector(store => store[keyStore].customer.loading)

    const columns = [
        new initColumn({ field: "name", label: "Mã phiếu", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "phone", label: "Thời gian", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "stage", label: "Loại giao dịch", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "stage", label: "Giá trị", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "stage", label: "Trạng thái", alignHeader: "center", alignValue: "left", sortable: false }),
    ]

    const data = entities?.data?.map(item => ({
        id: item.id,
        action: (
            <div className="md:flex md:space-x-3 grid grid-rows-2 grid-flow-col gap-4">

            </div>
        ) || []
    }))

    return <>
        <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 text-16 text-green-400 pb-16">
                <b>
                    Lịch sử giao dịch
                </b>
            </div>
            <div className="w-full px-4">
                <CmsTableBasic
                    className="w-full h-full bg-white border-t border-l"
                    isServerSide={true}
                    data={data}
                    search={search}
                    columns={columns}
                    loading={loading}
                />
            </div>
        </div>
    </>
}

const Tab4 = () => {
    const entities = useSelector(store => store[keyStore].customer.entities)
    const search = useSelector(store => store[keyStore].customer.search)
    const loading = useSelector(store => store[keyStore].customer.loading)

    const columns = [
        new initColumn({ field: "name", label: "Mã phiếu", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "phone", label: "Thời gian", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "stage", label: "Loại giao dịch", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "stage", label: "Giá trị", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "stage", label: "Trạng thái", alignHeader: "center", alignValue: "left", sortable: false }),
    ]

    const data = entities?.data?.map(item => ({
        id: item.id,
        action: (
            <div className="md:flex md:space-x-3 grid grid-rows-2 grid-flow-col gap-4">

            </div>
        ) || []
    }))

    return <>
        <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 text-16 text-green-400 pb-16">
                <b>
                    Lịch sử giao dịch
                </b>
            </div>
            <div className="w-full px-4">
                <CmsTableBasic
                    className="w-full h-full bg-white border-t border-l"
                    isServerSide={true}
                    data={data}
                    search={search}
                    columns={columns}
                    loading={loading}
                />
            </div>
        </div>
    </>
}

const Filter = ({ onSearch, search, namePage }) => {

    const initialValues = {
        page: 1,
        limit: 10,
        phone: '',
        fromDate: null,
        toDate: null
    };

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
    }, [search, setFieldValue, initialValues])

    function handleSubmit(value) {
        let values = { ...value };
        if (values?.fromDate)
            values.fromDate = format(new Date(values.fromDate), 'yyyy-MM-dd')
        if (values?.toDate)
            values.toDate = format(new Date(values.toDate), 'yyyy-MM-dd')
        onSearch(values);
    }

    return <div className="bg-white">
        <form onSubmit={formik.handleSubmit} className="flex items-center justify-items-start space-x-8 px-8 w-1/2" >
            <CmsFormikTextField
                label={`Số điện thoại`}
                name="phone"
                className="my-8"
                size="small"
                clearBlur
                formik={formik} />
            <CmsFormikDateTimePicker
                format="dd/MM/yyyy"
                className="my-8"
                name="fromDate"
                formik={formik}
                size="small"
                isOpenKeyBoard={false}
                label="Từ ngày" />
            <CmsFormikDateTimePicker
                format="dd/MM/yyyy"
                className="my-8"
                name="toDate"
                formik={formik}
                size="small"
                isOpenKeyBoard={false}
                label="Đến ngày" />
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
    </div>
}

const Tab5 = () => {
    const entities = useSelector(store => store[keyStore].customer.entities)
    const search = useSelector(store => store[keyStore].customer.search)
    const loading = useSelector(store => store[keyStore].customer.loading)

    const columns = [
        new initColumn({ field: "name", label: "Mã phiếu", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "phone", label: "Thời gian", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "stage", label: "Loại giao dịch", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "stage", label: "Giá trị", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "stage", label: "Trạng thái", alignHeader: "center", alignValue: "left", sortable: false }),
    ]

    const data = entities?.data?.map(item => ({
        id: item.id,
        action: (
            <div className="md:flex md:space-x-3 grid grid-rows-2 grid-flow-col gap-4">

            </div>
        ) || []
    }))

    return <>
        <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 text-16 text-green-400 pb-16">
                <b>
                    Lịch sử giao dịch
                </b>
            </div>
            <div className="w-full px-4">
                <Filter search={search} onSearch={() => { }} />
                <CmsTableBasic
                    className="w-full h-full bg-white border-t border-l"
                    isServerSide={true}
                    data={data}
                    search={search}
                    columns={columns}
                    loading={loading}
                />
            </div>
        </div>
    </>
}

const Tab6 = () => {
    const entities = useSelector(store => store[keyStore].customer.entities)
    const search = useSelector(store => store[keyStore].customer.search)
    const loading = useSelector(store => store[keyStore].customer.loading)

    const columns = [
        new initColumn({ field: "name", label: "Mã phiếu", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "phone", label: "Thời gian", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "stage", label: "Loại giao dịch", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "stage", label: "Giá trị", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "stage", label: "Trạng thái", alignHeader: "center", alignValue: "left", sortable: false }),
    ]

    const data = entities?.data?.map(item => ({
        id: item.id,
        action: (
            <div className="md:flex md:space-x-3 grid grid-rows-2 grid-flow-col gap-4">

            </div>
        ) || []
    }))

    return <>
        <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 text-16 text-green-400 pb-16">
                <b>
                    Lịch sử giao dịch
                </b>
            </div>
            <div className="w-full px-4">
                <CmsTableBasic
                    className="w-full h-full bg-white border-t border-l"
                    isServerSide={true}
                    data={data}
                    search={search}
                    columns={columns}
                    loading={loading}
                />
            </div>
        </div>
    </>
}

const Tab7 = () => {
    const entities = useSelector(store => store[keyStore].customer.entities)
    const search = useSelector(store => store[keyStore].customer.search)
    const loading = useSelector(store => store[keyStore].customer.loading)

    const columns = [
        new initColumn({ field: "name", label: "Mã phiếu", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "phone", label: "Thời gian", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "stage", label: "Loại giao dịch", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "stage", label: "Giá trị", alignHeader: "center", alignValue: "left", sortable: false }),
        new initColumn({ field: "stage", label: "Trạng thái", alignHeader: "center", alignValue: "left", sortable: false }),
    ]

    const data = entities?.data?.map(item => ({
        id: item.id,
        action: (
            <div className="md:flex md:space-x-3 grid grid-rows-2 grid-flow-col gap-4">

            </div>
        ) || []
    }))

    return <>
        <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 text-16 text-green-400 pb-16">
                <b>
                    Lịch sử giao dịch
                </b>
            </div>
            <div className="w-full px-4">
                <CmsTableBasic
                    className="w-full h-full bg-white border-t border-l"
                    isServerSide={true}
                    data={data}
                    search={search}
                    columns={columns}
                    loading={loading}
                />
            </div>
        </div>
    </>
}

function CategoryView() {
    const dispatch = useDispatch()
    const search = useSelector(store => store[keyStore].customer.search)
    const params = useParams(), type = params.type;

    useEffect(() => {
        dispatch(getCustomer(search))
    }, [dispatch, search])

    return (
        <>
            <CmsCardedPage
                title={'Thông tin khách hàng'}
                icon="whatshot"
                style={{}}
                rightHeaderButton={
                    <div className="flex items-center space-x-4">
                        <CmsButton
                            label={"Trở về"}
                            variant="text"
                            color="default"
                            component={Link}
                            to={'/customer-manage'}
                            className="mx-2 flex-none"
                            startIcon="arrow_back" />
                    </div>
                }
                content={
                    <div style={{ background: 'rgba(243,244,246)' }} className="p-8 text-13 h-full overflow-auto">
                        <div className="flex flex-wrap -mx-4">
                            <div className="w-1/5 px-4 mb-8">
                                <div className="rounded-8 text-center bg-white p-8 leading-5">
                                    <div>
                                        <FontAwesomeIcon icon={faCircleUser} className="text-gray-500 text-40" />
                                    </div>
                                    <div className="mt-20 font-600 text-green-400">
                                        Trương Công Mạnh
                                    </div>
                                    <div className="mt-8">
                                        <FontAwesomeIcon icon={faPhone} className="text-13" /> 0363341098
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faEnvelope} className="text-13" /> t.c.manh1997@gmail.com
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faLocationDot} className="text-13" /> 710000
                                    </div>
                                </div>
                            </div>
                            <div className="w-4/5 px-4">
                                <div className="flex flex-wrap -mx-4">
                                    <div className="w-1/6 px-4 mb-8">
                                        <div className="rounded-8 text-center bg-white p-8 leading-5">
                                            <div>
                                                <FontAwesomeIcon icon={faPhone} className="text-gray-500 text-20" />
                                            </div>
                                            <div >
                                                Cuộc gọi
                                            </div>
                                            <div className="font-600 text-green-400">
                                                0
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/6 px-4 mb-8">
                                        <div className="rounded-8 text-center bg-white p-8 leading-5">
                                            <div>
                                                <FontAwesomeIcon icon={faBullhorn} className="text-gray-500 text-20" />
                                            </div>
                                            <div >
                                                Chiến dịch
                                            </div>
                                            <div className="font-600 text-green-400">
                                                0
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/6 px-4 mb-8">
                                        <div className="rounded-8 text-center bg-white p-8 leading-5">
                                            <div>
                                                <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 text-20" />
                                            </div>
                                            <div >
                                                Email
                                            </div>
                                            <div className="font-600 text-green-400">
                                                0
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/6 px-4 mb-8">
                                        <div className="rounded-8 text-center bg-white p-8 leading-5">
                                            <div>
                                                <FontAwesomeIcon icon={faFileInvoice} className="text-gray-500 text-20" />
                                            </div>
                                            <div >
                                                Hóa đơn
                                            </div>
                                            <div className="font-600 text-green-400">
                                                0
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/6 px-4 mb-8">
                                        <div className="rounded-8 text-center bg-white p-8 leading-5">
                                            <div>
                                                <FontAwesomeIcon icon={faDice} className="text-gray-500 text-20" />
                                            </div>
                                            <div >
                                                Cơ hội
                                            </div>
                                            <div className="font-600 text-green-400">
                                                0
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/6 px-4 mb-8">
                                        <div className="rounded-8 text-center bg-white p-8 leading-5">
                                            <div>
                                                <FontAwesomeIcon icon={faDiagramProject} className="text-gray-500 text-20" />
                                            </div>
                                            <div >
                                                Dự án
                                            </div>
                                            <div className="font-600 text-green-400">
                                                0
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/6 px-4 mb-8">
                                        <div className="rounded-8 text-center bg-white p-8 leading-5">
                                            <div>
                                                <FontAwesomeIcon icon={faTag} className="text-gray-500 text-20" />
                                            </div>
                                            <div >
                                                Báo giá
                                            </div>
                                            <div className="font-600 text-green-400">
                                                0
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/6 px-4 mb-8">
                                        <div className="rounded-8 text-center bg-white p-8 leading-5">
                                            <div>
                                                <FontAwesomeIcon icon={faComment} className="text-gray-500 text-20" />
                                            </div>
                                            <div >
                                                Tin nhắn
                                            </div>
                                            <div className="font-600 text-green-400">
                                                0
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/6 px-4 mb-8">
                                        <div className="rounded-8 text-center bg-white p-8 leading-5">
                                            <div>
                                                <FontAwesomeIcon icon={faTicket} className="text-gray-500 text-20" />
                                            </div>
                                            <div >
                                                Ticket
                                            </div>
                                            <div className="font-600 text-green-400">
                                                0
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-4 pt-8 pb-16">
                            <div className="w-1/5 px-4">
                                <div className="rounded-8 text-center text-white p-8 leading-5" style={{ background: 'rgba(6,169,118)' }}>
                                    <div className="text-15">
                                        NGÀY ĐẦU TIÊN ĐẶT HÀNG
                                    </div>
                                    <div className="text-12">
                                        28/08/2023 15:17:43
                                    </div>
                                    <div className="text-14">
                                        1,050,000
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/5 px-4">
                                <div className="rounded-8 text-center text-white p-8 leading-5" style={{ background: 'rgba(248,113,113)' }}>
                                    <div className="text-15">
                                        NGÀY CUỐI CÙNG ĐẶT HÀNG
                                    </div>
                                    <div className="text-12">
                                        28/08/2023 15:17:43
                                    </div>
                                    <div className="text-14">
                                        1,050,000
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/5 px-4">
                                <div className="rounded-8 text-center text-white p-8 leading-5" style={{ background: 'rgba(0,144,218)' }}>
                                    <div className="text-15">
                                        TỔNG DOANH THU
                                    </div>
                                    <div className="text-12 opacity-0">
                                        28/08/2023 15:17:43
                                    </div>
                                    <div className="text-14">
                                        1,050,000
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/5 px-4">
                                <div className="rounded-8 text-center text-white p-8 leading-5" style={{ background: 'rgba(139,92,246)' }}>
                                    <div className="text-15">
                                        HÀNG HÓA ĐÃ MUA
                                    </div>
                                    <div className="text-12 opacity-0">
                                        28/08/2023 15:17:43
                                    </div>
                                    <div className="text-14">
                                        1,050,000
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/5 px-4">
                                <div className="rounded-8 text-center text-white p-8 leading-5" style={{ background: 'rgba(217,119,6)' }}>
                                    <div className="text-15">
                                        DOANH THU TRUNG BÌNH
                                    </div>
                                    <div className="text-12 opacity-0">
                                        28/08/2023 15:17:43
                                    </div>
                                    <div className="text-14">
                                        1,050,000
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="-mx-8 px-8"
                            style={{ background: '#e3e3e3' }}>
                            <CmsTab
                                data={links(1)} value={0} isLink={true} onChange={(e, value) => {
                                    History.push(links(1).find(e => e.id === value)?.link)
                                }} />
                        </div>
                        <div className="pt-16">
                            {
                                type === '1' && <Tab1 />
                            }


                            {
                                type === '2' && <Tab2 />
                            }

                            {
                                type === '3' && <Tab3 />
                            }

                            {
                                type === '4' && <Tab4 />
                            }

                            {
                                type === '5' && <Tab5 />
                            }

                            {
                                type === '6' && <Tab6 />
                            }

                            {
                                type === '7' && <Tab7 />
                            }
                        </div>
                    </div>
                }

            />
        </>

    )
}

export default withReducer(keyStore, reducer)(CategoryView);