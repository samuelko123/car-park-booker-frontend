import React from 'react'
import Head from 'next/head'

import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../styles/theme'

import {
	CssBaseline,
	Stack,
} from '@mui/material'
import { AppBar } from '../components/organisms/AppBar'
import { AuthGuard } from '../components/organisms/AuthGuard'
import { AuthProvider } from '../components/organisms/AuthProvider'
import { useLogout } from '../hooks/useLogout'

export const AppWrapper = (props) => {
	const { children } = props

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
					logout={logout}
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
