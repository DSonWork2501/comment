import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	root: {
		'& .logo-icon': {
			width: 50,
			height: 50,
			transition: theme.transitions.create(['width', 'height'], {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeInOut
			})
		},
		'& .react-badge, & .logo-text': {
			transition: theme.transitions.create('opacity', {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeInOut
			})
		}
	},
	reactBadge: {
		backgroundColor: '#121212',
		color: '#61DAFB'
	}
}));

function Logo() {
	const classes = useStyles();

	return (
		<div className={clsx(classes.root, 'flex items-center justify-center')}>
			<Link to="/home"><img className="mr-16" src="assets/images/logos/logo-fpt-play.png" id='wine_manager' alt="rượu vang" /></Link>
			{/* <img className="logo-icon" src="assets/images/logos/logo-fpt.png" alt="fpt" /> */}
			{/* <Typography className="text-28 -mt-4 mx-12 font-light logo-text" color="error" component={Link} to="/main" role="button">
				<span className={clsx("text-blue-A700 font-extrabold")}>CMS</span>
				<span className={clsx("text-orange-A700 font-extrabold")}> - </span>
				<span className={clsx("text-green-A700 font-extrabold")}>PAYTV</span>
			</Typography> */}
			{/* <div className={clsx(classes.reactBadge, 'react-badge flex items-center py-4 px-8 rounded')}>
				<img
					className="react-logo"
					src="assets/images/logos/logo-fpt.png"
					alt="react"
					width="18"
				/>
				<span className="react-text text-16 mx-4">CMS PayTV</span>
			</div> */}
		</div>
	);
}

export default Logo;
