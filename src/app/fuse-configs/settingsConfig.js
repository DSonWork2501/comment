const settingsConfig = {
	layout: {
		style: 'layout1', // layout-1 layout-2 layout-3
		config: {} // checkout default layout configs at app/fuse-layouts for example  app/fuse-layouts/layout1/Layout1Config.js
	},
	customScrollbars: true,
	animations: true,
	direction: 'ltr', // rtl, ltr
	theme: {
		main: 	 'light6',	//'default',
		navbar:  'light6',	//'mainThemeDark',
		toolbar: 'light6',	//'mainThemeLight',
		footer:  'light6',	//'mainThemeDark'
	}
};

export default settingsConfig;
