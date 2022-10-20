import React from 'react'
import { List } from '@mui/material'
import axios from 'axios'
import { BackButton } from '../components/atoms/Buttons'
import { BaseHeader } from '../components/atoms/Header'
import { BaseLink } from '../components/atoms/Links'
import { AuthContext } from '../components/organisms/AuthProvider'
import { ListItemWithSwitch } from '../components/molecules/ListItemWithSwitch'

export default function Page() {
	const {
		user,
	} = React.useContext(AuthContext)

	return (
		<>
			<BaseLink href='/'>
				<BackButton />
			</BaseLink>
			<BaseHeader>
				Settings
			</BaseHeader>
			<List>
				<ListItemWithSwitch
					primary='Upgrade to BOT 3'
					secondary='Attempts to upgrade your BOT 9 bookings to BOT 3 for every 30 minutes.'
					checked={!!user.can_upgrade}
					onChange={async (checked) => axios.patch('/api/users/can-upgrade', { can_upgrade: checked })}
				/>
			</List>
		</>
	)
}
