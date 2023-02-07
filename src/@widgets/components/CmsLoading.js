import React from 'react'
import {
	Backdrop,
	colors
} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import * as PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: colors.teal[900]
	}
}))

/**
 *
 * @description Component CmsLoading
 */
function CmsLoading(props) {
	const classes = useStyles(props);
	const { loading } = props;

	return (
        <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" size={60}/>
        </Backdrop>
	)
}

CmsLoading.propTypes = {
	loading: PropTypes.bool.isRequired
}

CmsLoading.defaultProps = {
	loading: false
}

export default React.memo(CmsLoading)
