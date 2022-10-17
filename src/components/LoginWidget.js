import React from 'react'
import { useRouter } from 'next/router'
import { BaseTextField } from './TextFields'
import { SubmitButton } from './atoms/Buttons'
import { HTTP_METHOD } from '../utils/constants'
import { useAjaxRequest } from '../hooks/useAjaxRequest'
import {
	ErrorAlert,
	InfoAlert,
} from './atoms/Alerts'
import { Stack } from '@mui/material'

export const LoginWidget = () => {
	const router = useRouter()
	const [errMsg, isLoading, sendRequest] = useAjaxRequest()

	const [username, setUsername] = React.useState('')
	const [password, setPassword] = React.useState('')

	const handleSubmit = async () => {
		const request = {
			url: '/api/users/login',
			method: HTTP_METHOD.POST,
			data: {
				username: username,
				password: password,
			},
		}

		await sendRequest(request, () => {
			router.reload()
		})
	}

	return (
		<>
			{errMsg &&
				<ErrorAlert>
					{errMsg}
				</ErrorAlert>
			}
			<InfoAlert>
				{`Please login with your ${process.env.NEXT_PUBLIC_PARKING_PROVIDER} credentials`}
			</InfoAlert>
			<Stack gap={2} component='form'>
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
					onClick={handleSubmit}
					loading={isLoading}
				>
					Login
				</SubmitButton>
			</Stack>
		</>
	)
}