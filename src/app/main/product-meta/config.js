import React from 'react';
import i18next from 'i18next';
import en from './i18n/en';
import vn from './i18n/vn';
import { keyI18n } from './common';

i18next.addResourceBundle('en', keyI18n, en);
i18next.addResourceBundle('vn', keyI18n, vn);

const PageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            exact: true,
            path: '/product-meta',
            component: React.lazy(() => import('.')),
        },
        {
            exact: true,
            path: '/product-meta/meta/:type',
            component: React.lazy(() => import('./pages/Meta')),
        },
    ]
};

export default PageConfig