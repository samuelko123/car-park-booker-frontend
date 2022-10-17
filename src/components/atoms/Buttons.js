import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

const BaseButton = React.forwardRef((props, ref) => {
	return (
		<LoadingButton
			ref={ref}
			{...props}
			sx={{ alignSelf: 'flex-start' }}
		/>
	)
})

export const BackButton = React.forwardRef((props, ref) => {
	return (
		<BaseButton
			ref={ref}
			{...props}
			variant='outlined'
			size='small'
			startIcon={<ArrowBackIosNewIcon />}
		>
			Back
		</BaseButton>
	)
})

export const DeleteButton = React.forwardRef((props, ref) => {
	const {
		onClick,
		variant,
	} = props

	return (
		<BaseButton
			ref={ref}
			{...props}
			color='error'
			variant={variant}
			onClick={onClick}
			startIcon={<DeleteIcon />}
		>
			Delete
		</BaseButton>
	)
})

export const CreateButton = React.forwardRef((props, ref) => {
	const {
		children,
	} = props

	return (
		<BaseButton
			ref={ref}
			{...props}
			color='success'
			variant='outlined'
			startIcon={<AddIcon />}
		>
			{children}
		</BaseButton>
	)
})

export const CancelButton = React.forwardRef((props, ref) => {
	const { onClick } = props

	return (
		<BaseButton
			ref={ref}
			{...props}
			onClick={onClick}
			variant='outlined'
		>
			Cancel
		</BaseButton>
	)
})

export const SubmitButton = React.forwardRef((props, ref) => {
	const {
		onClick,
		loading,
		children,
	} = props

	return (
		<BaseButton
			ref={ref}
			{...props}
			onClick={onClick}
			variant='contained'
			loading={loading}
			type='submit'
		>
			{children}
		</BaseButton>
	)
})