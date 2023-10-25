import { Link } from '@material-ui/core';
import { CmsButton, CmsCheckbox, CmsDialog, CmsTableBasic } from '@widgets/components';
import { initColumn } from '@widgets/functions';
import React from 'react';
import noImage from '@widgets/images/noImage.jpg';
import { useState } from 'react';
import { useEffect } from 'react';
import PrintDialog from './PrintDialog';


function ListProductDialog({ data, open, handleClose, loading, handleSave }) {
    const [selects, setSelects] = useState([]);
    const [openDialog, setOpenDialog] = useState('');
    const [detail, setDetail] = useState(null);

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
                    {value.qrcode && <CmsButton variant="outlined" size="small" label="In" component={Link} onClick={() => {
                        setDetail(value);
                        setOpenDialog('print');
                    }} />}
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

    useEffect(() => {
        if (openDialog === '')
            setDetail(null)
    }, [openDialog])
 
    const handleCloseDialog = () => {
        setOpenDialog('');
    }

    return (
        <>
            {
                openDialog === 'print'
                &&
                <PrintDialog
                    title='Cấu hình in'
                    detail={detail}
                    open
                    handleClose={handleCloseDialog}
                />
            }

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
                        {data.length > 0 && <CmsButton className="" variant="outlined" size="small" label="Print All Check" component={Link} onClick={() => {
                            console.log(data.filter(val => selects.includes(va => va === val.currentIndex)), selects, data);
                            setDetail({ data: data.filter(val => selects.includes(val.currentIndex)) });
                            setOpenDialog('print');
                        }} />}
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
        </>
    )
}

export default ListProductDialog