import FuseAnimateGroup from "@fuse/core/FuseAnimateGroup";
import { CmsButton, CmsCheckboxGroup, CmsFormikAutocomplete, CmsFormikRadioGroup, CmsFormikTextField, CmsImageBox2, CmsTinyMceEditor } from "@widgets/components";
import React, { } from "react";
import MutipleImagePathLink from "../../common/MultipleImagePathLink";
import noImage from '@widgets/images/noImage.jpg';
import { FocusError } from "focus-formik-error";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "app/main/product/store/productSlice";
import { keyStore } from "app/main/product/common";
import CmsFormikProductType from '@widgets/components/product-type/index';
import { FieldArray, FormikProvider } from "formik";
import { Box, InputLabel, styled } from "@material-ui/core";
export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

const BoxCustom = styled(Box)({
    border: '1px solid rgba(0, 0, 0, 0.12)',
    margin: '24px 0 16px 0',
    padding: '0 12px 0 12px',
    position: 'relative',
    borderRadius: '2px',
    transition: 'none',
    "& .custom-label": {
        top: '-10px',
        left: '8px',
        padding: '0 4px',
        position: 'absolute',
        backgroundColor: 'white',
        color: '#1B9E85',
        fontSize: '1.4rem',
        fontFamily: 'Roboto',
        fontWeight: 400,
        lineHeight: 1.5,
        margin: 0
    },
    "&.black-label>.custom-label": {
        color: 'black',
        fontSize: '1.5rem',
    },
    "& .hide-border": {
        border: 'none',
        marginTop: 0
    },
    "& .hide-label>label": {
        display: "none"
    }
});

