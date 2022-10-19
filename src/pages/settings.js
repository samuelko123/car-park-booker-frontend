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
import { BaseListItem } from '../components/atoms/ListItems'

export default function Page() {
	const {
		user,
		mutate,
	} = React.useContext(AuthContext)
	const [error, , sendRequest] = useAjaxRequest()
	const [checked, setChecked] = React.useState(!!user.can_upgrade)

	React.useEffect(() => {
		setChecked(!!user.can_upgrade)
	}, [user.can_upgrade])

	const handleChange = async (e) => {
		const val = e.target.checked
		setChecked(val)

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

			mutate(newUser, {
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
						checked={checked}
						onChange={handleChange}
					/>
				</BaseListItem>
			</List>
		</>
	)
}
