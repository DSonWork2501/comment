import { Box } from "@material-ui/core"
import { CmsBoxLine, CmsFormikSearchAutoComplete, CmsFormikTextField } from "@widgets/components"
import { keyStore } from "app/main/product/common"
import { getList } from "app/main/product/store/productSlice"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

function RightSideContent({ formik, prefix }) {
    const dispatch = useDispatch()
    const entities = useSelector(store => store[keyStore].product.entities)?.data
    const loading = useSelector(store => store[keyStore].product.loading)

    useEffect(() => {
        dispatch(getList({ homeSubscription: 2, PageNumber: 1, rowsPage: 30 }))
    }, [dispatch])

    return (
        <div className="w-full space-y-8">
            <CmsBoxLine label={'Thông tin chi tiết'} className="p-16">
                <div className="w-full space-y-16">
                    <CmsFormikTextField size="small" name={`${prefix}name`} label="Tên" formik={formik} />
                    <CmsFormikTextField isNumberFormat={true} size="small" name={`${prefix}capacity`} label="capacity" formik={formik} />
                    <CmsFormikTextField isNumberFormat={true} size="small" name={`${prefix}heightlimit`} label="height limit" formik={formik} />
                </div>
            </CmsBoxLine>
            <CmsFormikSearchAutoComplete
                name={`${prefix}item`}
                label="Sản phẩm"
                onKeyPress={(value) => { dispatch(getList({ search: value, homeSubscription: 2, PageNumber: 1, rowsPage: 30 })) }}
                loading={loading}
                multiple={false}
                required={false}
                formik={formik}
                data={entities || []}
                autocompleteProps={{
                    limitTags: 20,
                    getOptionLabel: (option) => option?.type,
                    ChipProps: {
                        size: 'small'
                    },
                    size: 'small',
                    disableCloseOnSelect: true,
                    filterSelectedOptions: false,
                    renderOption: (option, props) =>
                        <Box className="w-full" component="div" style={{ '& > img': { mr: 2, flexShrink: 0 } }}>
                            <div className="flex justify-between items-center space-x-4">
                                <div className="flex justify-start">
                                    {option.name}
                                </div>
                                <div className="flex justify-end">
                                    {option.img &&
                                        <img
                                            loading="lazy"
                                            width="200"
                                            src={`${option.img}`}
                                            srcSet={`${option.img} 2x`}
                                            alt=""
                                        />
                                    }
                                </div>
                            </div>
                        </Box>,
                    // PaperComponent: CustomPaper
                }}
            />
        </div>
    )
}
export default RightSideContent