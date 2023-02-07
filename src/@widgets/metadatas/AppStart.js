import { getAppStart } from '@widgets/functions'

export default dispatch => {
	const flat = 'true' // thay đổi field này để cập nhật lại data (value: 'true'/ 'false')
	getAppStart(dispatch, flat)
}