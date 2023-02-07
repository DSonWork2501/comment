import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { DialogUpdateUser } from './components'
import history from '@history'

function HomePage() {
	const auth = useSelector(({ auth }) => auth)
	const user = useSelector(({ auth }) => auth.user.user)
	const [openDlgDep, setOpenDlgDep] = useState(false)
	const isLogin = auth.user && auth.user.access_token

	useEffect(() => {
		if(!isLogin) {
			history.push("/login")
		}
	}, [isLogin])
	
	useEffect(() => {
		if((user && !user.departmentID)){
			setOpenDlgDep(true)
		}else{
			setOpenDlgDep(false)
		}
	}, [user])
	
	return (
		<React.Fragment>
			<div className="flex flex-col flex-1 items-center justify-center p-16">
				<div className="w-full text-center">
					<FuseAnimate animation="transition.expandIn" delay={100}>
						<Typography variant="h1" color="inherit" className="font-medium mb-16">
							Quản lý Rượu Vang
						</Typography>
					</FuseAnimate>

					<FuseAnimate delay={500}>
						<Typography variant="h5" color="textSecondary" className="mb-16">
							Hệ thống quản lý rượu vang
						</Typography>
					</FuseAnimate>

					<Link className="font-medium" to="/">
						CopyRight @ 2023 
					</Link>
				</div>
			</div>
			{openDlgDep && <DialogUpdateUser open={openDlgDep} handleClose={() => setOpenDlgDep(false)} />}
		</React.Fragment>
	)
}

export default HomePage
