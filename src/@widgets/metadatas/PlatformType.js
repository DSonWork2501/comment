import React from 'react';
import { CmsLabel, } from '@widgets/components'
/**
 * @description hiển thị trên nền tảng nào: 1-All, 2- IPTV;
 */
export default {
    1: {
        id: 1, name: 'All', description: (
            <div className="flex space-x-2 justify-center">
                <CmsLabel className="text-green-500" content="IPTV" />
                <CmsLabel className="text-black" content="+" />
                <CmsLabel className="text-blue-500" content="OTT" />
            </div>
        )
    },
    2: { id: 2, name: 'IPTV', description: <CmsLabel className="text-green-500" content="IPTV" /> },
    3: { id: 3, name: 'OTT', description: <CmsLabel className="text-blue-500" content="OTT" /> },
}