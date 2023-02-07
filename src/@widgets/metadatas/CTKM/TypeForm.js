


export const TypeForm = {
    khuyenmai: {id: 1, name: 'Thông tin khuyến mãi', blockType: 'html', slug: 'khuyenmai', type: 'khuyenmai', buttons: '', url: '/thong-tin/khuyenmai'},
    'goi-vip': {id: 2, name: 'Gói vip', type: 'package', slug: 'goi-vip', url: '/mua-goi/goi-vip', buttons: [{id: 1, name: 'Mua ngay gói VIP', url: '/dich-vu/vip?showList=true'},{id: 2, name: 'Xem ngay', url: '/dich-vu/vip?showList=true'}]},
    'goi-vip-ios': {id: 3, name: 'Gói vip-ios', type: 'package', slug: 'goi-vip-ios', url: '/mua-goi/goi-vip-ios', buttons: [{id: 1, name: 'Mua ngay gói VIP', url: '/dich-vu/vip?showList=true'},{id: 2, name: 'Xem ngay', url: '/dich-vu/vip?showList=true'}]},
    'goi-kplus': {id: 4, name: 'Gói kplus', type: 'package', slug: 'goi-kplus', url: '/mua-goi/goi-kplus', buttons: [{id: 1, name: 'Mua ngay gói Kplus', url: '/dich-vu/vip?showList=true'},{id: 2, name: 'Xem ngay', url: '/dich-vu/vip?showList=true'}]},
    'goi-kplus-ios': {id: 5, name: 'Gói kplus-ios', type: 'package', slug: 'goi-kplus-ios', url: '/mua-goi/goi-kplus-ios', buttons: [{id: 1, name: 'Mua ngay gói Kplus', url: '/dich-vu/vip?showList=true'},{id: 2, name: 'Xem ngay', url: '/dich-vu/vip?showList=true'}]},
    'goi-vipsport': {id: 6, name: 'Gói vip-sport', type: 'package', slug: 'goi-vipsport', url: '/mua-goi/goi-vipsport', buttons: [{id: 1, name: 'Mua ngay gói Vip Sport', url: '/dich-vu/vip?showList=true'},{id: 2, name: 'Xem ngay', url: '/dich-vu/vip?showList=true'}]},
    'goi-vipsport-ios': {id: 7, name: 'Gói vip-sport-ios', type: 'package', url: '/mua-goi/goi-vipsport-ios', slug: 'goi-vipsport-ios', buttons: [{id: 1, name: 'Mua ngay gói Vip Sport', url: '/dich-vu/vip?showList=true'},{id: 2, name: 'Xem ngay', url: '/dich-vu/vip?showList=true'}]},
    max: {id: 8, name: 'Gói max', type: 'package', slug: 'max', url: '/mua-goi/max', buttons: [{id: 1, name: 'Mua ngay gói Max', url: '/dich-vu/vip?showList=true'},{id: 2, name: 'Xem ngay', url: '/dich-vu/vip?showList=true'}]},
    'max-ios': {id: 8, name: 'Gói max-ios', type: 'package', slug: 'max-ios', url: '/mua-goi/max-ios', buttons: [{id: 1, name: 'Mua ngay gói Vip Sport', url: '/dich-vu/vip?showList=true'},{id: 2, name: 'Xem ngay', url: '/dich-vu/vip?showList=true'}]},
    sport: {id: 9, name: 'Gói sport', type: 'package', slug: 'sport', url: '/mua-goi/sport', buttons: [{id: 1, name: 'Mua ngay gói Sport', url: '/dich-vu/vip?showList=true'},{id: 2, name: 'Xem ngay', url: '/dich-vu/vip?showList=true'}]},
    'sport-ios': {id: 10, name: 'Gói sport-ios', type: 'package', slug: 'sport-ios', url: '/mua-goi/sport-ios', buttons: [{id: 1, name: 'Mua ngay gói Vip Sport', url: '/dich-vu/vip?showList=true'},{id: 2, name: 'Xem ngay', url: '/dich-vu/vip?showList=true'}]},
    'mua-goi-sms': {id: 11, name: 'goi-sms', blockType: 'slide', type: 'slide', slug: 'mua-goi-sms', url: '/thanh-toan/mua-goi-sms'}
}
export const TypeFormDetail = (entity) => ({
    khuyenmai: {id: 'khuyenmai', name: 'Trang khuyến mãi'},
    goi: {id: 'goi', name: 'Gói dịch vụ', url: `/mua-goi/${entity.slugName}`, buttons: [{id: 1, name: `${entity.button_text_buy_now}`, url: `${entity.button_link_buy_now}`},{id: 2, name: `${entity.button_text_watch_now}`, url: `${entity.button_link_watch_now}`}]},
    sms: {id: 'sms', name: 'Slider'}
})

export const PageStyle = {
    khuyenmai: {id: 'khuyenmai', name: 'Trang khuyến mãi', blockType: 'html', type:'khuyenmai', url: '/thong-tin/'},
    goi: {id: 'goi', name: 'Gói dịch vụ', blockType: 'html', type:'package', url: '/mua-goi/'},
    sms: {id: 'sms', name: 'slider', blockType: 'slide', type: 'slide', url: '/thanh-toan/'},
    // bongda: {id: 'bongda', name: 'bongda', blockType: 'bongda', type: 'bongda', url: '/bong-da/'}
}