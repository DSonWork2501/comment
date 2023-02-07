import { colors } from '@material-ui/core';
import { CmsAlert } from '@widgets/components';

export const alertInformation = ({ text = "", icon = "question", data, confirm, close, ...props }) => {
    try {
        CmsAlert.fire({
            heightAuto: false,
            text,
            icon,
            showCancelButton: true,
            confirmButtonColor: colors.green[500],
            cancelButtonColor: colors.red[500],
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
            ...props
        }).then(result => {
            if (result.isConfirmed) {
                confirm(data);
            } else {
                close && close(data);
            }
        })
    } catch (error) {
        console.error(error)
    }
}
