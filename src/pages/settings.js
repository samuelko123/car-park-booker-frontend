import React from 'react'
import {
	List,
	Stack,
} from '@mui/material'
import axios from 'axios'
import { BackButton } from '../components/molecules/BackButton'
import { BaseHeader } from '../components/atoms/Header'
import { AuthContext } from '../components/organisms/AuthProvider'
import { ListItemWithSwitch } from '../components/molecules/ListItemWithSwitch'
import { BaseListSubheader } from '../components/atoms/ListSubheader'

export default function Page() {
	const {
		user,
	} = React.useContext(AuthContext)

	return (
		<>
			<BackButton href='/' />
			<BaseHeader>
				Settings
			</BaseHeader>
			<Stack gap={1}>
				<List>
					<BaseListSubheader>
						General
					</BaseListSubheader>
					<ListItemWithSwitch
						primary='Upgrade to BOT 3'
						secondary='Attempt to upgrade your BOT 9 bookings to BOT 3 every 30 minutes.'
						checked={!!user.can_upgrade}
						onChange={async (checked) => axios.patch('/api/users/can-upgrade', { can_upgrade: checked })}
					/>
				</List>
				<List>
					<BaseListSubheader>
						Email Notifications
					</BaseListSubheader>
					<ListItemWithSwitch
						primary='Upgrade Success'
						secondary='Notify when successfully upgraded from BOT 9 to BOT 3'
						checked={!!user.can_notify_upgrade}
						onChange={async (checked) => axios.patch('/api/users/can-notify-upgrade', { can_notify_upgrade: checked })}
					/>
				</List>
			</Stack>
		</>
	)
}
