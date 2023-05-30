import { CmsFormikAutocomplete } from "@widgets/components";
import { keyStore } from "app/main/order/common";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList } from 'app/main/contract/store/contractSlice'

const month = [
    {
        id: 3,
        name: '3'
    },
    {
        id: 6,
        name: '6'
    },
    {
        id: 9,
        name: '9'
    },
    {
        id: 12,
        name: '12'
    },
];

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
            <CmsFormikAutocomplete
                name="expire"
                formik={formik}
                label="Hết hạn"
                data={month}
                size="small"
                autocompleteProps={{
                    getOptionLabel: (option) => option?.name || '',
                    ChipProps: {
                        size: 'small'
                    },
                    size: 'small',
                }}
                setOption={(option) => option?.name || ''}
                valueIsId />
            {/* 
            <CmsFormikTextField
                size="small"
                inputProps={{ inputProps: { min: 0, max: 99 } }}
                isNumber
                formik={formik}
                name="expire"
                label="hết hạn"
                endText={'Ngày'}
            /> */}
        </div>

    )
}
export default React.memo(ContractInfoComponent)