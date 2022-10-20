import {
	FormHelperText,
	ListItemText,
	Stack,
	Switch,
} from '@mui/material'
import React from 'react'
import { BaseListItem } from '../atoms/ListItems'
import { BaseSpinner } from '../atoms/Spinner'

export const ListItemWithSwitch = (props) => {
	const {
		primary,
		secondary,
		checked: defaultChecked,
		onChange,
	} = props

	const [checked, setChecked] = React.useState(defaultChecked)
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState(false)

	React.useEffect(() => {
		setChecked(defaultChecked)
	}, [defaultChecked])

	const handleChange = async (e) => {
		const oldState = checked
		try {
			setError(false)
			setLoading(true)

			const val = e.target.checked
			setChecked(val)
			await onChange(val)
		} catch (err) {
			setError(err)
			setChecked(oldState)
		} finally {
			setLoading(false)
		}
	}

	return (
		<BaseListItem alignItems='flex-start'>
			<Stack alignItems='center'>
				<Switch
					checked={checked}
					onChange={handleChange}
				/>
				{loading &&
					<BaseSpinner size={16} />
				}
			</Stack>
			<Stack>
				<ListItemText
					primary={primary}
					secondary={secondary}
				/>
				{error &&
					<FormHelperText error>
						{error.toString()}
					</FormHelperText>
				}
			</Stack>
		</BaseListItem>
	)
}