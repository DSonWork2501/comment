import { CmsDialog, CmsFormikAutocomplete, CmsFormikSelect, CmsFormikTextField, CmsTinyMceEditor } from "@widgets/components"
import { useFormik } from "formik"
import React from "react"
import { ContractType } from 'app/main/contract/model/type'
import * as Yup from 'yup'
import { useDispatch } from "react-redux"
import { editContract } from "app/main/contract/store/contractSlice"

const initData = (item) => {
    if (item) {
        return item
    }
    else {
        return {
            "id": 0,
            "title": "",
            "content": "",
            "status": 1,
            "type": 1,
            DATA1: 0,
            DATA2: "",
            DATA3: ""
        }
    }
}

function EditDialogComponent({ open, handleClose, item = null }) {
    const dispatch = useDispatch()

    const handleSaveData = async (value) => {
        const data = [{ ...value, type: parseInt(value.type), status: parseInt(value.status) }]
        dispatch(editContract(data))
        handleClose && handleClose()
    }

    const formik = useFormik({
        initialValues: initData(item),
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSaveData,
        validationSchema: Yup.object({
            title: Yup.string().typeError("Tiêu đề không được bỏ trống !").required("Tiêu đề không được bỏ trống !"),
            content: Yup.string().typeError("Nội dung không được bỏ trống !").required("Nội dung không được bỏ trống !"),
        })
    })
    console.log('formik', formik)
    return (
        <CmsDialog
            open={open}
            title={item === null ? 'Thêm mới hợp đồng' : 'Cập nhật hợp đồng'}
            handleClose={handleClose}
            handleSave={formik.handleSubmit}
            isCloseDialogSubmit={false}
            size="xl"

        >
            <div className="w-full space-y-8">
                <div className="py-4">
                    <CmsFormikTextField
                        formik={formik}
                        label="Tiêu đề"
                        size="small"
                        name="title" />
                </div>

                <div className="py-4">
                    <CmsFormikTextField
                        formik={formik}
                        size="small"
                        label="Mã hợp đồng"
                        name="DATA2" />
                </div>

                <div className="py-4">
                    <CmsFormikTextField
                        formik={formik}
                        size="small"
                        label="Thời gian có hiệu lực"
                        isNumber name="DATA1" />
                </div>

                <CmsFormikAutocomplete
                    className="my-8 inline-flex"
                    label="Điều kiện"
                    name="DATA3"
                    formik={formik}
                    autocompleteProps={{
                        getOptionLabel: (option) => option?.subPlatformName,
                        ChipProps: {
                            size: 'small'
                        }
                    }}
                    data={[]}
                    valueIsId
                    multiple
                    size="small" />

                <div className="py-4">
                    <CmsFormikSelect
                        data={Object.values(ContractType)}
                        formik={formik}
                        size="small"
                        label="Loại"
                        name="type"
                    />
                </div>

                <div className="py-4">
                    <CmsTinyMceEditor
                        value={formik.values['content']}
                        onChange={(event) => { formik.setFieldValue('content', event.target.getContent()) }} />
                </div>

                {/* <CmsFormikTextField multiline rows={5} formik={formik} label="Nội dung" name="content" /> */}



                {/* {item && <CmsFormikSelect
                    data={Object.values(ContractStatus).map(x=>({...x, id: parseInt(x.id)}))}
                    formik={formik}
                    label="Trạng thái"
                    name="status"
                />} */}
            </div>
        </CmsDialog>
    )
}
export default React.memo(EditDialogComponent)