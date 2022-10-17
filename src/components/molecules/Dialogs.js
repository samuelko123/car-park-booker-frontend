import React from 'react'
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material'
import {
	CancelButton,
	DeleteButton,
} from '../atoms/Buttons'
import { ErrorAlert } from '../atoms/Alerts'

const BaseDialog = (props) => {
	const {
		open,
		onClose: handleClose,
		title,
		children,
		showCancelButton,
		actionButton,
	} = props

	return (
		<Dialog
			open={open}
			onClose={handleClose}
		>
			<DialogTitle>
				{title}
			</DialogTitle>
			<DialogContent>
				{children}
			</DialogContent>
			<DialogActions>
				{showCancelButton &&
					<CancelButton
						onClick={handleClose}
					/>
				}
				{actionButton}
			</DialogActions>
		</Dialog >
	)
}

export const DeleteDialog = (props) => {
	const {
		onConfirm,
		open,
		onClose: handleClose,
	} = props

	const [isLoading, setLoading] = React.useState(false)
	const [error, setError] = React.useState(null)
	const handleConfirm = async () => {
		try {
			setLoading(true)
			await onConfirm()
		} catch (err) {
			setError(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<BaseDialog
			open={open}
			onClose={handleClose}
			title='Delete'
			showCancelButton={true}
			actionButton={
				<DeleteButton
					variant='contained'
					onClick={handleConfirm}
					loading={isLoading}
				/>
			}
		>
			{error &&
				<ErrorAlert>
					{error?.message}
				</ErrorAlert>
			}
			<DialogContentText>
				Are you sure you want to delete?
			</DialogContentText>
		</BaseDialog>
	)
}