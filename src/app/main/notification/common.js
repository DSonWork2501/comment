export const keyStore = "notify";
export function getTimeAgo(currentDate, receivedDate) {
    const timeDifference = currentDate - receivedDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
        return weeks === 1 ? '1 tuần trước' : `${weeks} tuần trước`;
    } else if (days > 0) {
        return days === 1 ? '1 ngày trước' : `${days} ngày trước`;
    } else if (hours > 0) {
        return hours === 1 ? '1 giờ trước' : `${hours} giờ trước`;
    } else if (minutes > 0) {
        return minutes === 1 ? '1 phút trước' : `${minutes} phút trước`;
    } else {
        return 'Vừa tạo';
    }
}

export const types = [
    {
        name: 'Tất cả',
        id: 1
    },
    {
        name: 'Đơn hàng',
        id: 2
    },
    {
        name: 'Khác',
        id: 3
    },
]