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
				id: 'nvi-manager-product',
				title: 'Quản Lý Sản Phẩm',
				translate: 'PRODUCT_MANAGEMENT',
				type: 'item',
				icon: 'shop',
				url: '/product',
			},
			{
				id: 'nvi-manager-category',
				title: 'Quản Lý Danh Mục',
				translate: 'PRODUCT_CATEGORY_MANAGEMENT',
				type: 'item',
				icon: 'category',
				url: '/product-category',
			},
		],
	},
	{
		id: 'nvi-customer',
		title: 'Khách Hàng',
		translate: 'CUSTOMER',
		type: 'group',
		icon: 'person',
		// auth: ["GetLicense", "ReportLicense"],
		children: [
			{
				id: 'nvi-manager-customer',
				title: 'Thông Tin Khách hàng',
				translate: 'CUSTOMER_INFO',
				type: 'item',
				icon: 'person',
				url: '/customer',
			},
			{
				id: 'nvi-manager-account',
				title: 'Thông tin tài khoản',
				translate: 'ACCOUNT',
				type: 'item',
				icon: 'account_circle',
				url: '/account',
			},
		],
	},
	{
		id: 'nvi-order',
		title: 'Đơn Hàng',
		translate: 'ORDER',
		type: 'group',
		icon: 'reorder',
		// auth: ["GetLicense", "ReportLicense"],
		children: [
			{
				id: 'nvi-manager-order',
				title: 'Quản Lý Đơn Hàng',
				translate: 'ORDER_MANAGEMENT',
				type: 'item',
				icon: 'reorder',
				url: '/order/6',
			},
			{
				id: 'nvi-manager-shelf',
				title: 'Quản lý tủ rượu',
				translate: 'CUSTOM_SHELF',
				type: 'item',
				icon: 'call_to_action',
				url: '/customer-shelf',
			},
		],
	},
	{
		id: 'nvi-contract',
		title: 'Hợp đồng',
		translate: 'CONTRACT',
		type: 'group',
		icon: 'reorder',
		children: [
			{
				id: 'nvi-manager-contract',
				title: 'Danh Sách Hợp Đồng',
				translate: 'CONTRACT_MANAGEMENT',
				type: 'item',
				icon: 'gavel',
				url: '/contract',
			},
			{
				id: 'nvi-manager-signed-contract',
				title: 'Hợp Đồng Đã Ký',
				translate: 'SIGNED_CONTRACT_MANAGEMENT',
				type: 'item',
				icon: 'gavel',
				url: '/signed-contract',
			},
		],
	},
];

export default navigationConfig;
