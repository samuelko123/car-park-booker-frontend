import React from 'react'
import { Collapse } from '@mui/material'

export const BaseCollapse = (props) => {
	const {
		isOpen,
		children,
	} = props

	return (
		<Collapse
			in={isOpen}
			orientation='vertical'
		>
			{children}
		</Collapse>
	)
}