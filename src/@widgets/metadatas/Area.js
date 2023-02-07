import {KeyStorage} from '@widgets/metadatas'
import {storage} from '@widgets/functions'
/**
 * @description danh sách vùng
 */
const areas = {
    vung1: {id: "1", name: "Vùng 1", key: "v1"},
    vung2: {id: "2", name: "Vùng 2", key: "v2"},
    vung3: {id: "3", name: "Vùng 3", key: "v3"},
    vung4: {id: "4", name: "Vùng 4", key: "v4"},
    vung5: {id: "5", name: "Vùng 5", key: "v5"},
    vung6: {id: "6", name: "Vùng 6", key: "v6"},
    vung7: {id: "7", name: "Vùng 7", key: "v7"},
}

const locationsStore = storage.getStorage(KeyStorage.locations)

const getAreas = () => {
    return locationsStore ? Object.keys(locationsStore).map(item =>{
        let area = Object.values(areas).find(a => a.key === item)
        return {...area, locations: locationsStore[item]}
    }) : []
}

const getLocations = () => {
    let resultArr = []
    locationsStore && Object.values(locationsStore).forEach(item=>{
        Array.isArray(item) && item.forEach(x => {
            resultArr = [...resultArr, x]
        })
    })
    return resultArr
}

export default {
    getLocations,
    getAreas
}