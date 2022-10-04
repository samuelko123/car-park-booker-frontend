import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

export const BaseButton = React.forwardRef((props, ref) => {
	const {
		children,
		...btnProps
	} = props

	return (
		<LoadingButton
			sx={{ alignSelf: 'flex-start' }}
			ref={ref}
			{...btnProps}
		>
			{children}
		</LoadingButton>
	)
})

export const BackButton = React.forwardRef((props, ref) => (
	<BaseButton
		size='small'
		startIcon={<ArrowBackIosNewIcon />}
		ref={ref}
		{...props}
	/>
))

export const DeleteButton = React.forwardRef((props, ref) => (
	<BaseButton
		variant='contained'
		color='error'
		startIcon={<DeleteIcon />}
		ref={ref}
		{...props}
	/>
))

export const CreateButton = React.forwardRef((props, ref) => (
	<BaseButton
		variant='contained'
		color='success'
		startIcon={<AddIcon />}
		ref={ref}
		{...props}
	/>
))