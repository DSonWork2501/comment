import { LabelInfo } from "@widgets/components/common/LabelInfo"
import React from "react"
import noImage from '@widgets/images/noImage.jpg';
import { CmsButton, CmsCheckbox, CmsLabel } from "@widgets/components";
import { Link } from "@material-ui/core";
export const baseurl = `${process.env.REACT_APP_API_BASE_URL}/product/img/`

const InfoProductDetail = React.memo(({ data, index, handleViewList, handleCheck }) => {
    const { uniqueid, sku, img, name, ispacked, qrcode } = data || {}
    const image = img ? `${baseurl}${img}` : noImage

    const handleDownload = ({ qrcode, name, uniqueid }) => {
        // var a = document.createElement("a"); //Create <a>
        // a.href = `data:image/png;base64, ${qrcode}`; //Image Base64 Goes here
        // a.download = `${name}_${uniqueid?.replace('.', '_')}.png`; //File name Here
        // a.click(); //Downloaded file
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
                        <img style="width:100%;margin:auto" src="${qrImage.src}" alt="QR Code">
                    </div>
                </body>
            </html>`);
            printWindow.document.close();

            printWindow.onload = function () {
                printWindow.print();
                printWindow.onafterprint = function () {
                    printWindow.close();
                };
            };
        };
    }

    return (
        !uniqueid ?
            <div className="w-full flex flex-col justify-items-center items-center">
                <CmsLabel className="text-center" content={'Chưa chọn sản phẩm'} />
                <CmsButton label="đi đến danh sách sản phẩm" className="text-center" onClick={() => handleViewList()} />
            </div>
            :
            <div key={`InfoProductDetail_${index}_div_0`} className="h-full w-full flex flex-row space-x-16">
                <div>
                    <img key={`InfoProductDetail_${index}_div_img`} src={image} alt="image_detail" className="h-92 min-w-52" />
                </div>
                <div className="w-full self-center space-y-16">
                    <LabelInfo label={{ content: 'tên', className: 'min-w-min' }} info={{ content: name || '-' }} />
                    <LabelInfo label={{ content: 'uniqueid', className: 'min-w-min' }} info={{ content: uniqueid || '-' }} />
                    <LabelInfo label={{ content: 'sku', className: 'min-w-min' }} info={{ content: sku || '-' }} />
                </div>
                {
                    handleCheck
                    &&
                    <>
                        <div style={{ width: 200 }}>
                            <CmsCheckbox
                                key={`box`}
                                checked={Boolean(ispacked)}
                                value={false}
                                onChange={(e) => {
                                    handleCheck(e.target.checked, data)
                                }}
                                label="Đóng gói"
                                name="status"
                            />
                            {qrcode && <CmsButton variant="outlined" size="small" label="In Qrcode" component={Link} onClick={() => handleDownload(data)} />}
                        </div>
                    </>

                }
            </div>
    )
})
export default React.memo(InfoProductDetail) 