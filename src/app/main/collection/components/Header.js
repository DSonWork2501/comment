import React from 'react';
import { DropMenuMobile } from "../EmployDelivery"

function HeadDelivery({ entities }) {
    return <div className='p-8 text-right flex justify-between items-center '>
        <div className='text-center'>
            WINE LOGO
        </div>
        <div style={{ width: 110 }}>
            <DropMenuMobile phone={entities?.data[0]?.shipping?.phone} name={entities?.data[0]?.shipping?.shipname} />
        </div>
    </div>;
}

export default HeadDelivery;