function BasicInfo({ formik, SaveData, options }) {
    const dispatch = useDispatch()
    const imageLoading = useSelector(store => store[keyStore].product.imgLoading)
    const { certification, madeIn, unit, classify, brands, cates } = useSelector(store => store[keyStore].product);

    const HandleUploadImage = async (file) => {

        let filesForm = new FormData();
        filesForm.append('files', file);
        filesForm.append('sku', formik?.values?.sku);
        var response = await dispatch(uploadImage(filesForm));
        if (response?.payload?.result) {
            formik.setFieldValue('image', `${formik?.values?.sku}/${file.name}`)
        }
    }

    const { values, setFieldValue } = formik;
    const cerValue = (typeof values.certification !== 'object' || !Array.isArray(values.certification) ? (values?.certification ? values.certification.split(',') : []) : values.certification);

    return (
        <FuseAnimateGroup className="flex flex-wrap p-20 overflow-hidden w-full h-full" enter={{ animation: 'transition.slideUpBigIn' }}>
            <div className="w-full space-y-16">
                <FocusError formik={formik} />
                <CmsFormikTextField size="small" formik={formik} name="name" label="tên sản phẩm" />
                <CmsFormikTextField size="small" formik={formik} name="shortname" label="tên ngắn" />
                <CmsFormikTextField size="small" formik={formik} name="barcode" label="barcode" />
                <CmsFormikTextField size="small" formik={formik} name="sku" label="sku" />
                {/* <CmsFormikTextField size="small" formik={formik} name="brand" label="thương hiệu" /> */}

                <CmsFormikAutocomplete
                    className="my-8 inline-flex"
                    label="Loại sản phẩm"
                    name="cateID"
                    formik={formik}
                    autocompleteProps={{
                        getOptionLabel: (option) => option?.name,
                        ChipProps: {
                            size: 'small'
                        }
                    }}
                    data={cates}
                    valueIsId
                    multiple
                    size="small" />

                <CmsFormikAutocomplete
                    name="brandid"
                    formik={formik}
                    label="thương hiệu"
                    data={brands}
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

                {/* <CmsFormikTextField size="small" multiline={true} formik={formik} name="description" label="Mô tả" /> */}

                {/* <CmsFormikTextField size="small" formik={formik} name="unit" label="đơn vị" />
                <CmsFormikTextField size="small" formik={formik} name="classify" label="phân loại" /> */}
                {/* <CmsFormikTextField size="small" formik={formik} name="certification" label="chứng nhận" /> */}
                <CmsFormikAutocomplete
                    name="unitid"
                    formik={formik}
                    label="Đơn vị"
                    data={unit}
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

                <CmsFormikAutocomplete
                    name="classifyid"
                    formik={formik}
                    label="Phân loại"
                    data={classify}
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

                <CmsCheckboxGroup
                    label="Chứng nhận"
                    className="py-0 m-0 w-full"
                    name="certification"
                    onChange={(array) => { setFieldValue('certification', array) }}
                    vertical={false}
                    data={certification}
                    value={cerValue}
                />

                <CmsFormikAutocomplete
                    name="madeinid"
                    formik={formik}
                    label="Xuất sứ"
                    data={madeIn}
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

                <CmsFormikTextField size="small" formik={formik} name="suggest" label="gợi ý" />
                <CmsFormikTextField size="small" formik={formik} name="note" label="ghi chú" />
                <div className="w-full self-center px-224 my-0">
                    <CmsImageBox2
                        CheckError={!formik.values.sku ? 'Vùi lòng nhập SKU !' : null}
                        title="Hình đại diện (Lưu ý: Click vào hình để upload !)"
                        loading={imageLoading}
                        value={formik?.values?.image ? `${baseurl}${formik?.values?.image}` : noImage}
                        setValue={HandleUploadImage}
                        styleImage={{ className: 'w-128' }}
                        disablebtitle
                    />
                </div>
                <MutipleImagePathLink
                    formik={formik}
                    name="images"
                    setImage={(value) => formik.setFieldValue('images', value)}
                    CheckError={!formik.values.sku ? 'Vùi lòng nhập SKU !' : null}
                />
                <div className="flex flex-row w-full space-x-8 justify-between">
                    <CmsFormikRadioGroup
                        className="flex-1 p-8"
                        name="isnew"
                        data={[{ id: 1, name: 'Có' }, { id: 0, name: 'Không' }]}
                        formik={formik}
                        label={'Hàng Mới'}
                    />
                    <CmsFormikRadioGroup
                        className="flex-1 p-8"
                        name="ishot"
                        data={[{ id: 1, name: 'Có' }, { id: 0, name: 'Không' }]}
                        formik={formik}
                        label={'Hàng Hot'}
                    />
                    <CmsFormikRadioGroup
                        className="flex-1 p-8"
                        name="ishome"
                        data={[{ id: 1, name: 'Có' }, { id: 0, name: 'Không' }]}
                        formik={formik}
                        label={'Trang Home'}
                    />
                    <CmsFormikRadioGroup
                        className="flex-1 p-8"
                        name="ishome"
                        data={[{ id: 1, name: 'Có' }, { id: 0, name: 'Không' }]}
                        formik={formik}
                        label={'Bán Chạy'}
                    />
                    <CmsFormikRadioGroup
                        className="flex-1 p-8"
                        name="isfreeship"
                        data={[{ id: 1, name: 'Có' }, { id: 0, name: 'Không' }]}
                        formik={formik}
                        label={'Miễn phí vận chuyển'}
                    />
                    {/* <CmsFormikRadioGroup
                        name="ishs"
                        data={Object.values(ProductType).map(x => ({ ...x, id: parseInt(x.id) }))}
                        formik={formik}
                        label={'Loại sản phẩm'}
                        vertical={false}
                    /> */}
                    <CmsFormikProductType
                        divClassName={`flex-1`}
                        formik={formik}
                    />
                </div>

                <BoxCustom
                    className="p-16 py-20 mt-25 border-1 rounded-4 black-label">
                    <InputLabel
                        className='custom-label'>
                        Thuộc tính thêm
                    </InputLabel>

                    <FormikProvider value={formik}>
                        <FieldArray
                            name="properties"
                            render={({ insert, remove, push }) => (
                                <div className='-mt-20'>
                                    {formik.values.properties?.length > 0 &&
                                        formik.values.properties.map((friend, index) => (
                                            <div key={index}>
                                                <div className='flex  justify-between items-center'>
                                                    <div className='flex flex-wrap -mx-8 w-11/12'>
                                                        <div className='w-full md:w-1/3  px-8  pt-8'>
                                                            <CmsFormikTextField
                                                                label="Tên thuộc tính"
                                                                name={`properties[${index}].name`}
                                                                size="small"
                                                                className="mt-8"
                                                                formik={formik} />
                                                        </div>
                                                        <div className='w-full md:w-2/3 px-8  pt-8'>
                                                            <CmsFormikTextField
                                                                label="Giá trị"
                                                                className="mt-8"
                                                                name={`properties[${index}].value`}
                                                                size="small"
                                                                formik={formik} />
                                                        </div>
                                                    </div>
                                                    <div className='text-right pt-8'>
                                                        <CmsButton
                                                            onClick={() => { remove(index); }}
                                                            label="Xóa"
                                                            size="small"
                                                            className="mt-8 text-white bg-red-600 hover:bg-red-600"
                                                            startIcon="delete" />
                                                    </div>
                                                </div>
                                                {
                                                    formik.values.properties.length - 1 !== index
                                                    &&
                                                    <div style={{
                                                        height: '1px',
                                                        width: "100%",
                                                        background: "rgb(210 202 202)",
                                                        position: "relative",
                                                        top: "0.6rem"
                                                    }}>
                                                    </div>
                                                }
                                            </div>
                                        ))}

                                    < div className='pt-16'>
                                        <CmsButton
                                            onClick={() => push({
                                                "name": "",
                                                "value": "",
                                            })}
                                            label="Thêm mới"
                                            startIcon="add" />
                                    </div>
                                </div>
                            )}
                        />
                    </FormikProvider>

                </BoxCustom>

                <BoxCustom
                    className="p-16 py-20 mt-25 border-1 rounded-4 black-label">
                    <InputLabel
                        className='custom-label'>
                        Mô tả
                    </InputLabel>
                    <CmsTinyMceEditor
                        value={formik.values['description']}
                        onChange={(event) => { formik.setFieldValue('description', event.target.getContent()) }} />
                </BoxCustom>
            </div>
        </FuseAnimateGroup>
    )
}
export default React.memo(BasicInfo)