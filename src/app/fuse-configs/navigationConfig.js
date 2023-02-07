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
		id: 'nvi-manager-wine',
		title: 'Quản lý rượu vang',
		translate: 'MANAGER_WINE',
		type: 'group',
		icon: 'library_books',
		url: '/license-budget',
		// auth: ["GetLicense", "ReportLicense"],
		// children: [
		// 	{
		// 		id: 'nvi-manager-number-license-faf-budget',
		// 		title: 'Quản lý Bản Quyền',
		// 		translate: 'NUMBER_LICENSE_BUDGET',
		// 		type: 'item',
		// 		icon: 'account_balance',
		// 		url: '/license-budget',
		// 		auth: ["GetLicense"]
		// 	},
		// ],
		targetID: 'nvi-manager-number'
	},
];

export default navigationConfig;
