import Connect from '@connect';
import React, { useEffect } from 'react'
import { useParams } from 'react-router';

const Payoo = () => {
    const params = useParams(), code = params.code;

    useEffect(() => {
        if (code) {
            Connect.live.payoo.getList({ id: code })
        }
    }, [code])

    return <div className='bg-white h-full w-full'>
        Vui lòng chờ trong một chút...
    </div>
}

export default Payoo;
