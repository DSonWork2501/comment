import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitLogin } from 'app/auth/store/loginSlice';
import { Link } from '@material-ui/core';
import ResetPasswordDialog from 'app/main/customer/components/account/ResetPasswordDialog';
import { alertInformation } from '@widgets/functions';
import Connect from '@connect';
import { showMessage } from 'app/store/fuse/messageSlice';

function JwtLdapLoginTab(props) {
	const dispatch = useDispatch();
	const login = useSelector(({ auth }) => auth.login);

	const [isFormValid, setIsFormValid] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [openDialog, setOpenDialog] = useState('');

	const formRef = useRef(null);

	useEffect(() => {
		if (login.error && (login.error.email)) {
			formRef.current.updateInputsWithError({
				...login.error
			});
			// disableButton();
		}
	}, [login.error]);

	// function disableButton() {
	// 	setIsFormValid(false);
	// }

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		dispatch(submitLogin(model));
	}

	const handleCloseDialog = () => {
		setOpenDialog('')
	}

	return (
		<div className="w-full">
			{
				openDialog === "password"
				&&
				<ResetPasswordDialog
					open={openDialog === 'password'}
					handleClose={handleCloseDialog}
					handleSubmit={async (values, form) => {
						alertInformation({
							text: `Xác nhận thao tác`,
							data: { values, form },
							confirm: async () => {
								try {
									await Connect.live.identity.confirmForgotPass(values);
									await Connect.live.identity.updateForgotPass(values);
									setTimeout(() => {
										dispatch(showMessage({ variant: "success", message: 'Thành công' }))
									}, 100);
									setOpenDialog('');
								} catch (error) {
								} finally {
									form.setSubmitting(false)
								}
							},
							close: () => form.setSubmitting(false)
						});
					}}
					title={`Quên mật khẩu`}
				/>
			}

			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				// onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full mb-136"
			>
				<TextFieldFormsy
					className="mb-24"
					type="text"
					name="email"
					label="Tài khoản"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									account_circle
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-24"
					type="password"
					name="password"
					label="Mật khẩu"
					validations={{
						// minLength: 4
					}}
					validationErrors={{
						// minLength: 'Min character length is 4'
					}}
					InputProps={{
						className: 'pr-2',
						type: showPassword ? 'text' : 'password',
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={() => setShowPassword(!showPassword)}>
									<Icon className="text-20" color="action">
										{showPassword ? 'visibility' : 'visibility_off'}
									</Icon>
								</IconButton>
							</InputAdornment>
						)
					}}
					variant="outlined"
				// required
				/>

				<TextFieldFormsy
					className="mb-24"
					type="text"
					name="otp"
					label="OTP"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									fiber_pin
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16 normal-case"
					aria-label="LOG IN"
					disabled={!isFormValid}
					value="legacy"
				>
					Login
				</Button>
				<div className='text-right text-13 mt-4'>
					<Link className='cursor-pointer' onClick={() => setOpenDialog('password')}>
						Quên mật khẩu?
					</Link>
				</div>
			</Formsy>
		</div>
	);
}

export default JwtLdapLoginTab;
