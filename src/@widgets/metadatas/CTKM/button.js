export const Buttons = {
    'mua-goi': {id: 6, name: 'Mua gói', url: '/mua-goi'},
    'goi-vip': {id: 1, name: 'Mua ngay Gói VIP', url: '/dich-vu/vip?showList=true'},
    'max': {id: 2, name: 'Mua ngay Gói MAX', url: '/dich-vu/max?showList=true'},
    'goi-kplus': {id: 3, name: 'Mua ngay Gói K+', url: '/dich-vu/kplus?showList=true'},
    'sport': {id: 5, name: 'Mua ngay Gói SPORT', url: '/dich-vu/sport?showList=true'},
    'MAX-XMAS': {id: 7, name: 'Mua ngay Gói MAX-XMAS', url: '/dich-vu/max-xmas?showList=true'},
    'VIP-XMAS': {id: 8, name: 'Mua ngay Gói VIP-XMAS', url: '/dich-vu/vip-xmas?showList=true'},
}
export const showNowButton = (url)=> {
    return {id: 11, name: 'Xem Ngay', url: url}
}