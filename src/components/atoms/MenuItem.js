import React from 'react'
import { MenuItem } from '@mui/material'

export const BaseMenuItem = React.forwardRef((props, ref) => {
	const {
		children,
		...otherProps
	} = props

	return (
		<MenuItem
			ref={ref}
			{...otherProps}
			divider
		>
			{children}
		</MenuItem>
	)
})