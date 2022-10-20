import React from 'react'
import { ListSubheader } from '@mui/material'

export const BaseListSubheader = React.forwardRef((props, ref) => {
	return (
		<ListSubheader
			ref={ref}
			{...props}
			sx={{
				backgroundColor: 'inherit',
			}}
		/>
	)
})