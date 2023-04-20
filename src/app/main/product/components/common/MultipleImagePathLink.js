import Connect from "@connect";
import { CmsBoxLine, CmsFormikUploadMultipleImage } from "@widgets/components"
import { showMessage } from "app/store/fuse/messageSlice";
import React, { } from "react"
import { useDispatch } from "react-redux";
export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

function MutipleImagePathLink({ formik, CheckError }) {
    const dispatch = useDispatch()
    const HandleAddImage = async (files) => {
        var result = []
        var error = []
        if (files.length > 0) {
            let findDuplicates = arr => Array.isArray(arr) && arr.length > 0 ? arr.filter((item, index) => arr.indexOf(item) !== index): []
            var dupImages = findDuplicates([...[...files].map(x => (`${formik?.values?.sku}/${x?.name}`)), ...formik?.values?.images || []])
            if (dupImages?.length > 0) {
                dispatch(showMessage({ variant: "error", message: `Tên hình đã tồn tại: ${dupImages.join(',')} !` }))
                return false
            }
            for (let i = 0; i < files.length; i++) {
                const item = files[i];
                let filesForm = new FormData();
                filesForm.append('files', item);
                filesForm.append('sku', formik?.values?.sku);
                var response = await Connect.live.product.uploadImage(filesForm);
                if (response?.data?.result === true) {
                    result = [...result, `${formik?.values?.sku}/${item?.name}`]
                } else {
                    error = [...error, `${formik?.values?.sku}/${item?.name}`]
                }
            }
            result?.length > 0 && formik.setFieldValue('images', [...formik?.values?.images || [], ...result])
        }
    }

    return (
        <CmsBoxLine label={'Danh sách hình chi tiết'}>
            <CmsFormikUploadMultipleImage
                label="Slider"
                formik={formik}
                onChange={HandleAddImage}
                name="images"
                domain={baseurl}
                CheckError={CheckError}
            />
        </CmsBoxLine>
    )
}

// function MutipleImagePathLink({ images, setImage }) {
//     const [array, setArray] = useState([])

//     useEffect(() => {
//         setArray(images?.map(x => ({ link: x })) || [])
//     }, [images])

//     const formik = useFormik({
//         initialValues: array,
//         keepDirtyOnReinitialize: true,
//         enableReinitialize: true,
//         // onSubmit: handleSaveData
//     })

//     const HandleAddImage = () => {
//         formik.setValues([...formik.values, { link: '' }])
//     }
//     const handleDelete = (index_item) => {
//         formik.setValues([...formik.values.filter((x, index) => index !== index_item)])
//     }

//     // console.log('formik', formik.values)

//     const data = [...formik.values?.map((x, index) => ({
//         stt: index + 1,
//         link: <CmsFormikTextField size="small" key={`path_key_${index}`} label="Image" formik={formik} name={`[${index}].link`} />,
//         image: <img key={`image_key_${index}`} alt={`image_alt_${index}`} src={`${baseurl}${formik.values[index].link}` || noImage} className="max-h-32 max-w-32" />,
//         thaotac: <CmsIconButton tooltip={"Xóa"} icon="close" onClick={() => handleDelete(index)} className="text-red" />
//     }))] || []

//     return (
//         <div className="space-y-8">
//             <CmsTableBasic
//                 columns={columns}
//                 data={data}
//                 isPagination={false}
//             />
//             <div className="w-full text-center m-0">
//                 <CmsButton label="Thêm mới" className="bg-yellow-700 hover:bg-yellow-900" onClick={() => HandleAddImage()} />
//             </div>
//         </div>
//     )
// }
export default MutipleImagePathLink