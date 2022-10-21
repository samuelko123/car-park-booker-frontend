import React from 'react'
import {
	Link,
	Menu,
} from '@mui/material'
import { useLogout } from '../../hooks/useLogout'
import { BaseLink } from '../atoms/Links'
import { BaseMenuItem } from '../atoms/MenuItem'
import { AuthContext } from './AuthProvider'

export const MainMenu = (props) => {
	const {
		open,
		onClose,
		anchorEl,
	} = props

	const { logout } = useLogout('/api/users/logout')
	const { user } = React.useContext(AuthContext)

	return (
		<Menu
			open={open}
			onClose={onClose}
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			PaperProps={{
				elevation: 2,
			}}
			disableScrollLock={true}
			MenuListProps={{
				disablePadding: true,
			}}
		>
			<BaseLink href='/how-it-works'>
				<BaseMenuItem onClick={onClose}>
					How it works
				</BaseMenuItem>
			</BaseLink>
			{!user &&
				<BaseLink href='/login'>
					<BaseMenuItem onClick={onClose}>
						Login
					</BaseMenuItem>
				</BaseLink>
			}
			{user &&
				[
					<Link
						key='buy-me-a-coffee'
						href='https://www.buymeacoffee.com/samuelko123'
						target='_blank'
						rel='noreferrer'
						sx={{
							textDecoration: 'none',
							color: 'inherit',
						}}
					>
						<BaseMenuItem onClick={onClose}>
							Buy me a coffee
						</BaseMenuItem>
					</Link>
					,
					<BaseLink
						key='settings'
						href='/settings'
					>
						<BaseMenuItem onClick={onClose}>
							Settings
						</BaseMenuItem>
					</BaseLink>
					,
					<BaseMenuItem
						key='logout'
						onClick={() => {
							logout()
							onClose()
						}}
					>
						Logout
					</BaseMenuItem>,
				]
			}
		</Menu>
	)
}