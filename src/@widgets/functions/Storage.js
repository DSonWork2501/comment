/**
 * Lưu vào Storage
 * @param {*} key 
 * @param {*} value 
 */
function setStorage(key="", value) {
    if(!key || !value) return;
    localStorage.setItem(key, JSON.stringify(value))
}

/**
 * @description Lấy ra từ Storage
 * @param {*} key 
 */
function getStorage(key=""){
    if(!key) return
    return JSON.parse(localStorage.getItem(key))
}

/**
 * @description Xóa Storage
 * @param {*} key 
 */
function removeStorage(key=""){
    if(!key) return
    return localStorage.removeItem(key)
}

/**
 * Lưu vào session Storage
 * @param {*} key 
 * @param {*} value 
 */
 function setSession(key="", value) {
    if(!key || !value) return;
    sessionStorage.setItem(key, JSON.stringify(value))
}

/**
 * @description Lấy ra từ Session Storage
 * @param {*} key 
 */
function getSession(key=""){
    if(!key) return
    return JSON.parse(sessionStorage.getItem(key))
}

/**
 * @description Xóa Session Storage
 * @param {*} key 
 */
function removeSession(key=""){
    if(!key) return
    return sessionStorage.removeItem(key)
}

export default {
    setStorage,
    getStorage,
    removeStorage,
    setSession,
    getSession,
    removeSession
}