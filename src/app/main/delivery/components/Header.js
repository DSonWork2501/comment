import React from 'react';
import { DropMenuMobile } from '../EmployDelivery';

function HeadDelivery({ phone, name }) {
    return <div className='p-8 text-right flex justify-between items-center '>
        <div className='text-center'>
            <div style={{ height: 30, display: 'flex', alignItems: 'center' }}>
                <img className="mr-16" style={{ height: 110 }} src="assets/images/logos/Tasty-2.png" alt="rượu vang" />
            </div>
        </div>
        <div style={{ width: 110 }}>
            <DropMenuMobile phone={phone} name={name} />
        </div>
    </div>;
}

export default HeadDelivery;