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
} from './atoms/Buttons'
import { ErrorAlert } from './atoms/Alerts'

export const DeleteDialog = (props) => {
	const {
		onConfirm,
		open,
		handleClose,
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
		<Dialog
			open={open}
			onClose={handleClose}
		>
			<DialogTitle>
				Delete
			</DialogTitle>
			{error &&
				<ErrorAlert>
					{error?.message}
				</ErrorAlert>
			}
			<DialogContent>
				<DialogContentText>
					Are you sure you want to delete?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<CancelButton
					onClick={handleClose}
				/>
				<DeleteButton
					variant='contained'
					onClick={handleConfirm}
					loading={isLoading}
				/>
			</DialogActions>
		</Dialog>
	)
}