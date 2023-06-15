import { CmsBoxLine, CmsFormikAutocomplete, CmsFormikTextField } from "@widgets/components"
import { getCity, getDistrict, getWard } from "@widgets/store/locationsSlice"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"


export default function LocationContent({ formik }) {
    const dispatch = useDispatch()
    const citys = useSelector(store => store['widgets'].location.citys)
    const districts = useSelector(store => store['widgets'].location.districts)
    const wards = useSelector(store => store['widgets'].location.wards)

    const cityData = useMemo(() => citys || [], [citys])
    const districtData = useMemo(() => districts || [], [districts])
    const wardData = useMemo(() => wards || [], [wards])

    const [cityIdNhanh, setCityIdNhanh] = useState(null)
    const [districtIdNhanh, setDistrictIdNhanh] = useState(null)

    useEffect(() => {
        dispatch(getCity({}))
    }, [dispatch])

    useEffect(() => {
        cityIdNhanh && dispatch(getDistrict({ parentId: cityIdNhanh }))
    }, [dispatch, cityIdNhanh])

    useEffect(() => {
        districtIdNhanh && dispatch(getWard({ parentId: districtIdNhanh }))
    }, [dispatch, districtIdNhanh])

    const HandleChangeCity = (event, value) => {
        formik.setFieldValue('customercity', value)
        setCityIdNhanh(value?.idnhanh)
        setDistrictIdNhanh(null)
        formik.setFieldValue('customerdistrict', '')
        formik.setFieldValue('customerward', '')
        console.log(value);
    }

    const HandleChangeDistrict = (event, value) => {
        formik.setFieldValue('customerdistrict', value)
        setDistrictIdNhanh(value?.idnhanh)
    }

    const isDisDistrist = !isNaN(formik?.values?.customercity)
    const isDisWard = !isNaN(formik?.values?.customerdistrict)

    return <div className="w-full">
        <CmsBoxLine label={'Thông tin địa chỉ'}>
            <div className="space-y-8">
                <div className="w-full flex flex-row space-x-8">
                    <CmsFormikAutocomplete onChange={HandleChangeCity} size="small" data={cityData} formik={formik} label="Thành phố" name="customercity" />
                    <CmsFormikAutocomplete onChange={HandleChangeDistrict} disabled={isDisDistrist} size="small" data={districtData} formik={formik} label="Quận" name="customerdistrict" />
                    <CmsFormikAutocomplete disabled={isDisWard} size="small" data={wardData} formik={formik} label="Huyện" name="customerward" />
                </div>
                <CmsFormikTextField size="small" formik={formik} label="Địa chỉ" name="customeraddress" />
            </div>
        </CmsBoxLine>
    </div>
}