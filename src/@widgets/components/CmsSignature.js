import React from "react";
import SignatureCanvas from 'react-signature-canvas'
import CmsButton from "./CmsButton";
import { useRef } from "react";
import CmsBoxLine from "./CmsBoxLine";

export default function CmsSignature({ title = '', width, height, className = "signature shadow-4", setValue, value }) {
    const sigRef = useRef(value);
    // const [signature, setSignature] = useState(null);
    const handleSignatureEnd = () => {
        // setSignature(sigRef.current.toDataURL());
        setValue(sigRef.current.toDataURL("image/png"))
    }
    const clearSignature = () => {
        sigRef.current.clear();
        // setSignature(null);
    }

    return (
        <div>
            <CmsBoxLine label={title}>
                <div className="space-y-8">
                <SignatureCanvas
                    penColor='green'
                    canvasProps={{ width, height, className }}
                    ref={sigRef}
                    onEnd={handleSignatureEnd}
                />
                <CmsButton label="xóa" onClick={clearSignature} />
                </div>
            </CmsBoxLine>
        </div>
    )
}