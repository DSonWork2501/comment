import React from "react";
import SignatureCanvas from 'react-signature-canvas'
import CmsButton from "./CmsButton";
import { useRef } from "react";
import { useEffect } from "react";
import CmsBoxLine from "./CmsBoxLine";
import { useState } from "react";

export default function CmsSignature({ title = '', width = 500, height = 200, className = "signature", setValue, value }) {
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
                <SignatureCanvas
                    
                    penColor='green'
                    canvasProps={{ width, height, className }}
                    ref={sigRef}
                    onEnd={handleSignatureEnd}
                />
                <CmsButton startIcon="close" label="" onClick={clearSignature} />
            </CmsBoxLine>
        </div>
    )
}