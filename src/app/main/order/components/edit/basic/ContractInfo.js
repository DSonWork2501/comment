import { CmsFormikAutocomplete, CmsFormikTextField } from "@widgets/components";
import { keyStore } from "app/main/order/common";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList } from 'app/main/contract/store/contractSlice'

function ContractInfoComponent({ formik }) {
    const entities = useSelector(store => store[keyStore].contract.entities)
    const dispatch = useDispatch()
    const loading = useSelector(store => store[keyStore].contract.loading)

    useEffect(() => {
        dispatch(getList({ type: 1, status: 2 }))
    }, [dispatch])

    const data = React.useMemo(() => entities?.map(x => ({ name: x.title, id: x.id })) || [], [entities])
    return (
        <div className="w-full flex flex-row space-x-16" >
            <CmsFormikAutocomplete
                data={data}
                size="small"
                formik={formik}
                name='contractid'
                loading={loading}
                label="Hợp đồng"
                valueIsId
            />
            <CmsFormikTextField
                size="small"
                inputProps={{ inputProps: { min: 0, max: 99 } }}
                isNumber
                formik={formik}
                name="expire"
                label="hết hạn"
                endText={'Ngày'}
            />
        </div>

    )
}
export default React.memo(ContractInfoComponent)