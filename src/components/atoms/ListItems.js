import React from 'react'
import { ListItem } from '@mui/material'

export const BaseListItem = React.forwardRef((props, ref) => {
	const {
		children,
		...otherProps
	} = props

	return (
		<ListItem
			ref={ref}
			{...otherProps}
			disablePadding
			divider
		>
			{children}
		</ListItem>
	)
})