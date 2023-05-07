import { CmsFormikAutocomplete } from "@widgets/components";
import { keyStore } from "app/main/order/common";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList } from 'app/main/contract/store/contractSlice'

function ContractInfoComponent({formik}) {
    const entities = useSelector(store => store[keyStore].contract.entities)
    const dispatch = useDispatch()
    const loading = useSelector(store => store[keyStore].contract.loading)

    useEffect(() => {
        dispatch(getList({ type: 1, status: 1 }))
    }, [dispatch])

    const data = React.useMemo(() => entities?.map(x => ({ name: x.title, id: x.id })) || [], [entities])
    return (
        <CmsFormikAutocomplete
            data={data}
            formik={formik}
            name='contractid'
            loading={loading}
            label="Hợp đồng"
            valueIsId
        />
    )
}
export default React.memo(ContractInfoComponent)