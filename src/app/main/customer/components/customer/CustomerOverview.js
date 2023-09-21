import { CmsButton, CmsButtonGroup, CmsCardedPage, CmsIconButton, CmsLabel, CmsTableBasic } from "@widgets/components";
import { alertInformation, initColumn } from "@widgets/functions";
import { FilterOptions } from "@widgets/metadatas";
import withReducer from "app/store/withReducer";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keyStore } from "../../common";
import FilterOptionView from "./filterOptionView";
import reducer from "../../store";
import { getList as getCustomer, insertCus, resetSearch, setSearch } from "../../store/customerSlice";
import EditCusContent from "./edit/EditCus";
import { statusCus } from "../../model";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faCircleUser, faEnvelope, faLocationDot, faPhone, faUserLock, faUserMinus, faUserPlus, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import AddUserDialog from "./edit/AddUserDialog";
import { unwrapResult } from "@reduxjs/toolkit";
import AddBlackDialog from "./edit/AddBlackDialog";
import OverviewDialog from "./edit/OverviewDialog";



function CategoryView() {
    const dispatch = useDispatch()
    const search = useSelector(store => store[keyStore].customer.search)
    const loading = useSelector(store => store[keyStore].customer.loading)
    const entities = useSelector(store => store[keyStore].customer.entities)
    const [filterOptions, setFilterOptions] = useState(null);
    const [open, setOpen] = useState('');
    const [email, setEmail] = useState('');
    const [detail, setDetail] = useState(null);

    useEffect(() => {
        dispatch(getCustomer(search))
    }, [dispatch, search])



    return (
        <>
            <CmsCardedPage
                title={'Thông tin khách hàng'}
                icon="whatshot"
                content={
                    <div style={{ background: 'rgba(243,244,246)' }} className="h-full p-8 text-13">
                        <div className="flex flex-wrap -mx-4 items-center">
                            <div className="w-1/5 px-4 mb-8">
                                <div className="rounded-8 text-center bg-white p-8 leading-5">
                                    <div>
                                        <FontAwesomeIcon icon={faCircleUser} className="text-gray-500 text-40" />
                                    </div>
                                    <div className="mt-8 font-600 text-green-400">
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
                                                <FontAwesomeIcon icon={faPhone} className="text-gray-500 text-20" />
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
                                                <FontAwesomeIcon icon={faPhone} className="text-gray-500 text-20" />
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
                                                <FontAwesomeIcon icon={faPhone} className="text-gray-500 text-20" />
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
                                                <FontAwesomeIcon icon={faPhone} className="text-gray-500 text-20" />
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
                                                <FontAwesomeIcon icon={faPhone} className="text-gray-500 text-20" />
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
                                                <FontAwesomeIcon icon={faPhone} className="text-gray-500 text-20" />
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
                                                <FontAwesomeIcon icon={faPhone} className="text-gray-500 text-20" />
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
                                                <FontAwesomeIcon icon={faPhone} className="text-gray-500 text-20" />
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
                    </div>
                }

            />
        </>

    )
}

export default withReducer(keyStore, reducer)(CategoryView);