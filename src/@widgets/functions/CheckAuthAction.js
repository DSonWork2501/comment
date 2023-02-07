/***
 * kiểm tra permission của user
 * author: vinhtq24
 * @param authActions: list permission
 * @param action: permission name
 * @returns object {tooltip: string, isDisabled: boolean}
 */
export const CheckAuthAction = (authActions=[], action) => {
    let checkAuth =  Array.isArray(authActions) ? authActions.includes(action) : false
    return {result: checkAuth, message: checkAuth ? '' : 'Bạn không có quyền thao tác!'}
}