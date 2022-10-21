import React from 'react'
import {
	Link,
	Menu,
} from '@mui/material'
import { useLogout } from '../../hooks/useLogout'
import { BaseLink } from '../atoms/Links'
import { BaseMenuItem } from '../atoms/MenuItem'
import { AuthContext } from './AuthProvider'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import LoginIcon from '@mui/icons-material/Login'
import LocalCafeIcon from '@mui/icons-material/LocalCafe'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'

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
				<BaseMenuItem
					onClick={onClose}
					startIcon={<HelpOutlineIcon color='primary' />}
				>
					How It Works
				</BaseMenuItem>
			</BaseLink>
			{
				!user &&
				<BaseLink href='/login'>
					<BaseMenuItem
						onClick={onClose}
						startIcon={<LoginIcon color='primary' />}
					>
						Login
					</BaseMenuItem>
				</BaseLink>
			}
			{
				user &&
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
						<BaseMenuItem
							onClick={onClose}
							startIcon={<LocalCafeIcon color='primary' />}
						>
							Buy me a coffee
						</BaseMenuItem>
					</Link>
					,
					<BaseLink
						key='settings'
						href='/settings'
					>
						<BaseMenuItem
							onClick={onClose}
							startIcon={<SettingsIcon color='primary' />}
						>
							Settings
						</BaseMenuItem>
					</BaseLink>
					,
					<BaseMenuItem
						key='logout'
						startIcon={<LogoutIcon color='primary' />}
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