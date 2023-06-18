import { keyStore } from "../../common"
import React from "react"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from 'yup'
import { get } from "lodash"
import { ImageCapacity } from "@widgets/metadatas"
import Connect from "@connect/@connect"
import noImage from '@widgets/images/noImage.jpg';
import { useEffect } from "react"
import { setStateRedux } from "../../store/categorySlice"
const { CmsDialog, CmsFormikTextField, CmsFormikSelect, CmsImageBox } = require("@widgets/components")

const initData = (id, data) => {
    if (id) {
        return {
            "id": data?.id || 0,
            "name": data?.name || "",
            "type": data?.type || 0,
            "image": data?.image || "",
            "status": data?.status || 0
        }
    } else {
        return {
            "id": 0,
            "name": "",
            "type": 0,
            "image": "",
            "status": 0
        }
    }
}

function EditCateContent({ id, open, handleClose, handleSave }) {
    const entity = useSelector(store => store[keyStore].category.entity);
    const dispatch = useDispatch();

    const handleSaveData = (values) => {
        handleSave && handleSave(values)
        handleClose && handleClose()
    }

    useEffect(() => {
        return () => {
            dispatch(setStateRedux({
                entity: null
            }))
        }
    }, [dispatch])

    const formik = useFormik({
        initialValues: initData(id, entity),
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSaveData,
        validationSchema: Yup.object({
            name: Yup.string().required("Chưa nhập tên thể loại"),
            image: Yup.string().required("Chọn hình"),
        })
    })

    const handleSetFile = async (name, item) => {
        if (item) {
            let filesForm = new FormData();

            filesForm.append('files', item);
            filesForm.append('cateid', 1);
            formik.setSubmitting(true);
            const result = await Connect.live.category.uploadImage(filesForm);
            formik.setSubmitting(false);

            formik.setFieldValue('image', result.data.message);
        }
    }
    console.log(formik);
    return (
        <CmsDialog
            title={`${formik?.values?.id === 0 ? 'Thêm mới thể loại' : 'Cập nhật thể loại'}`}
            open={open}
            handleClose={handleClose}
            loading={formik.isSubmitting}
            handleSave={formik.handleSubmit}
            disabledSave={formik.isSubmitting}
            isCloseDialogSubmit={false}
        >
            <div className="w-full space-y-16">
                <CmsFormikTextField
                    size="small"
                    name="name"
                    formik={formik}
                    label="Tên thể loại" />
                <CmsFormikSelect
                    size="small"
                    name="type"
                    formik={formik}
                    label="Loại"
                    data={[{ id: '0', name: 'thường' }, { id: '1', name: 'Home subcription' }]} />
                <CmsImageBox
                    id={"slider"}
                    option={`Hình ảnh`}
                    size={'1920 x 1080'}
                    imgData={`${formik.values['image'] ? `${process.env.REACT_APP_BASE_URL_IMG}${formik.values['image']}` : noImage} `}
                    errorValue={e => {
                        if (!e)
                            handleSetFile('image', null);
                    }}
                    setImage={files => {
                        handleSetFile('image', files);
                    }}
                    limitCapacity={ImageCapacity['2MB']}
                    rollbackImg={false}
                    typeEventSport={false}
                    formGroupClass="m-0 mt-8"
                    messageValue={(get(formik.touched, 'image') && Boolean(get(formik.errors, 'image'))) ? get(formik.errors, 'image') : ''}
                />
            </div>
        </CmsDialog>

    )
}

export default EditCateContent