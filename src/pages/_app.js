import React from 'react'
import Head from 'next/head'

import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../styles/theme'

import {
	CssBaseline,
	Stack,
} from '@mui/material'
import { AuthGuard } from '../components/organisms/AuthGuard'
import { AuthProvider } from '../components/organisms/AuthProvider'
import { BaseAppBar } from '../components/atoms/AppBar'
import { BrandHeader } from '../components/molecules/BrandHeader'
import { MenuButton } from '../components/atoms/Buttons'
import { MainMenu } from '../components/organisms/MainMenu'

export const AppWrapper = (props) => {
	const { children } = props

	const [anchorEl, setAnchorEl] = React.useState(null)
	const [menuOpen, setMenuOpen] = React.useState(false)

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
				<BaseAppBar>
					<BrandHeader
						href='/'
						title={process.env.NEXT_PUBLIC_APP_TITLE}
					/>
					<MenuButton
						onClick={(e) => {
							setAnchorEl(e.currentTarget)
							setMenuOpen(true)
						}}
						color='inherit'
					/>
				</BaseAppBar>
				<MainMenu
					open={menuOpen}
					onClose={() => setMenuOpen(false)}
					anchorEl={anchorEl}
				/>
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
