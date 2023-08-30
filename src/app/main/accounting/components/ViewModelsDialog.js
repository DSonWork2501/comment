import { TableCell, TableRow } from '@material-ui/core';
import { CmsDialog, CmsTableBasic } from '@widgets/components';
import { initColumn } from '@widgets/functions';
import React from 'react';

function ViewModelsDialog({ detail, open, handleClose,title}) {

    const columns = [
        new initColumn({ field: "STT", label: "STT", style: { width: 50 }, sortable: false }),
        new initColumn({ field: "orderid", label: "Order ID", sortable: false, style: { width: 150 }, alignHeader: "center", alignValue: "center" }),
        new initColumn({ field: "type", label: "Loại", sortable: false, style: { width: 150 }, alignHeader: "center", alignValue: "center" }),
        new initColumn({ field: "incomevalue", label: "Tổng tiền", sortable: false, style: { width: 150 }, alignHeader: "right", alignValue: "right" }),
    ];
    const fields = JSON.parse(detail.incomes).map((value, index) => {
        return {
            STT: index + 1,
            orderid: value.orderid,
            type: value.type === 1 ? 'Tiền Mặt' : 'Chuyển Khoản',
            incomevalue: value?.incomevalue ? value.incomevalue.toLocaleString('en-US') : '0'
        }
    });

    return (
        <CmsDialog
            title={title}
            handleClose={handleClose}
            isCloseDialogSubmit={false}
            open={open}
            size="lg"
        >
            <div className='my-8'>
                <CmsTableBasic
                    data={fields}
                    columns={columns}
                    isPagination={false}
                    isServerSide={true}
                    moreFooter={
                        <TableRow>
                            <TableCell
                                colSpan={3}
                                style={{ borderRight: '1px solid #ddd' }}
                                className="text-center p-8"
                            >
                                <b>
                                    Tổng tiền
                                </b>
                            </TableCell>
                            <TableCell
                                style={{ borderRight: '1px solid #ddd' }}
                                className="text-right p-8 text-green"
                            >
                                {detail?.incomevalue ? detail.incomevalue.toLocaleString('en-US') : '0'}
                            </TableCell>
                        </TableRow>
                    }
                />
            </div>
        </CmsDialog>
    )
}

export default ViewModelsDialog