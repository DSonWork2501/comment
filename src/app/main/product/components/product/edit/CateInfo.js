import {
    CmsButtonProgress,
    CmsFormikAutocomplete,
    CmsIconButton,
    CmsLabel,
    CmsTableBasic,
} from "@widgets/components";
import { alertInformation, initColumn } from "@widgets/functions";
import withReducer from "app/store/withReducer";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keyStore } from "../../../common";
import reducer from "../../../store";
import { getDetail, product } from "../../../store/productSlice";
import { getList as getCategory } from "../../../store/categorySlice";
import { Chip } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { get } from "lodash";
import { unwrapResult } from "@reduxjs/toolkit";

const columns = [
    new initColumn({ field: "id", label: "ID", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "name", label: "Danh Mục", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "image", label: "Hình Ảnh", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "Trạng thái", label: "Giá", alignHeader: "center", alignValue: "center", sortable: false }),
]

const defaultForm = {
    cateId: null,
    sku: null
}

function CateInfo({ ishs, sku, dataOb ,formikParent}) {
    const dispatch = useDispatch()
    const loading = useSelector(store => store[keyStore].product.loading)
    const cates = useSelector(store => store[keyStore].product.cates?.data) || []
    //const [newCate, setNewCate] = useState([])
    const [entities,setEntities]=useState({data:[]});

    // const entities = useMemo(() => {
    //     return {
    //         data: [...newCate, ...dataOb]
    //     }
    // }, [dataOb, newCate])
    const newCates = useMemo(() => {
        return cates.map(val => ({
            ...val,
            disabled: Boolean(entities.data.find(e => e.id === val.id))
        }))
    }, [entities, cates])

    const handleDelete=(item)=>{
        alertInformation({
            text: 'Bạn có muốn lưu thao tác',
            data: item,
            confirm: async (data) => {
                try {
                    const resultAction =  await dispatch(product.other.removeProductCate([{
                        cateId: data.id,
                        sku,
                        status:0
                    }]))
                    unwrapResult(resultAction);
                    dispatch(getDetail({ sku }))
                } catch (error) {
                    
                }
               
            },
        })
    }

    const dataObString=JSON.stringify(dataOb);
    useEffect(()=>{
        const array=JSON.parse(dataObString);
        setEntities({
            data: [ ...array]
        })
    },[dataObString])

    const {setValues}=formikParent;
    useEffect(()=>{
        setValues(prev=>{
            return {...prev,newCates:entities.data.filter(val=>val.isNew).map(val=>({cateId:val.id,sku,status:1}))}
        })
    },[entities,setValues,sku])

    const handleSave = (value) => {
        const ob = { ...cates.find(val => val.id === value.cateId), isNew: true };
        setEntities(prev=>({
            data:[ob, ...prev.data]
        }))
        formik.setSubmitting(false);
        formik.resetForm(defaultForm);
    }

    const formik = useFormik({
        initialValues: { ...defaultForm, sku },
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSave,
        validationSchema: Yup.object({
            cateId: Yup.number().nullable().required("Vui lòng chọn loại sản phẩm"),
        })
    })

    useEffect(() => {
        dispatch(getCategory({ pageNumber: 1, rowsPage: 10000, type: ishs > 0 ? 1 : 0 }));
    }, [dispatch,ishs])

    const data = entities?.data?.map(item => ({
        id: item.id,
        name: item.name,
        image: (<img style={{ height: 100, margin: '0 auto' }} src={`${item.image ? `${process.env.REACT_APP_BASE_URL}api/product/img/${item?.image}` : 'assets/images/etc/no-image-icon.png'}`} alt={item?.img} />),
        status: (
            <React.Fragment>
                {
                    item.status === 1
                    &&
                    <Chip label="Đang sử dụng" color="primary" />
                }

                {
                    item.status === 0
                    &&
                    <Chip label="Đã tắt" color='error' />
                }
            </React.Fragment>
        ),
        action: (
            <div className="flex flex-row">
                <CmsIconButton
                    tooltip={<CmsLabel content={"Xóa"} className="text-10" />}
                    icon="delete"
                    className="bg-red-500 hover:bg-red-700 hover:shadow-2 text-white"
                    onClick={() =>{
                        if(item.isNew){
                            setEntities(prev=>{
                                return {
                                    data:prev.data.filter(val=>val.id!==item.id)
                                }
                            })
                        }else{
                            handleDelete(item)
                        }
                    } }
                />
            </div>
        ) || []
    }));

    return (
        <>
            <div className="flex items-center py-8">
                <CmsFormikAutocomplete
                    name="cateId"
                    formik={formik}
                    label="Loại sản phẩm"
                    data={newCates}
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
                <div className="w-80">
                    <CmsButtonProgress
                        loading={formik.isSubmitting}
                        type="submit"
                        label={"Thêm"}
                        startIcon="vertical_align_bottom"
                        className="mx-2"
                        style={
                            (get(formik.touched, 'cateId') && Boolean(get(formik.errors, 'cateId')))
                                ? { marginBottom: 26 }
                                : {}
                        }
                        onClick={formik.handleSubmit}
                        size="small" />
                </div>

            </div>

            <CmsTableBasic
                className="w-full h-full"
                data={data}
                columns={columns}
                loading={loading}
                isPagination={false}
                isServerSide={true}
            />
        </>
    )
}

export default withReducer(keyStore, reducer)(CateInfo);