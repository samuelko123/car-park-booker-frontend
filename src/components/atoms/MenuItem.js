import React from 'react'
import {
	MenuItem,
	Stack,
} from '@mui/material'

export const BaseMenuItem = React.forwardRef((props, ref) => {
	const {
		children,
		startIcon,
		...otherProps
	} = props

	return (
		<MenuItem
			ref={ref}
			{...otherProps}
			divider
			sx={{ padding: 2 }}
		>
			<Stack flexDirection='row' gap={1}>
				{startIcon || null}
				{children}
			</Stack>
		</MenuItem>
	)
})