import {getCountry} from '@widgets/store/countrySlice'
import {getCopyright} from '@widgets/store/copyrightSlice'
import {getFolders} from '@widgets/store/foldersSlice'
import {getUser} from '@widgets/store/userSlice'
import {getCategories} from '@widgets/store/categoriesSlice'
import {getPermission} from '@widgets/store/permissionSlice'
import {getDepartment} from '@widgets/store/departmentSlice'
import {getReasonDown} from '@widgets/store/reasonDownSlice'
import { storage } from '@widgets/functions'
import { KeyStorage } from '@widgets/metadatas'
/**
 * @description gọi data theo flat
 * @author vinhtq24
 * flat !== flatStorage_appStart -> clear storage 
 * flat === flatStorage_appStart -> get storage
 */
const getAppStart = async(dispatch, flat) => {
        const flatStorage = storage.getStorage(KeyStorage.appStart)
        if (flat !== flatStorage) {
            await storage.removeStorage(KeyStorage.categories)
            await storage.removeStorage(KeyStorage.copyright)
            await storage.removeStorage(KeyStorage.country)
            await storage.removeStorage(KeyStorage.department)
            await storage.removeStorage(KeyStorage.folders)
            await storage.removeStorage(KeyStorage.reasons)
            await storage.setStorage(KeyStorage.appStart, flat)
        }

        dispatch(getCountry())
        dispatch(getCopyright())
        dispatch(getFolders())
        dispatch(getUser())
        dispatch(getCategories())
        dispatch(getPermission())
        dispatch(getDepartment())
        dispatch(getReasonDown())
}
export default getAppStart