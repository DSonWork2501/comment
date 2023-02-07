import axios from 'axios';
import config from '@config';

const upload = files => {
    const formData = new FormData();
    if (Array.isArray(files)) {
        console.log("arrFile",files)
        for (let index = 0; index < files.length; index++) {
            formData.append("filename", files[index]);
        }
    }else{
        formData.set("filename", files);
    }
	
    return axios.post(config.api.live.upload, formData, {headers: { 'Content-Type': 'multipart/form-data' }})
}



export default upload;