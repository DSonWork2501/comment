import i18next from 'i18next';
import en from './navigation-i18n/en';
import vn from './navigation-i18n/vn';

import enWidget from '@widgets/i18n/en'
import vnWidget from '@widgets/i18n/vn'


i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('vn', 'navigation', vn);

i18next.addResourceBundle('en', 'widget', enWidget);
i18next.addResourceBundle('vn', 'widget', vnWidget);
export const navigationCustom = [
	//trường hợp tổng số item menu vượt giới hạn thì sẽ hiển thị ở mục item menu cuối cùng
	// {
	// 	id: 'nvi-manager-more',
	// 	title: 'Các chức năng khác',
	// 	translate: 'MORE',
	// 	type: 'group',
	// 	icon: 'more',
	// 	auth: [],
	// 	children: []
	// },
];

const navigationConfig = [
	{
		id: 'nvi-product',
		title: 'Sản Phẩm',
		translate: 'PRODUCT',
		type: 'group',
		icon: 'shop',
		
		// auth: ["GetLicense", "ReportLicense"],
		children: [
			{
				id: 'nvi-manager-number-license-faf-budget',
				title: 'Quản Lý Sản Phẩm',
				translate: 'PRODUCT_MANAGEMENT',
				type: 'item',
				icon: 'shop',
				url: '/product',
			},
		],
		targetID: 'nvi-manager-number'
	},
];

export default navigationConfig;
