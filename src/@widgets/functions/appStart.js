
import { getOrigin, getConcentration, getType } from "@widgets/store/filtersSlice"

/**
 * @description gọi data theo flat
 * @author vinhtq24
 * flat !== flatStorage_appStart -> clear storage 
 * flat === flatStorage_appStart -> get storage
 */
const getAppStart = async(dispatch, flat) => {
        dispatch(getOrigin())
        dispatch(getType())
        dispatch(getConcentration())
        // const flatStorage = storage.getStorage(KeyStorage.appStart)
        // if (flat !== flatStorage) {
        //     await storage.removeStorage(KeyStorage.locations)
        // }

        // dispatch(getLocations())
}
export default getAppStart