import Connect from '@connect';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

const Payoo = () => {
    const params = useParams(), code = params.code;
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (code) {
            setSuccess(false);
            Connect.live.payoo.getList({ id: code }).then((val) => {
                const res = val.data?.result
                setTimeout(() => {
                    if (res) {
                        setSuccess(true);
                        window.postMessage('messagePayment', 'Success')

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
                }, 150);
            })
        }
    }, [code])

    return <div className='bg-white h-full w-full'>
        {
            success ? 'Thành công' : 'Vui lòng chờ trong một chút...'
        }
    </div>
}

export default Payoo;
