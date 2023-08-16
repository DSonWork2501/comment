import axios from 'axios'
export const baseurl = process.env.REACT_APP_API_BASE_URL

export default {
    mock: {

    },
    live: {
        identity: {
            /**
             * @description login
             */
            login: (email, password, fastlg, otp) => axios.post(`${baseurl}/identity/login`, { email, password, fastlg, otp },
            ),
            /**
             * 
             * @@description logout
             */
            logout: () => axios.post(`${baseurl}/identity/logOut`),
            /**
             * @description refreshToken
             */
            refreshToken: (token, refreshToken) => axios.post(`${baseurl}/identity/refresh-login`, { token, refreshToken }),
        },
        product: {
            /**
             * @description sản phẩm
             * Search : từ khóa tìm kiếm
                Cate : (không bắt buộc) lọc theo thể loại
                Brand : (không bắt buộc) lọc theo nhãn hiệu
                FromPrice : (không bắt buộc) lọc theo khoảng giá
                ToPrice : (không bắt buộc) lọc theo khoảng giá
                Certification : (không bắt buộc) lọc theo chứng chỉ
                PageNumber : phân trang - vị trí
                RowsPage : phân trang - số trang
             */
            getList: params => axios.get(`${baseurl}/product/get-product`, { params }),
            // bảng màu
            getColor: params => axios.get(`${baseurl}/product/get-color`, { params }),
            // kích thước
            getSize: params => axios.get(`${baseurl}/product/get-size`, { params }),
            getDetail: params => axios.get(`${baseurl}/product/get-product-detail`, { params }),
            insert: entity => axios.post(`${baseurl}/product/insert-product`, entity),
            update: entity => axios.put(`${baseurl}/product/update-product`, entity),
            delete: entity => axios.put(`${baseurl}/product/delete-product`, entity),
            uploadImage: (entity) => axios.post(`${baseurl}/product/upload-image`, entity, { headers: { 'Content-Type': 'multipart/form-data' } }),
            getHistoryPrice: params => axios.get(`${baseurl}/product/get-history-price`, { params }),
            price: {
                insert: entity => axios.post(`${baseurl}/product/insert-price`, entity),
            },
            filter: {
                get: params => axios.get(`${baseurl}/product/get-filter`, { params }),
            },
            other: {
                addProductCate: entity => axios.post(`${baseurl}/product/insert-cate-product`, entity),
                removeProductCate: entity => axios.put(`${baseurl}/product/update-cate-product`, entity),
                wineArrange: entity => axios.put(`${baseurl}/customer/wine-arrange`, entity),
                removeProperties: entity => axios.put(`${baseurl}/product/delete-product`, entity),
            }
        },
        category: {
            getList: params => axios.get(`${baseurl}/product/get-category`, { params }),
            insert: entity => axios.post(`${baseurl}/product/insert-category`, entity),
            update: entity => axios.put(`${baseurl}/product/update-category`, entity),
            changeStatus: entity => axios.put(`${baseurl}/product/delete-category`, entity),
            uploadImage: (entity) => axios.post(`${baseurl}/product/upload-image-cate`, entity, { headers: { 'Content-Type': 'multipart/form-data' } }),
            updateStatus: entity => axios.put(`${baseurl}/product/delete-category`, entity),
        },
        account: {
            getList: params => axios.get(`${baseurl}/customer/get-account`, { params }),
        },
        customer: {
            other: {
                reOrder: entity => axios.post(`${baseurl}/order/re-order`, entity),
                getSummary: params => axios.get(`${baseurl}/customer/summary-cus-hs`, { params }),
                getSummaryHousehold: params => axios.get(`${baseurl}/customer/summary-household-cus-hs`, { params }),
            },
            getList: params => axios.get(`${baseurl}/customer/get-customer`, { params }),
            insert: entity => axios.post(`${baseurl}/customer/insert-customer`, entity),
            update: entity => axios.put(`${baseurl}/customer/update-customer`, entity),
            getShelf: params => axios.get(`${baseurl}/customer/get-households`, { params }),
            getWine: params => axios.get(`${baseurl}/customer/get-wines`, { params }),
        },
        order: {
            getList: params => axios.get(`${baseurl}/order/get-order`, { params }),
            getDetail: (cusId, orderId) => axios.get(`${baseurl}/order/get-order-detail/${cusId}/${orderId}`),
            insert: entity => axios.post(`${baseurl}/order/insert-order`, entity),
            update: entity => axios.put(`${baseurl}/order/update-order`, entity),
            other: {
                getSummary: params => axios.get(`${baseurl}/order/summary-order`, { params }),
                getDetailDelivery: params => axios.get(`${baseurl}/order/get-delivery-detail`, {
                    params,
                }),
                getDetailDeliverySession: params => axios.get(`${baseurl}/order/get-ship-info/${params.session}`, {
                    params,
                }),
                getDelivery: params => axios.get(`${baseurl}/order/get-delivery`, { params }),
                updateNote: entity => axios.put(`${baseurl}/order/update-order-des`, entity),
                getUserDelivery: params => axios.get(`${baseurl}/customer/get-user-info`, { params }),
                getVehicles: params => axios.get(`${baseurl}/customer/get-vehicles`, { params }),
                checkOpt: entity => axios.post(`${baseurl}/order/check-otp`, entity),
            },
            shipper: {
                insert: entity => axios.post(`${baseurl}/order/shipping-insert${entity[0]?.deliveryid ? '?exist=1' : ''}`, entity),
                update: entity => axios.put(`${baseurl}/order/shipping-update/${entity.typeItem}`, entity.data),
                //getDetailShipDelivery: params => axios.get(`${baseurl}/order/get-delivery-shipping/${params.session}`, { params })
                getDetailShipDelivery: params => axios.post(`${baseurl}/order/get-delivery-shipping`, params)
            }
        },
        location: {
            getList: params => axios.get(`${baseurl}/location/get-locations`, { params }),
        },
        contract: {
            getList: params => axios.get(`${baseurl}/contract/get-contracts`, { params }),
            insert: entity => axios.post(`${baseurl}/contract/insert-contract`, entity),
            update: entity => axios.put(`${baseurl}/contract/update-contract`, entity),
            changeStatus: entity => axios.put(`${baseurl}/contract/status-contract`, entity),
        },
        signedContract: {
            getContract: params => axios.get(`${baseurl}/contract/get-cus-contracts`, { params }),
            insert: entity => axios.post(`${baseurl}/contract/insert-cus-contract`, entity),
            update: entity => axios.post(`${baseurl}/contract/update-cus-contract`, entity),
        },
        productMeta: {
            meta: {
                getList: (params) => axios.get(`${baseurl}/product/get-unity`, { params }),
                create: (data, type) => axios.post(`${baseurl}/product/insert-unity?type=${type}`, data),
                update: (entity, type) => axios.put(`${baseurl}/product/update-unity?type=${type}`, entity),
                delete: (entity, type) => axios.put(`${baseurl}/product/delete-unity?type=${type}`, entity),
            }
        },
        uploadFile: {
            insert: entity => axios.post(`${baseurl}/common/upload-file`, entity),
        },
        meta: {
            userDelivery: {
                getList: (params) => axios.get(`${baseurl}/customer/get-user-info`, { params }),
                getCode: (params) => axios.get(`${baseurl}/customer/generate2fashipping`, { params }),
                insert: entity => axios.post(`${baseurl}/customer/insert-userinfo`, entity),
                update: entity => axios.put(`${baseurl}/customer/update-userinfo`, entity),
            },
            vehicleDelivery:{
                getList: (params) => axios.get(`${baseurl}/customer/get-vehicles`, { params }),
                insert: entity => axios.post(`${baseurl}/customer/insert-vehicle`, entity),
                update: entity => axios.put(`${baseurl}/customer/update-vehicle`, entity),
            }
        },
        accounting:{
            bill:{
                getList: (params) => axios.get(`${baseurl}/order/get-billing`, { params }),
            }
        }
    },
}