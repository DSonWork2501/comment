import React from 'react';
import { CmsDialog, CmsFormikAutocomplete, CmsFormikCheckbox, CmsFormikTextField } from '@widgets/components';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { generateQRCodeBase64 } from './PackageEdit';

const initialValues = {
    left: 0,
    top: 0,
    type: 1,
    isCode: 1,
    isSku: 1,
    isName: 0
}

const form = [
    {
        id: 1,
        name: 'Mẫu giấy cuộn 2 nhãn - Khổ 70x22mm',
        wCount: 2,
        width: 70,
        height: 22
    },
    {
        id: 2,
        name: 'Mẫu giấy cuộn 2 nhãn - Khổ 77x22mm',
        wCount: 2,
        width: 77,
        height: 22
    },
    {
        id: 3,
        name: 'Mẫu giấy cuộn 2 nhãn - Khổ 50x40mm',
        wCount: 2,
        width: 50,
        height: 40
    },
    {
        id: 4,
        name: 'Mẫu giấy cuộn 2 nhãn - Khổ 30x20mm',
        wCount: 2,
        width: 30,
        height: 20
    },
    {
        id: 5,
        name: 'Mẫu giấy cuộn 2 nhãn - Khổ 40x25mm',
        wCount: 2,
        width: 40,
        height: 25
    },
    {
        id: 6,
        name: 'Mẫu giấy cuộn 2 nhãn - Khổ 40x30mm',
        wCount: 2,
        width: 40,
        height: 30
    },
    {
        id: 7,
        name: 'Mẫu giấy cuộn 2 nhãn - Khổ 50x30mm',
        wCount: 2,
        width: 50,
        height: 30
    },
    {
        id: 8,
        name: 'Mẫu giấy cuộn 2 nhãn - Khổ 70x18mm',
        wCount: 2,
        width: 70,
        height: 18
    },
]

