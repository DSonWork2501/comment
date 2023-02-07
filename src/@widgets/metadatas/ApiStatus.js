export const apiStatus ={
    200: {id: 200, name: 'OK', isError: false},
    400: {id: 400, name: 'Error', isError: true},
    401: {id: 401, name: 'Lỗi authentication', isError: true},
    403: {id: 403, name: 'Không có quyền truy cập', isError: true},
    405: {id: 405, name: 'Method Not Allowed', isError: true}
}