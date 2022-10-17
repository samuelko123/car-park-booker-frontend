import React from 'react'
import { Tooltip } from '@mui/material'
import { AuthContext } from './AuthProvider'
import { BaseAppBar } from '../atoms/AppBar'
import { BrandHeader } from '../molecules/BrandHeader'
import { LogoutButton } from '../atoms/Buttons'

export const AppBar = (props) => {
	const {
		title,
		logout,
	} = props

	const { user } = React.useContext(AuthContext)

	return (
		<BaseAppBar>
			<BrandHeader
				href='/'
				title={title}
			/>
			{user &&
				<Tooltip title='Logout'>
					<LogoutButton
						onClick={logout}
						color='inherit'
					/>
				</Tooltip>
			}
		</BaseAppBar>

	)
}