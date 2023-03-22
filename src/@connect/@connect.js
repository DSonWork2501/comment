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
            delete: entity => axios.delete(`${baseurl}/product/delete-product`, entity),
        },
        category: {
            getList: params => axios.get(`${baseurl}/product/get-category`, { params }),
            insert: entity => axios.post(`${baseurl}/product/insert-category`, entity),
            update: entity => axios.put(`${baseurl}/product/update-category`, entity),
            changeStatus: entity => axios.put(`${baseurl}/product/delete-category`, entity),
        },
        account: {
            getList: params => axios.get(`${baseurl}/customer/get-account`, { params }),
        },
        customer: {
            getList: params => axios.get(`${baseurl}/customer/get-customer`, { params }),
            insert: entity => axios.post(`${baseurl}/customer/insert-customer`, entity),
        },
        order: {
            getList: params => axios.get(`${baseurl}/order/get-order`, { params }),
            update: entity => axios.put(`${baseurl}/order/update-order`, entity),

        }
    },
}