import History from "@history";

const Index = () => {
	// const authActions = useSelector(({ auth }) => {
	// 	let aut = auth?.user?.role;
	// 	if (!isArray(aut))
	// 		aut = [aut];
	// 	return aut
	// })

	// const authObjects = useMemo(() => {
	// 	return authActions ? authActions.reduce((accumulator, value, index) => {
	// 		return { ...accumulator, [value]: value };
	// 	}, {}) : {};
	// }, [authActions])

	// if ([auth.VIEW_PARTNER].some((value) => authObjects[value])) {
	// 	History.push('/ads/customer');
	// } else if ([auth.VIEW_CONTRACT].some((value) => authObjects[value])) {
	// 	History.push('/ads/contract');
	// } else if ([auth.VIEW_CHANNEL].some((value) => authObjects[value])) {
	// 	History.push('/ads/campaign');
	// } else if ([auth.VIEW_INCOME].some((value) => authObjects[value])) {
	// 	History.push('/ads/income');
	// } else if ([auth.VIEW_INVOICE].some((value) => authObjects[value])) {
	// 	History.push('/ads/invoice');
	// }
	History.push('/accounting/debts');
	return null
}
export default Index;