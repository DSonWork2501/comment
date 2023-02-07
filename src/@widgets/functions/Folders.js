import { KeyStorage } from '@widgets/metadatas'
import { storage } from '@widgets/functions'

const folders = storage.getStorage(KeyStorage.folders)

const GetAll = () => folders

const GetListFolderType = appType => {
    if (appType) {
        let folderLv1 = folders.find(item => item.id === appType)
        let folderLv2 = folderLv1 ? folderLv1.items : []
        let folderLv3 = folderLv2.map(item => ({ id: item.folderType, name: item.folderType }))
        return folderLv3
    }
    return []
}

const GetListFolder = (appType, folderType) => {
    if (appType && folderType) {
        let folderLv1 = folders.find(item => item.id === appType)
        let folderLv2 = folderLv1 ? folderLv1.items : []
        let folderLv3 = folderLv2.find(item => item.folderType === folderType)
        let folderLv4 = folderLv3 ? folderLv3.items : []
        let folderLv5 = folderLv4.map(item => ({ id: item.id, name: item.toptitle, structureID: item?.structureID }))
        return folderLv5
    }
    return []
}

const GetFolderDetail = (folderId) => {
    if (folders && folders.length > 0) {
        for (let i = 0; i < folders.length; i++) {
            if (folders[i] && folders[i].items) {
                for (let j = 0; j < folders[i].items.length; j++) {
                    if (folders[i] && folders[i].items[j] && folders[i].items[j].items) {
                        for (let k = 0; k < folders[i].items[j].items.length; k++) {
                            if (folders[i] && folders[i].items[j] && folders[i].items[j].items[k] && folders[i].items[j].items[k].id === folderId) {
                                    return {
                                        appId: folders[i].id,
                                        appName: folders[i].appName,
                                        localType: folders[i].items[j].localType,
                                        folderType: folders[i].items[j].folderType,
                                        id: folders[i].items[j].items[k].id
                                    }
                            }
                        }
                    }
                }
            }
        }
    }
    return null
}

export default {
    GetAll,
    GetListFolderType,
    GetListFolder,
    GetFolderDetail
}