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
            path: '/accounting',
            component: React.lazy(() => import('.')),
        },
        {
            exact: true,
            path: '/accounting/debts',
            component: React.lazy(() => import('./pages/Debt')),
        },
        {
            exact: true,
            path: '/accounting/debts/:type',
            component: React.lazy(() => import('./pages/Debt')),
        },
        {
            exact: true,
            path: '/accounting/bill',
            component: React.lazy(() => import('./pages/Bill')),
        },
        {
            exact: true,
            path: '/accounting/bill/:type',
            component: React.lazy(() => import('./pages/Bill')),
        },
        {
            exact: true,
            path: '/collection',
            component: React.lazy(() => import('./pages/BBBG')),
        },
        {
            exact: true,
            path: '/collection/:type/:id',
            component: React.lazy(() => import('./pages/DetailBBBG')),
        },
    ]
};

export default PageConfig