import { CmsAlert } from "@widgets/components";

export const CopyTextToClipboard = (value) => {
    // /* Get the text field */
    // var copyText = document.getElementById("myInput");
  
    // /* Select the text field */
    // copyText.select();
    // copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(value);
  
    /* Alert the copied text */
    // alert("Copied the text: " + value)
    CmsAlert.fire({heightAuto: false, text: 'đã sao chép!', icon: 'success'})
}