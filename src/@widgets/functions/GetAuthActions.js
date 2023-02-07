/**
 * @description chuyển đổi từ object permission sang mảng action
 * @param {*} permissions sau khi gọi lấy từ api
 * @returns mảng action
 */
const GetAuthActions = (permissions) => {
    let listPermission = []
    permissions && permissions.forEach(x=>{
        if(x.permissions && x.permissions.length > 0){
            x.permissions.forEach(ob=>{
                if(ob.isActived === 1){
                    listPermission = [...listPermission, ob]
                }
            })
        }
    })
    return listPermission.map(item=>item.actionName)
}
export default GetAuthActions