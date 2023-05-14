import React, { useMemo } from "react";
import { CmsBoxLine, CmsFormikAutocomplete, CmsFormikDateTimePicker, CmsFormikTextField, } from "@widgets/components";
import { useSelector } from "react-redux";
import { keyStore } from "../../common";
import LocationContent from "./basic/LocationContent";
import { orderAllowTest, orderPaymentMethod, orderType } from "../../model";

export default function BasicInfoContent({ formik }) {

    const cusEntity = useSelector(store => store[keyStore].customer.entities)
    const cusData = useMemo(() => cusEntity?.data?.map(x => ({ ...x, id: x.id, name: `id: ${x.id || '-'}, tên: ${x.name || '-'}, email: ${x.email || '-'}`, cusName: x.name })) || [], [cusEntity])

    const HandleChangeCusId = (value) => {
        if (value) {
            const itemValue = {
                customerid: value.id,
                customername: value.cusName,
                customermoblie: value.phone,
                customeremail: value.email
            }
            formik.setValues({ ...formik.values, ...itemValue })
        }
    }

    return (
        <div className="w-full space-y-16 p-20 pb-40">
            <div className="w-full flex flex-row space-x-8">
                <div className="w-full">
                    <CmsBoxLine label={'Thông tin khách hàng'}>
                        <div className="w-full flex flex-row space-x-8">
                            <div className="w-full space-y-8">
                                <CmsFormikAutocomplete onChangeValue={HandleChangeCusId} size="small" data={cusData} valueIsId formik={formik} name="customerid" label="Mã khách hàng" />
                                <CmsFormikTextField size="small" required={false} formik={formik} name="customername" label="Tên khách hàng" />
                            </div>
                            <div className="w-full space-y-8">
                                <CmsFormikTextField size="small" required={false} formik={formik} name="customermoblie" label="Điện thoại" />
                                <CmsFormikTextField size="small" required={false} formik={formik} name="customeremail" label="Email" />
                            </div>
                        </div>
                    </CmsBoxLine>
                </div>
                <LocationContent formik={formik} />
            </div>
            <CmsBoxLine label={'Thông tin khác'}>
                <div className="w-full space-y-8">
                    <CmsFormikAutocomplete valueIsId data={Object.values(orderType)} size="small" required={false} formik={formik} name="type" label="Cách thức mua hàng" />
                    <CmsFormikAutocomplete size="small" data={Object.values(orderAllowTest)} valueIsId formik={formik} name="allowtest" label="Allow Test" />
                    <CmsFormikTextField isNumberFormat endNode="VND" size="small" required={false} formik={formik} name="customershipfee" label="Phí ship" />
                    <CmsFormikTextField size="small" required={false} formik={formik} name="couponcode" label="Mã coupon" />
                    <CmsFormikTextField size="small" required={false} formik={formik} name="combo" label="Combo" />
                    <CmsFormikDateTimePicker isOpenKeyBoard={false} format="yyyy-MM-dd HH:mm:ss" size="small" required={false} formik={formik} name="deliverydate" label="Ngày giao hàng" />
                    <CmsFormikTextField size="small" required={false} formik={formik} name="description" label="Mô tả" />
                    <CmsFormikTextField isNumber endNode="%" size="small" required={false} formik={formik} name="discount" label="Giảm giá" />
                    <CmsFormikTextField isNumberFormat endNode="VND" size="small" required={false} formik={formik} name="moneydeposit" label="Tiền gửi" />
                    <CmsFormikTextField size="small" required={false} formik={formik} name="moneydepositaccount" label="Tài khoản tiền gửi" />
                    <CmsFormikTextField isNumberFormat endNode="VND" size="small" required={false} formik={formik} name="moneydiscount" label="Tiền Giảm giá" />
                    <CmsFormikTextField isNumberFormat endNode="VND" size="small" required={false} formik={formik} name="moneytransfer" label="Tiền chuyển khoản" />
                    <CmsFormikTextField size="small" required={false} formik={formik} name="moneytransferaccount" label="Tài khoản tiền chuyển khoản" />
                    <CmsFormikTextField size="small" required={false} formik={formik} name="paymentcode" label="Mã thanh toán" />
                    <CmsFormikTextField size="small" required={false} formik={formik} name="paymentgateway" label="Cổng thanh toán" />
                    <CmsFormikAutocomplete data={Object.values(orderPaymentMethod)} size="small" required={false} formik={formik} name="paymentmethod" label="Phương thức thanh toán" />
                    <CmsFormikTextField endNode="điểm" size="small" required={false} formik={formik} name="usedpoints" label="Điểm dùng được" />
                    <CmsFormikTextField size="small" required={false} formik={formik} name="ref" label="giới thiệu" />
                    <CmsFormikTextField isNumberFormat endNode="VND" size="small" required={false} formik={formik} name="bonus" label="Tiền hoa hồng" />
                </div>
            </CmsBoxLine>
            {/* <CmsSignature
                title="Chữ ký"
                setValue={(value) => formik.setFieldValue('signature', value)}
                value={formik?.values?.signature || ''}
                className={'w-full shadow-4'}
            /> */}
        </div>
    )
}