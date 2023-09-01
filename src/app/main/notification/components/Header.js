import { DropMenuMobile } from 'app/main/delivery/EmployDelivery';
import React from 'react';

function HeadDelivery({ phone, name }) {
    return <div className='p-8 text-right flex justify-between items-center '>
        <div className='text-center'>
            WINE LOGO
        </div>
        <div style={{ width: 110 }}>
            <DropMenuMobile phone={phone} name={name} />
        </div>
    </div>;
}

export default HeadDelivery;