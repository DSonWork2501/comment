import FuseAnimateGroup from "@fuse/core/FuseAnimateGroup"
import { CmsFormikRadioGroup, CmsFormikTextField } from "@widgets/components"
import React from "react"
import MutipleImagePathLink from "../../common.js/MultipleImagePathLink"
import noImage from '@widgets/images/noImage.jpg';

function BasicInfo({ formik, SaveData,  }) {

    const { images } = formik?.values

    console.log('formik', formik)

    return (
        <FuseAnimateGroup className="flex flex-wrap p-20 overflow-hidden w-full h-full" enter={{ animation: 'transition.slideUpBigIn' }}>
            <div className="w-full space-y-16">
                <CmsFormikTextField size="small" formik={formik} name="product.produname" label="Tên sản phẩm" />
                <CmsFormikTextField size="small" formik={formik} name="product.shortname" label="Tên ngắn" />
                <CmsFormikTextField size="small" formik={formik} name="product.barcode" label="Barcode" />
                <CmsFormikTextField size="small" formik={formik} name="product.sku" label="SKU" />
                <CmsFormikTextField size="small" formik={formik} name="product.brand" label="brand" />
                <CmsFormikTextField size="small" multiline={true} formik={formik} name="products.description" label="Mô tả" />
                <CmsFormikTextField size="small" formik={formik} name="products.unit" label="đơn vị" />
                <CmsFormikTextField size="small" formik={formik} name="product.classify" label="classify" />
                <CmsFormikTextField size="small" formik={formik} name="product.certification" label="certification" />
                <CmsFormikTextField size="small" formik={formik} name="product.suggest" label="Gợi ý" />
                <CmsFormikTextField size="small" formik={formik} name="product.note" label="Ghi chú" />
                <div key="div_0" className="flex flex-row items-center space-x-8">
                    <CmsFormikTextField key={`path_key_0`} label="Image" formik={formik} name="product.image" />
                    <img key={`image_key_0`} alt={`image_alt_0`} src={formik?.values?.image || noImage} className="max-h-32 max-w-32" />
                </div>
                <MutipleImagePathLink images={images} setImage={(value) => formik.setFieldValue('product.images', value)} />
                <div className="flex flex-row w-full space-x-8 justify-between">
                    <CmsFormikRadioGroup
                        name="product.isnew"
                        data={[{ id: 1, name: 'Có' }, { id: 0, name: 'Không' }]}
                        formik={formik}
                        label={'New'}
                        vertical={false}
                    />
                    <CmsFormikRadioGroup
                        name="product.ishot"
                        data={[{ id: 1, name: 'Có' }, { id: 0, name: 'Không' }]}
                        formik={formik}
                        label={'Hot'}
                        vertical={false}
                    />
                    <CmsFormikRadioGroup
                        name="product.ishome"
                        data={[{ id: 1, name: 'Có' }, { id: 0, name: 'Không' }]}
                        formik={formik}
                        label={'Home'}
                        vertical={false}
                    />
                    <CmsFormikRadioGroup
                        name="product.ishome"
                        data={[{ id: 1, name: 'Có' }, { id: 0, name: 'Không' }]}
                        formik={formik}
                        label={'FastSale'}
                        vertical={false}
                    />
                    <CmsFormikRadioGroup
                        name="product.isfreeship"
                        data={[{ id: 1, name: 'Có' }, { id: 0, name: 'Không' }]}
                        formik={formik}
                        label={'FreeShip'}
                        vertical={false}
                    />
                </div>
            </div>
        </FuseAnimateGroup>
    )
}
export default React.memo(BasicInfo)