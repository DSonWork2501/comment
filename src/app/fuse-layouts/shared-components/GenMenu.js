//kiem tra chieu dai so item menu theo phan quyen
function CheckLengthItem(authActions, ItemMenus) {
	let limit = 0;
	try {
		if (!authActions || !ItemMenus) return 0;
		if (Array.isArray(authActions) && Array.isArray(ItemMenus) && authActions?.length > 0 && ItemMenus?.length > 0) {
			for (let i = 0; i < ItemMenus.length; i++) {
				if (ItemMenus[i] && Array.isArray(ItemMenus[i]) && ItemMenus[i]?.length > 0){
					for (let j = 0; j < ItemMenus[i].length; j++) {
						if (authActions.includes(ItemMenus[i][j])){
							limit = limit + 1;
							break;
						}
					}
				} else {
					limit = limit + 1;
				}
			}
		}
		if (Array.isArray(ItemMenus) && ItemMenus?.length > 0 && typeof authActions === 'string') {
			for (let i = 0; i < ItemMenus.length; i++) {
				if (ItemMenus[i].includes(authActions)){
					limit = limit + 1;
				}
			}
		}
		return limit;
	} catch {
		return limit;
	}
}

// function GenMenu(navigation = [], navigationCustom = [], authActions, limit = 3) {
// 	try{
// 		if (!authActions) return navigation;
// 		if (!navigationCustom || !(navigationCustom?.length > 0)) return navigation;
// 		let menuFinal = [];
// 		let menuSource = navigation;
// 		for (let i = 0; i < navigationCustom.length; i++) {
// 			//get all item menu chilren
// 			let items = navigation?.filter(x => (x.targetID && x.targetID === navigationCustom[i].id)) || [];
// 			let preData = items?.map(x => x?.auth || []) || [];
// 			let children = [ ...items.map(x => ({ ...x, type: (x.children && x?.children?.length > 0) ? 'collapse' : 'item' }))]
// 			let auth = [];
// 			for (let j = 0; j < preData.length; j++) {
// 				auth = [ ...auth, ...preData[j] ];
// 			}
// 			if (CheckLengthItem(authActions, preData) >= limit) {
// 				menuFinal = [ ...menuFinal, { ...navigationCustom[i], children: children, auth: auth }];
// 				menuSource = menuSource.filter(x => x.targetID !== navigationCustom[i].id);
// 			}
// 		}
// 		menuFinal = [ ...menuFinal, ...menuSource ];
// 		return menuFinal || navigation;
// 	} catch(e) {
// 		return navigation;
// 	}
// };
function GenMenu(navigation = [], navigationCustom = [], authActions, limit = 8, item = 3) {
	try{
		if (!(navigation?.length > limit)) return navigation;
		if (!authActions) return navigation;
		if (!navigationCustom || !(navigationCustom?.length > 0)) return navigation;
		let menuFinal = [];
		let menuSource = navigation;
		let navigationCustomTemp = navigationCustom;
		if (navigation?.find(x => x?.targetID)){
			for (let i = 0; i < navigationCustom.length; i++) {
				if (!(navigation.find(x => x.targetID === navigationCustom[i].id))) {
					navigationCustomTemp = navigationCustomTemp.filter(x => x.id !== navigationCustom[i].id);
					continue;
				}
				//get all item menu chilren
				let items = navigation?.filter(x => (x.targetID && x.targetID === navigationCustom[i].id)) || [];
				let preData = items?.map(x => x?.auth || []) || [];
				let children = [ ...items.map(x => ({ ...x, type: (x.children && x?.children?.length > 0) ? 'collapse' : 'item' }))]
				let auth = [];
				for (let j = 0; j < preData.length; j++) {
					auth = [ ...auth, ...preData[j] ];
				}
				if (CheckLengthItem(authActions, preData) >= item || navigationCustom[i].id === "nvi-manager-more") {
					menuFinal = [{ ...navigationCustom[i], children: children, auth: auth }];
					menuSource = menuSource.filter(x => x.targetID !== navigationCustom[i].id);
					navigationCustomTemp = navigationCustomTemp.filter(x => x.id !== navigationCustom[i].id);
					break;
				}
			}
		}
		menuFinal = menuFinal.find(x => x.id === "nvi-manager-more") ? [ ...menuSource, ...menuFinal ] : [ ...menuFinal, ...menuSource ];
		if ((menuFinal?.length > limit) && navigationCustomTemp?.length === 1) {
			menuFinal = menuFinal.map((x,i) => ({ ...x, targetID: i < limit - 1 ? null : "nvi-manager-more"}));
		};
		//Đệ quy để giới hạn số item menu theo = limit
		return GenMenu(menuFinal, navigationCustomTemp, authActions, limit, item);
		//return menuFinal || navigation;
	} catch(e) {
		return navigation;
	}
};
export default GenMenu;
