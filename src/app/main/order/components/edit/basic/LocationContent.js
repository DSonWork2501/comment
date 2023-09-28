import { CmsBoxLine, CmsFormikAutocomplete, CmsFormikTextField } from "@widgets/components"
import { getCity, getDistrict, getWard } from "@widgets/store/locationsSlice"
import React from "react"
import { useEffect } from "react"
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

    // const [cityIdNhanh, setCityIdNhanh] = useState(null)
    // const [districtIdNhanh, setDistrictIdNhanh] = useState(null)

    const { values, setFieldValue } = formik, { customercity, customerdistrict, customerward } = values;
    useEffect(() => {
        dispatch(getCity({}))
    }, [dispatch])

    useEffect(() => {
        if (customercity && cityData?.length) {
            dispatch(getDistrict({ parentId: cityData.find(val => val.id === customercity).idnhanh }))
            setFieldValue('cityname', cityData.find(val => val.id === customercity).name)
        }
    }, [dispatch, customercity, cityData, setFieldValue])

    useEffect(() => {
        if (customerdistrict && districtData?.length) {
            dispatch(getWard({ parentId: districtData.find(val => val.id === customerdistrict).idnhanh }))
            setFieldValue('districtname', districtData.find(val => val.id === customerdistrict).name)
        }
    }, [dispatch, customerdistrict, districtData, setFieldValue])

    useEffect(() => {
        if (customerward && wardData?.length)
            setFieldValue('wardname', wardData.find(val => val.id === customerward).name)
    }, [setFieldValue, customerward, wardData])

    // const HandleChangeCity = (event, value) => {
    //     formik.setFieldValue('customercity', value)
    //     setCityIdNhanh(value?.idnhanh)
    //     setDistrictIdNhanh(null)
    //     formik.setFieldValue('customerdistrict', '')
    //     formik.setFieldValue('customerward', '')
    //     // console.log(value);
    // }

    // const HandleChangeDistrict = (event, value) => {
    //     formik.setFieldValue('customerdistrict', value)
    //     setDistrictIdNhanh(value?.idnhanh)
    // }

    // console.log(formik);

    return <div className="w-full">
        <CmsBoxLine label={'Thông tin địa chỉ'}>
            <div className="space-y-8">
                <div className="w-full flex flex-row space-x-8">
                    <CmsFormikAutocomplete size="small" data={cityData} formik={formik} label="Thành phố" name="customercity" valueIsId />
                    <CmsFormikAutocomplete disabled={!Boolean(formik?.values?.customercity)} size="small" data={districtData} formik={formik} label="Quận" name="customerdistrict" valueIsId />
                    <CmsFormikAutocomplete disabled={!Boolean(formik?.values?.customerdistrict)} size="small" data={wardData} formik={formik} label="Huyện" name="customerward" valueIsId />
                </div>
                <CmsFormikTextField size="small" formik={formik} label="Địa chỉ" name="customeraddress" />
            </div>
        </CmsBoxLine>
    </div>
}