import Connect from '@connect';
import React, { useEffect } from 'react'
import { useParams } from 'react-router';

const Payoo = () => {
    const params = useParams(), code = params.code;

    useEffect(() => {
        if (code) {
            Connect.live.payoo.getList({ id: code }).then((val) => {
                const res = val.data?.result
                if (res) {
                    // Find the element by its class names
                    const element = document.querySelector('.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary');

                    // Check if the element exists
                    if (element) {
                        // Create a click event
                        const clickEvent = new MouseEvent('click', {
                            bubbles: true,
                            cancelable: true,
                            view: window,
                        });

                        // Dispatch the click event on the element
                        element.dispatchEvent(clickEvent);
                    } else {
                        console.log('Element not found');
                    }
                }
            })
        }
    }, [code])

    return <div className='bg-white h-full w-full'>
        Vui lòng chờ trong một chút...
    </div>
}

export default Payoo;
