import React from 'react'
import {
	List,
	ListItemText,
	Switch,
} from '@mui/material'
import { ErrorAlert } from '../components/atoms/Alerts'
import { BackButton } from '../components/atoms/Buttons'
import { BaseHeader } from '../components/atoms/Header'
import { BaseLink } from '../components/atoms/Links'
import { AuthContext } from '../components/organisms/AuthProvider'
import { useAjaxRequest } from '../hooks/useAjaxRequest'
import { HTTP_METHOD } from '../utils/constants'
import { useSWRConfig } from 'swr'
import { BaseListItem } from '../components/atoms/ListItems'

export default function Page() {
	const { user } = React.useContext(AuthContext)
	const [error, , sendRequest] = useAjaxRequest()
	const { mutate } = useSWRConfig()

	const handleChange = async (e) => {
		const val = e.target.checked
		const request = {
			url: '/api/users/can-upgrade',
			method: HTTP_METHOD.PATCH,
			data: {
				can_upgrade: val,
			},
		}

		await sendRequest(request, () => {
			const newUser = {
				...user,
				can_upgrade: val,
			}

			mutate('/api/users/me', newUser, {
				optimisticData: newUser,
				revalidate: true,
				populateCache: true,
				rollbackOnError: true,
			})
		})
	}

	return (
		<>
			<BaseLink href='/'>
				<BackButton />
			</BaseLink>
			<BaseHeader>
				Settings
			</BaseHeader>
			{error &&
				<ErrorAlert>
					{error}
				</ErrorAlert>
			}
			<List>
				<BaseListItem
					alignItems='flex-start'
				>
					<ListItemText
						primary='Upgrade to BOT 3'
						secondary='Attempts to upgrade your BOT 9 bookings to BOT 3 for every 30 minutes.'
					/>
					<Switch
						checked={!!user.can_upgrade}
						onChange={handleChange}
					/>
				</BaseListItem>
			</List>
		</>
	)
}
