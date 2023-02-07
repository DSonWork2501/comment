import connect from '@connect';
/**
 * Get duwx lieeu tuwf file excel
 * @param {file} e 
 * @returns array excel data 
 */
 export const UploadFileToApi = async(file) => {
     try {
        let formData = new FormData();
        formData.append('file', file)
        /* Parse data */
        return await connect.live.landingPage.uploadImage(formData)
     } catch (error) {
         return error
     }
};
