import React, { useEffect, useState } from 'react'
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
	KeyboardTimePicker,
	KeyboardDateTimePicker,
	DatePicker
} from '@material-ui/pickers';
import * as PropTypes from 'prop-types'
import { Icon } from '@material-ui/core';
/**
 * 
 * @description Component CmsDateTime
 */
function CmsDateTimePicker(props) {
	const { format, onlyTime, allDateTime, required, label, onChange, isOpenKeyBoard, onOpen, onlyMonthYear, clearDate, ...otherProps } = props
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		onOpen && onOpen(isOpen)
	}, [isOpen, onOpen])

	if (onlyMonthYear) {
		return (
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<DatePicker
					fullWidth
					variant="inline"
					inputVariant="outlined"
					openTo="year"
					views={["year", "month"]}
					onChange={(date, strdate) => {
						if (onChange) {
							onChange(date, strdate);
						}
					}}
					label={required ? `${label} *` : label}
					format={format}
					placeholder={label}
					{...otherProps}
					InputProps={{
						endAdornment: otherProps?.value ? (
							<Icon
								className='cursor-pointer'
								onClick={(e) => {
									e.stopPropagation();
									clearDate();
								}}>
								close
							</Icon>
						) : (
							<Icon>
								calendar_today
							</Icon>
						),
					}}
				/>
			</MuiPickersUtilsProvider>
		)
	}

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<React.Fragment>
				{!onlyTime && !allDateTime && (
					<KeyboardDatePicker
						{...otherProps}
						fullWidth
						open={isOpen}
						label={required ? `${label} *` : label}
						variant="inline"
						inputVariant="outlined"
						format={format}
						placeholder={format}
						autoOk
						onChange={(date, strdate) => {
							if (onChange) {
								onChange(date, strdate);
							}
							setIsOpen(false);
						}}
						InputLabelProps={{ shrink: true }}
						KeyboardButtonProps={{
							onFocus: e => {
								setIsOpen(true);
							}
						}}
						PopoverProps={{
							disableRestoreFocus: true,
							onClose: () => {
								setIsOpen(false);
							}
						}}
						InputProps={{
							onFocus: () => {
								isOpenKeyBoard && setIsOpen(true);
							}
						}}
					/>)}
				{onlyTime && (
					<KeyboardTimePicker
						{...otherProps}
						fullWidth
						label={required ? `${label} *` : label}
						variant="inline"
						inputVariant="outlined"
						format={format}
						placeholder={format}
						autoOk
						ampm={false}
						onChange={(date, strdate) => {
							if (onChange) {
								onChange(date, strdate);
							}
						}}
						InputLabelProps={{ shrink: true }}
						KeyboardButtonProps={{
							onFocus: e => {
								setIsOpen(true);
							}
						}}
						PopoverProps={{
							disableRestoreFocus: true,
							onClose: () => {
								setIsOpen(false);
							}
						}}
						InputProps={{
							onFocus: () => {
								isOpenKeyBoard && setIsOpen(true);
							}
						}}
					/>)}
				{allDateTime && (
					<KeyboardDateTimePicker
						{...otherProps}
						fullWidth
						open={isOpen}
						label={required ? `${label} *` : label}
						variant="inline"
						inputVariant="outlined"
						format={format}
						placeholder={format}
						onChange={(date, strdate) => {
							if (onChange) {
								onChange(date, strdate);
							}
						}}
						KeyboardButtonProps={{
							onFocus: e => {
								setIsOpen(true);
							}
						}}
						InputProps={{
							onFocus: () => {
								isOpenKeyBoard && setIsOpen(true);
							}
						}}
						PopoverProps={{
							disableRestoreFocus: true,
							onClose: () => {
								setIsOpen(false);
							}
						}}
						InputLabelProps={{ shrink: true }}
						// InputProps={{ readOnly: true }}
						ampm={false}
					/>)}
			</React.Fragment>
		</MuiPickersUtilsProvider>
	);
}

CmsDateTimePicker.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string,
	className: PropTypes.string,
	format: PropTypes.string.isRequired,
	value: PropTypes.any,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	required: PropTypes.bool,
	error: PropTypes.bool,
	helperText: PropTypes.any,
	onlyTime: PropTypes.bool,
	allDateTime: PropTypes.bool,
	isOpenKeyBoard: PropTypes.bool
}

CmsDateTimePicker.defaultProps = {
	format: "dd/MM/yyyy HH:mm:ss",
	onlyTime: false,
	required: false,
	allDateTime: false,
	isOpenKeyBoard: true
}

export default React.memo(CmsDateTimePicker)
