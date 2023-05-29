import FuseAnimateGroup from "@fuse/core/FuseAnimateGroup"
import { CmsFormikAutocomplete, CmsFormikRadioGroup, CmsFormikTextField, CmsImageBox2 } from "@widgets/components"
import React, { } from "react"
import MutipleImagePathLink from "../../common/MultipleImagePathLink"
import noImage from '@widgets/images/noImage.jpg';
import { FocusError } from "focus-formik-error";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "app/main/product/store/productSlice";
import { keyStore } from "app/main/product/common";
import CmsFormikProductType from '@widgets/components/product-type/index'
export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

function BasicInfo({ formik, SaveData, options }) {
    const { origins } = options;
    const dispatch = useDispatch()
    const imageLoading = useSelector(store => store[keyStore].product.imgLoading)

    const HandleUploadImage = async (file) => {

        let filesForm = new FormData();
        filesForm.append('files', file);
        filesForm.append('sku', formik?.values?.sku);
        var response = await dispatch(uploadImage(filesForm));
        if (response?.payload?.result) {
            formik.setFieldValue('image', `${formik?.values?.sku}/${file.name}`)
        }
    }

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
                    name="brand"
                    formik={formik}
                    label="thương hiệu"
                    data={origins}
                    size="small"
                    autocompleteProps={{
                        getOptionLabel: (option) => option?.name || '',
                        ChipProps: {
                            size: 'small'
                        },
                        size: 'small',
                    }}
                    setOption={(option) => option?.name || ''}
                    valueIsId="name" />

                <CmsFormikTextField size="small" multiline={true} formik={formik} name="description" label="Mô tả" />
                <CmsFormikTextField size="small" formik={formik} name="unit" label="đơn vị" />
                <CmsFormikTextField size="small" formik={formik} name="classify" label="phân loại" />
                <CmsFormikTextField size="small" formik={formik} name="certification" label="chứng nhận" />
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
                        name="isnew"
                        data={[{ id: 1, name: 'Có' }, { id: 0, name: 'Không' }]}
                        formik={formik}
                        label={'Hàng Mới'}
                        vertical={false}
                    />
                    <CmsFormikRadioGroup
                        name="ishot"
                        data={[{ id: 1, name: 'Có' }, { id: 0, name: 'Không' }]}
                        formik={formik}
                        label={'Hàng Hot'}
                        vertical={false}
                    />
                    <CmsFormikRadioGroup
                        name="ishome"
                        data={[{ id: 1, name: 'Có' }, { id: 0, name: 'Không' }]}
                        formik={formik}
                        label={'Trang Home'}
                        vertical={false}
                    />
                    <CmsFormikRadioGroup
                        name="ishome"
                        data={[{ id: 1, name: 'Có' }, { id: 0, name: 'Không' }]}
                        formik={formik}
                        label={'Bán Chạy'}
                        vertical={false}
                    />
                    <CmsFormikRadioGroup
                        name="isfreeship"
                        data={[{ id: 1, name: 'Có' }, { id: 0, name: 'Không' }]}
                        formik={formik}
                        label={'Miễn phí vận chuyển'}
                        vertical={false}
                    />
                    {/* <CmsFormikRadioGroup
                        name="ishs"
                        data={Object.values(ProductType).map(x => ({ ...x, id: parseInt(x.id) }))}
                        formik={formik}
                        label={'Loại sản phẩm'}
                        vertical={false}
                    /> */}
                    <CmsFormikProductType
                        formik={formik}
                    />
                </div>
            </div>
        </FuseAnimateGroup>
    )
}
export default React.memo(BasicInfo)