import React from 'react'
import Head from 'next/head'

import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../styles/theme'

import {
	CssBaseline,
	Menu,
	Stack,
} from '@mui/material'
import { AuthGuard } from '../components/organisms/AuthGuard'
import { AuthProvider } from '../components/organisms/AuthProvider'
import { useLogout } from '../hooks/useLogout'
import { BaseMenuItem } from '../components/atoms/MenuItem'
import { AppBar } from '../components/organisms/AppBar'
import { BaseLink } from '../components/atoms/Links'

export const AppWrapper = (props) => {
	const { children } = props

	const [anchorEl, setAnchorEl] = React.useState(null)
	const [menuOpen, setMenuOpen] = React.useState(false)
	const { logout } = useLogout('/api/users/logout')

	return (
		<ThemeProvider theme={theme}>
			<AuthProvider
				endpoint='/api/users/me'
			>
				<Head>
					<title>{process.env.NEXT_PUBLIC_APP_TITLE}</title>
					<link rel='icon' href='/favicon.ico' />
				</Head>
				<CssBaseline />
				<AppBar
					title={process.env.NEXT_PUBLIC_APP_TITLE}
					onClickMenuButton={(e) => {
						setAnchorEl(e.currentTarget)
						setMenuOpen(true)
					}}
				/>
				<Menu
					open={menuOpen}
					onClose={() => setMenuOpen(false)}
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
				>
					<BaseLink href='/settings'>
						<BaseMenuItem>
							Settings
						</BaseMenuItem>
					</BaseLink>
					<BaseMenuItem onClick={logout}>
						Logout
					</BaseMenuItem>
				</Menu>
				<Stack
					component='main'
					gap={2}
					p={2}
					sx={{
						maxWidth: 600,
						margin: 'auto',
					}}
				>
					<AuthGuard
						endpoint='/api/users/login'
					>
						{children}
					</AuthGuard>
				</Stack>
			</AuthProvider>
		</ThemeProvider>
	)
}

export default function App(props) {
	const {
		Component,
		pageProps: { ...pageProps },
	} = props

	return (
		<AppWrapper>
			<Component {...pageProps} />
		</AppWrapper>
	)
}
