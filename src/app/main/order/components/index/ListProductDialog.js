import { Link } from '@material-ui/core';
import { CmsButton, CmsCheckbox, CmsDialog, CmsTableBasic } from '@widgets/components';
import { initColumn } from '@widgets/functions';
import React from 'react';
import noImage from '@widgets/images/noImage.jpg';
import { useState } from 'react';
import { useEffect } from 'react';


function ListProductDialog({ data, open, handleClose, loading, handleSave }) {
    const [selects, setSelects] = useState([]);
    const columns = [
        new initColumn({ field: "STT", label: "STT", style: { width: 50 }, sortable: false }),
        new initColumn({ field: "img", label: "Hình", sortable: false, alignHeader: "center", alignValue: "center" }),
        new initColumn({ field: "sku", label: "Wine sku/UniqueId", sortable: false, alignHeader: "center", alignValue: "center" }),
        new initColumn({ field: "name", label: "Tên", sortable: false, alignHeader: "center", alignValue: "center" }),
        new initColumn({ field: "option", label: "QrCode", sortable: false, alignHeader: "center", alignValue: "center" }),
        new initColumn({
            field: 'select',
            label: '',
            onSelectAllClick: () => {
                if (selects?.length) {
                    setSelects([]);
                    return;
                }

                let values = data.map(value => value.currentIndex);
                setSelects(values);
            },
            classCheckAll: 'w-full',
            classHeader: 'w-5',
            sortable: false,
            isSelectAllDisabled: false
        }),
    ], fields = data.map((value, index) => {
        return {
            STT: index + 1,
            ID: value.currentIndex,
            img: <img
                style={{ objectFit: 'contain', height: '90px', maxWidth: 150, margin: 'auto' }}
                src={`${process.env.REACT_APP_BASE_URL}api/product/img/${value?.img}`}
                alt={`imageforitem${index}`} />,
            sku: value.sku,
            name: value.name,
            option: (
                <>
                    <img alt={`qrcord_${index}`} width={100} src={value.qrcode ? `data:image/png;base64, ${value.qrcode}` : noImage} className="m-auto" />
                    {value.qrcode && <CmsButton variant="outlined" size="small" label="In" component={Link} onClick={() => handleDownload(value)} />}
                </>
            ),
            select: (
                <CmsCheckbox
                    key={`${index}_select`}
                    checked={selects?.length ? selects.includes(value.currentIndex) : false}
                    value={value.id}
                    onChange={e => {
                        let check = selects.includes(value.currentIndex);
                        // console.log(check);
                        check
                            ? setSelects(val => val.filter(e => e !== value.currentIndex))
                            : setSelects(val => [...val, value.currentIndex])
                    }}
                    name="select"
                />
            ),
        }
    });

    useEffect(() => {
        if (data?.length)
            setSelects(data.map(value => value.currentIndex))
    }, [data])

    const handleDownload = ({ qrcode, name, sku, qrcodenonhash }) => {
        var qrImage = new Image();

        qrImage.src = `data:image/png;base64, ${qrcode}`;

        qrImage.onload = function () {
            var printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(`<html>
                <head>
                <title>${name}</title>
                </head>
                <body style="display:flex;align-items:center;justify-content:center">
                    <div style="width:100%">
                        <H3 style="text-align:center">${name}</H3>
                        <H3 style="text-align:center">${sku}</H3>
                        <img style="width:100%;margin:auto" src="${qrImage.src}" alt="QR Code">
                        <H3 style="text-align:center">${qrcodenonhash}</H3>
                    </div>
                </body>
            </html>`);
            printWindow.document.close();

            printWindow.onload = function () {
                printWindow.print();
                setTimeout(function () {
        printWindow.close();
    }, 1000);
            };
        };
    }

    const handleDownloadAll = (data, selects) => {
        // console.log(data, selects, '123');
        let listQR = "";
        for (let index = 0; index < data?.length; index++) {
            const item = data[index];
            if (item.qrcode && selects.find(val => val === item.currentIndex)) {
                listQR = listQR + `<div style="width:100%;height:100%">
                        <H3 style="text-align:center">${item.name}</H3>
                        <H3 style="text-align:center">${item.sku}</H3>
                        <img style="width:100%;margin:auto" src="data:image/png;base64,${item.qrcode}" alt="QR Code">
                        <H3 style="text-align:center">${item.qrcodenonhash}</H3>
                    </div>`;
            }
        }
        var printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(`<html>
        <head>
        <title>QR Code List</title>
        <style>
            @media print {
                body {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;
                    height: 100%;
                }
                
                div {
                    page-break-inside: avoid;
                }
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
            printWindow.onafterprint = function () {
                printWindow.close();
            };
        };
    }

    return (
        <CmsDialog
            title="Danh sách rượu"
            handleClose={handleClose}
            isCloseDialogSubmit={false}
            open={open}
            size="lg"
            disableEscapeKeyDown
            disableBackdropClick
            handleSave={handleSave}
            btnTitle="Đã in xong"
        >
            <div className='my-8'>
                <div className="text-right pb-8">
                    {data.length > 0 && <CmsButton className="" variant="outlined" size="small" label="Print All Check" component={Link} onClick={() => handleDownloadAll(data, selects)} />}
                </div>
                <CmsTableBasic
                    data={fields}
                    columns={columns}
                    loading={loading}
                    isPagination={false}
                    isServerSide={true}
                    selectedList={selects}
                />
            </div>
        </CmsDialog>
    )
}

export default ListProductDialog