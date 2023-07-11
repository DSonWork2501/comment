import { CmsDialog, CmsFormikAutocomplete, CmsFormikSelect, CmsFormikTextField, CmsIconButton, CmsTinyMceEditor } from "@widgets/components"
import { FieldArray, FormikProvider, useFormik } from "formik"
import React from "react"
import { ContractType } from 'app/main/contract/model/type'
import * as Yup from 'yup'
import { useDispatch } from "react-redux"
import { editContract } from "app/main/contract/store/contractSlice"
import CmsFormikUploadFile from "@widgets/components/cms-formik/CmsFormikUploadFile"
import JSZip from 'jszip';
import { get, uniqBy } from 'lodash';
import { Box, Button, FormHelperText, InputLabel, styled } from "@material-ui/core"
import { GetApp } from "@material-ui/icons"
import Connect, { baseurl } from "@connect/@connect"
import { useState } from "react"

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
            arrayForm: [],
            "file": ''
        }
    }
}

function getFileExtension(filename) {
    const parts = filename.split('.');
    return parts[parts.length - 1];
}

function EditDialogComponent({ open, handleClose, item = null }) {
    const dispatch = useDispatch()
    const [iframeKey, setIframeKey] = useState(0);
    const [fileSelect, setFileSelect] = useState(null);
    const [linkHd, setLinkHd] = useState(null);

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
            file:Yup.string().required("Vui lòng nhập file !")
        })
    })

    const { setErrors, errors, touched, setFieldTouched, setFieldValue, values } = formik, { arrayForm } = values;

    const handleRefresh = () => {
        const file = fileSelect;
        if (file?.length) {
            const data = new FormData();

            data.append('enpoint', 'tempfile');
            handleReadFile(file[0], async (file) => {
                try {
                    const fileName = 'fileTemp.docx';
                    const fileWithMetadata = new Blob([file], { type: file.type });
                    fileWithMetadata.name = fileName;
                    data.append('files', fileWithMetadata, fileName);
                    const result = await Connect.live.uploadFile.insert(data);
                    setIframeKey(prevKey => prevKey + 1)
                } catch (error) { console.log(error); }
                finally {
                }
            }, arrayForm);
        }
    }

    async function upLoadFile(file, { setLoading, resetFile, form }) {
        setFileSelect(file)
        if (file?.length) {
            const data = new FormData();
            const filename = file[0].name;
            const extension = getFileExtension(filename);

            if (extension !== "docx") {
                setErrors(
                    { ...errors, file: "Vui lòng chọn file .docx" }
                )
                if (!touched?.file)
                    setFieldTouched('files', true);
                return;
            }


            data.append('enpoint', 'tempfile');
            setFieldValue('arrayForm', []);
            handleReadFile(file[0], async (file) => {
                setLoading(true);
                formik.setSubmitting(true);

                try {
                    const name = 'fileTemp.docx';
                    const fileWithMetadata = new Blob([file], { type: file.type });
                    fileWithMetadata.name = name;
                    data.append('files', fileWithMetadata, name);
                    await Connect.live.uploadFile.insert(data);
                    setLinkHd('open')
                    setIframeKey(prevKey => prevKey + 1)
                    ////
                    const data2 = new FormData();
                    data2.append('enpoint', 'contract');
                    const name2 = Date.now() + '.docx';
                    const fileWithMetadata2 = new Blob([file], { type: file.type });
                    fileWithMetadata2.name = name2;
                    console.log(fileWithMetadata2);
                    data2.append('files', fileWithMetadata2, name2);
                    await Connect.live.uploadFile.insert(data2);
                    formik.setFieldValue('files', name2);
                } catch (error) { console.log(error); }
                finally {
                    setLoading(false);
                    formik.setSubmitting(false);
                }
            });
        }
    }

    const handleReadFile = async (file, handleFile, mapFile) => {
        try {
            const content = await file.arrayBuffer();

            const zip = await JSZip.loadAsync(content);

            //const checkHead = await checkHeadQrCode(zip);
            // if (!checkHead) {
            //     formik.setFieldValue('isHaveQr', null);
            // } else {
            //     formik.setFieldValue('isHaveQr', 1);
            // }

            // Lấy tệp word/document.xml
            const documentXml = await zip.file('word/document.xml').async('string');

            const regex = /\[.*?{(.*?)\}.*?\]/g;
            const matches = documentXml.match(regex);


            let updatedXml = documentXml;
            matches.forEach(element => {
                updatedXml = updatedXml.replaceAll(element, element.replace(/<\/?[^>]+>/g, ''));
            });

            mapFile?.length && mapFile.forEach(element => {
                console.log(element);
                if (element.content)
                    updatedXml = updatedXml.replaceAll(element.keyWord, element.content);
            });


            const reMatch = updatedXml.match(regex);
            const dataKey = mapFile || uniqBy(reMatch.map((val, index) => ({
                keyWord: val,
                content: "",
            })), 'keyWord')

            zip.file('word/document.xml', updatedXml);


            const updatedContent = await zip.generateAsync({ type: 'arraybuffer' });

            handleFile(new Blob([updatedContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }))

            console.log(URL.createObjectURL(new Blob([updatedContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })));

            setFieldValue('arrayForm', dataKey)
        } catch (error) {

        }
    }

    const selectedFile = async (filePath) => {
        // const file = await Connect.live.upload.getFileS3({ documentName: filePath });
        // const url = window.URL.createObjectURL(new Blob([file.data]));
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', file.config.params.documentName.split('/').pop()); //or any other extension
        // document.body.appendChild(link);
        // link.click();
        // link.remove();
    }

    return (
        <CmsDialog
            open={open}
            title={item === null ? 'Thêm mới hợp đồng' : 'Cập nhật hợp đồng'}
            handleClose={handleClose}
            handleSave={formik.handleSubmit}
            isCloseDialogSubmit={false}
            size="xl"

        >
            <div className="w-full ">
                {/* <div className="flex justify-between">
                    <div style={{ width: '49%' }}>

                    </div>
                    <div style={{ width: '49%' }}>


                    </div>
                </div> */}
                <div className="flex justify-between">
                    <div style={{ width: '49%' }}>
                        <BoxCustom
                            className="p-16 py-20 mt-25 border-1 rounded-4 black-label">
                            <InputLabel
                                className='custom-label'>
                                Thông tin hợp đồng
                            </InputLabel>
                            <div className="py-4">
                                <CmsFormikTextField
                                    formik={formik}
                                    label="Tiêu đề"
                                    size="small"
                                    name="title" />
                            </div>

                            {/* <div className="py-4">
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
                        <div className="py-4">
                            <CmsFormikAutocomplete
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
                        </div>
                        <div className="py-4">
                            <CmsFormikSelect
                                data={Object.values(ContractType)}
                                formik={formik}
                                size="small"
                                label="Loại"
                                name="type"
                            />
                        </div> */}
                            <div>
                                <CmsFormikUploadFile
                                    className="my-8"
                                    id="uploadfile"
                                    name="fileInput"
                                    fileProperties={
                                        { accept: ".doc, .docx, .xls, .xlsx" }
                                    }
                                    setValue={upLoadFile}
                                    formik={formik}
                                    showFileName={false} />
                                {
                                    formik && get(formik?.touched, 'files') && Boolean(get(formik?.errors, 'files'))
                                    &&
                                    <FormHelperText
                                        style={{
                                            color: '#f44336'
                                        }}
                                        className='mx-16'
                                    >
                                        {get(formik.errors, 'files')}
                                    </FormHelperText>

                                }
                                {
                                    formik.values['files']
                                    &&
                                    <Button
                                        startIcon={<GetApp color='primary' />}
                                        style={{
                                            textTransform: 'none'
                                        }}
                                        onClick={() => selectedFile(formik.values['files'])}
                                    >
                                        {formik.values['files'].split('/').pop()}
                                    </Button>
                                }
                                <div>
                                    {
                                        formik && get(formik?.touched, 'files') && Boolean(get(formik?.errors, 'files'))
                                        &&
                                        <FormHelperText
                                            style={{
                                                color: '#f44336'
                                            }}
                                            className='opacity-0'
                                        >
                                            {get(formik.errors, 'files')}
                                        </FormHelperText>
                                    }
                                </div>
                            </div>
                        </BoxCustom>

                        {
                            false
                            &&
                            <div >
                                <BoxCustom
                                    className="p-16 py-20 mt-25 border-1 rounded-4 black-label">
                                    <InputLabel
                                        className='custom-label'>
                                        Thông tin file biểu mẫu
                                    </InputLabel>
                                    <FormikProvider value={formik}>
                                        <FieldArray
                                            name="arrayForm"
                                            render={({ insert, remove, push }) => (
                                                <div className='-mt-10'>
                                                    {formik.values.arrayForm.length > 0 ?
                                                        formik.values.arrayForm.map((friend, index) => (
                                                            <div key={index}>
                                                                <div className='flex  justify-between items-center relative '>
                                                                    <div className='flex flex-wrap  w-full -mx-8'>
                                                                        <div className='w-full md:w-1/2 px-8 pt-8'>
                                                                            <CmsFormikTextField
                                                                                label="Key"
                                                                                name={`arrayForm[${index}].keyWord`}
                                                                                size="small"
                                                                                className="mt-8"
                                                                                disabled
                                                                                formik={formik} />
                                                                        </div>
                                                                        <div className='w-full md:w-1/2 px-8 pt-8'>
                                                                            <CmsFormikTextField
                                                                                label="Nội dung"
                                                                                name={`arrayForm[${index}].content`}
                                                                                size="small"
                                                                                className="mt-8"
                                                                                formik={formik} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {
                                                                    formik.values.arrayForm.length - 1 !== index
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
                                                        )) : <div className="pt-8 text-red-500">Vui lòng upload file!</div>}
                                                </div>
                                            )}
                                        />
                                    </FormikProvider>


                                </BoxCustom>
                            </div>
                        }
                    </div>
                    <div style={{ width: '49%' }}>

                        <BoxCustom
                            className="p-16 py-20 mt-25 border-1 rounded-4 black-label">
                            <InputLabel
                                className='custom-label'>
                                Hợp đồng
                            </InputLabel>
                            {
                                linkHd
                                    ?
                                    <div>
                                        <div className="relative">
                                            <div className="absolute top-12 right-24">
                                                <CmsIconButton
                                                    tooltip="Làm mới"
                                                    delay={50}
                                                    icon="refresh"
                                                    className="bg-blue-500 text-white shadow-3  hover:bg-blue-900"
                                                    onClick={handleRefresh} />
                                            </div>

                                            <iframe
                                                key={iframeKey}
                                                width={'100%'}
                                                height={1000}
                                                src={`https://view.officeapps.live.com/op/embed.aspx?src=` + baseurl + `/common/files/fileTemp.docx?version=${Date.now()}`}
                                            />
                                        </div>
                                    </div>
                                    : <div className="pt-8 text-red-500">Vui lòng upload file để xem!</div>
                            }
                        </BoxCustom>
                    </div>
                </div>

                {/* <div className="py-4">
                    <CmsTinyMceEditor
                        value={formik.values['content']}
                        onChange={(event) => { formik.setFieldValue('content', event.target.getContent()) }} />
                </div> */}

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