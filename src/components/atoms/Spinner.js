import React from 'react'
import { CircularProgress } from '@mui/material'

export const BaseSpinner = React.forwardRef((props, ref) => {
	return (
		<CircularProgress
			ref={ref}
			{...props}
		/>
	)
})