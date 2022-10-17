import React from 'react'

import { BaseTextField } from '../atoms/TextFields'
import { SubmitButton } from '../atoms/Buttons'

import { InfoAlert } from '../atoms/Alerts'
import { Stack } from '@mui/material'

export const LoginForm = (props) => {
	const {
		onSubmit: handleSubmit,
		loading,
	} = props

	const [username, setUsername] = React.useState('')
	const [password, setPassword] = React.useState('')

	return (
		<Stack gap={2} component='form'>
			<InfoAlert>
				{`Please login with your ${process.env.NEXT_PUBLIC_PARKING_PROVIDER} credentials`}
			</InfoAlert>
			<BaseTextField
				label='Username'
				value={username}
				onChange={setUsername}
			/>
			<BaseTextField
				type='password'
				label='Password'
				value={password}
				onChange={setPassword}
			/>
			<SubmitButton
				onClick={() => handleSubmit(username, password)}
				loading={loading}
			>
				Login
			</SubmitButton>
		</Stack>
	)
}