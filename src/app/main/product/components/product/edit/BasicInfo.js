import FuseAnimateGroup from "@fuse/core/FuseAnimateGroup"
import { CmsFormikRadioGroup, CmsFormikTextField } from "@widgets/components"
import React from "react"
import MutipleImagePathLink from "../../common/MultipleImagePathLink"
import noImage from '@widgets/images/noImage.jpg';
export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

function BasicInfo({ formik, SaveData,  }) {

    const { images } = formik?.values

    console.log('formik', formik)

    return (
        <FuseAnimateGroup className="flex flex-wrap p-20 overflow-hidden w-full h-full" enter={{ animation: 'transition.slideUpBigIn' }}>
            <div className="w-full space-y-16">
                <CmsFormikTextField size="small" formik={formik} name="name" label="Tên sản phẩm" />
                <CmsFormikTextField size="small" formik={formik} name="shortname" label="Tên ngắn" />
                <CmsFormikTextField size="small" formik={formik} name="barcode" label="Barcode" />
                <CmsFormikTextField size="small" formik={formik} name="sku" label="SKU" />
                <CmsFormikTextField size="small" formik={formik} name="brand" label="brand" />
                <CmsFormikTextField size="small" multiline={true} formik={formik} name="description" label="Mô tả" />
                <CmsFormikTextField size="small" formik={formik} name="unit" label="đơn vị" />
                <CmsFormikTextField size="small" formik={formik} name="classify" label="classify" />
                <CmsFormikTextField size="small" formik={formik} name="certification" label="certification" />
                <CmsFormikTextField size="small" formik={formik} name="suggest" label="Gợi ý" />
                <CmsFormikTextField size="small" formik={formik} name="note" label="Ghi chú" />
                <div key="div_0" className="flex flex-row items-center space-x-8">
                    <CmsFormikTextField key={`path_key_0`} label="Image" formik={formik} name="image" />
                    <img key={`image_key_0`} alt={`image_alt_0`} src={`${baseurl}${formik?.values?.image}` || noImage} className="max-h-32 max-w-32" />
                </div>
                <MutipleImagePathLink images={images} setImage={(value) => formik.setFieldValue('images', value)} />
                <div className="flex flex-row w-full space-x-8 justify-between">
                    <CmsFormikRadioGroup
                        name="isnew"
                        data={[{ id: 1, name: 'Có' }, { id: 0, name: 'Không' }]}
                        formik={formik}
                        label={'Hàng mới'}
                        vertical={false}
                    />
                    <CmsFormikRadioGroup
                        name="ishot"
                        data={[{ id: 1, name: 'Có' }, { id: 0, name: 'Không' }]}
                        formik={formik}
                        label={'Hot'}
                        vertical={false}
                    />
                    <CmsFormikRadioGroup
                        name="ishome"
                        data={[{ id: 1, name: 'Có' }, { id: 0, name: 'Không' }]}
                        formik={formik}
                        label={'Home'}
                        vertical={false}
                    />
                    <CmsFormikRadioGroup
                        name="ishome"
                        data={[{ id: 1, name: 'Có' }, { id: 0, name: 'Không' }]}
                        formik={formik}
                        label={'FastSale'}
                        vertical={false}
                    />
                    <CmsFormikRadioGroup
                        name="isfreeship"
                        data={[{ id: 1, name: 'Có' }, { id: 0, name: 'Không' }]}
                        formik={formik}
                        label={'FreeShip'}
                        vertical={false}
                    />
                    <CmsFormikRadioGroup
                        name="ishs"
                        data={[{ id: 1, name: 'Có' }, { id: 0, name: 'Không' }]}
                        formik={formik}
                        label={'Home subscription'}
                        vertical={false}
                    />
                </div>
            </div>
        </FuseAnimateGroup>
    )
}
export default React.memo(BasicInfo)