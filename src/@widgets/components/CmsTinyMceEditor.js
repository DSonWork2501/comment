import { Editor } from "@tinymce/tinymce-react";
import React, { useRef } from "react";
import * as PropTypes from 'prop-types'
import { useDispatch} from 'react-redux'
import { uploadImage} from './../store/uploadimage'

function CmsTinyMceEditor (props) {
    const dispatch = useDispatch();
    const {value, onChange} = props
    const editorRef = useRef(null);
    const handleChange = (e) => {
        // console.log('Content was updated:', e.target.getContent());
        onChange && onChange(e)
    }
    return (
    <Editor
        onInit={(evt, editor) => {
            editorRef.current = editor
        }}
        initialValue={value}
        init={{
            selector: "textarea#tynimce",
            height: 800,
            menubar: false,
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
                "link image code"
            ],
            toolbar: [
                "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |",
                "numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter | pagebreak | charmap emoticons | insertfile image pageembed template | showcomments addcomment | fullscreen | code"
            ],
            image_title: true,
            image_dimensions: false,
            object_resizing:false,
            /* enable automatic uploads of images represented by blob or data URIs*/
            automatic_uploads: true,
            file_picker_types: 'image',
            /* and here's our custom image picker*/
            file_picker_callback: function (cb, value, meta) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.onchange = function () {
                    var file = this.files[0];
                    let formData = new FormData();
                    formData.append('file', file)
                    dispatch(uploadImage({ formData: formData, setValue: (val) => 
                        {
                            var reader = new FileReader();
                            reader.onload = function () {
                            cb(val, { title: file.name, value:val,width:"auto",height:"auto" });
                            };
                            reader.readAsDataURL(file);
                        }
                    }))
                };
                input.click();
            },
        }}
        onChange={handleChange}
    />
)}
CmsTinyMceEditor.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
}

CmsTinyMceEditor.defaultProps = {
    value: null
}

export default React.memo(CmsTinyMceEditor)