function PrintDialog({ detail, options, handleClose, handleSubmit, open, title = 'Thêm thuộc tính' }) {
    const handleSave = (values) => {
        if (formik && detail)
            if (detail.data?.length) {
                handleDownloadAll(detail);
            } else {
                handleDownload(detail);
            }
    }

    const formik = useFormik({
        initialValues,
        keepDirtyOnReinitialize: true,
        enableReinitialize: true,
        onSubmit: handleSave,
        validationSchema: Yup.object({
            type: Yup.number().nullable().required("Vui lòng chọn loại"),
        })
    })

    const { values } = formik, { type, left, top, isCode, isSku, isName } = values;

    const handleDownloadAll = async ({ data }) => {
        const valueType = form.find(val => val.id === type);
        let listQR = "";
        for (let index = 0; index < data?.length; index++) {
            const item = data[index];
            const src = await generateQRCodeBase64(item.qrcodenonhash, { margin: 0 })
            if (item.qrcodenonhash) {
                listQR = listQR + `
                    <div class="wrap">
                        <img src="data:image/png;base64,${src}" alt="QR Code">
                        ${Boolean(isCode + isSku + isName > 0)
                        ?
                        `<div style="width:calc(100% - 50px);padding:0 2.5px;text-align:left">
                            ${isCode === 1
                            ? `<div style="margin-top:4px">${item.qrcodenonhash}</div>`
                            : ''}
                                            ${isSku === 1
                            ? `<div style="margin-top:4px">${item.sku}</div> `
                            : ''}
                                            ${isName === 1
                            ? `<div style="margin-top:4px">${item.name}</div> `
                            : ''}
                            </div>`
                        : ''
                    }
                    </div>`;
            }
        }
        var printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(`<html>
        <head>
        <title>QR Code List</title>
        <style>
            @page {
                size: ${valueType?.width}mm ${valueType?.height}mm; /* Set the desired print size here */
                margin: 0;
            }
            body {
                display: flex;
                align-items:center;
                flex-wrap:wrap;
                page-break-after: always;
                margin: 0;
                width:${valueType?.width}mm;
                height:${valueType?.height}mm;
                font-size: 8px;
                font-weight: 600;
            }
            .wrap {
                width: ${100 / valueType?.wCount}%;
                text-align:center;
                margin-top: ${top}mm;
                margin-left: ${left}mm;
                over-follow:hidden;
                display:flex;
                justify-content:center;
                page-break-after: always;
            }
            img {
                width: 48px; /* Set the image width to 100% */
                height: 48px;
                margin: auto;
                margin-left:2px;
                display: block; /* This helps remove any extra space below the image */
            }
            @media print {
                /* Clear default header and footer */
                @page {
                    margin: 0;
                }
                body { margin: 0 }
            }
        </style>
        </head>
        <body>
            ${listQR}
        </body>
        </html>`);
        printWindow.document.close();

        printWindow.onload = function () {
            printWindow.print();
            setTimeout(() => {
                printWindow.close();
            }, 50);
            setTimeout(() => {
                if (printWindow.closed)
                    handleClose()
            }, 100);
        };


    }

    const handleDownload = async ({ qrcode, name, sku, qrcodenonhash }) => {
        const valueType = form.find(val => val.id === type);
        var qrImage = new Image();
        const src = await generateQRCodeBase64(qrcodenonhash, { margin: 0 })
        qrImage.src = `data:image/png;base64, ${src}`;

        qrImage.onload = function () {
            var printWindow = window.open('about:blank', '_blank');

            printWindow.document.open();
            printWindow.document.write(`<html>
                <head>
                <style>
                    @page {
                        size: ${valueType?.width}mm ${valueType?.height}mm; /* Set the desired print size here */
                        margin: 0;
                    }
                    body {
                        display: flex;
                        align-items:center;
                        page-break-after: always;
                        margin: 0;
                        width:${valueType?.width}mm;
                        height:${valueType?.height}mm;
                        font-size: 8px;
                        font-weight: 600;
                    }
                    .wrap {
                        width: ${100 / valueType?.wCount}%;
                        text-align:center;
                        margin-top: ${top}mm;
                        margin-left: ${left}mm;
                        over-follow:hidden;
                        display:flex;
                        justify-content:center;
                    }
                    img {
                        width: 48px; /* Set the image width to 100% */
                        height: 48px;
                        margin: auto;
                        display: block; /* This helps remove any extra space below the image */
                        margin-left:2px;
                    }
                    @media print {
                        /* Clear default header and footer */
                        @page {
                            margin: 0;
                        }
                        body { margin: 0 }
                    }
                </style>
                </head>
                <body>
                    <div class="wrap">
                        <img src="${qrImage.src}" alt="QR Code">
                        ${Boolean(isCode + isSku + isName > 0)
                    ?
                    `<div style="width:calc(100% - 50px);padding:0 2.5px;text-align:left">
                            ${isCode === 1
                        ? `<div style="margin-top:4px">${qrcodenonhash}</div>`
                        : ''}
                                            ${isSku === 1
                        ? `<div style="margin-top:4px">${sku}</div> `
                        : ''}
                                            ${isName === 1
                        ? `<div style="margin-top:4px">${name}</div> `
                        : ''}
                            </div>`
                    : ''
                }
                    </div>
                </body>
            </html>`);
            printWindow.document.close();

            printWindow.onload = function () {
                printWindow.print();
                setTimeout(() => {
                    printWindow.close();
                }, 50);
                setTimeout(() => {
                    if (printWindow.closed)
                        handleClose()
                }, 100);
            };
        };
    }


    return (
        <React.Fragment>
            <CmsDialog
                title={title}
                handleClose={handleClose}
                handleSave={formik.handleSubmit}
                isCloseDialogSubmit={false}
                open={open}
                btnTitle="In"
            >
                <div>
                    <CmsFormikCheckbox
                        formik={formik}
                        name="isCode"
                        label='Hiển thị chuổi qrcode'
                    />
                </div>
                <div>
                    <CmsFormikCheckbox
                        formik={formik}
                        name="isSku"
                        label='Hiển thị mã sp(sku)'
                    />
                </div>
                <div>
                    <CmsFormikCheckbox
                        formik={formik}
                        name="isName"
                        label='Hiển thị tên sp'
                    />
                </div>
                <div className='flex -mx-8'>
                    <div className='w-1/2 px-8'>
                        <CmsFormikTextField
                            label="Lề trái(mm)"
                            name="left"
                            className="my-8"
                            size="small"
                            formik={formik} />
                    </div>
                    <div className='w-1/2 px-8'>
                        <CmsFormikTextField
                            label="Lề trên(mm)"
                            name="top"
                            className="my-8"
                            size="small"
                            formik={formik} />
                    </div>
                </div>
                <CmsFormikAutocomplete
                    className="mt-8"
                    name={`type`}
                    formik={formik}
                    label="Mẫu giấy"
                    setOption={(option) => option.name}
                    autocompleteProps={{
                        getOptionLabel: (option) => option.name,
                        size: 'small'
                    }}
                    data={form}
                    valueIsId
                />
            </CmsDialog>
        </React.Fragment>
    )
}

export default React.memo(PrintDialog);