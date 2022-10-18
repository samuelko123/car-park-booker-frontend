import React from 'react'
import { useRouter } from 'next/router'
import { BaseDropdown } from '../../components/molecules/Dropdowns'
import {
	BackButton,
	SubmitButton,
} from '../../components/atoms/Buttons'
import {
	HTTP_METHOD,
	LIMIT,
} from '../../utils/constants'
import { useAjaxRequest } from '../../hooks/useAjaxRequest'
import { ErrorAlert } from '../../components/atoms/Alerts'
import { Stack } from '@mui/material'
import {
	BaseTextField,
	ReadOnlyField,
} from '../../components/atoms/TextFields'
import { AuthContext } from '../../components/organisms/AuthProvider'
import { BaseLink } from '../../components/atoms/Links'
import { useUpcomingWeekdays } from '../../hooks/useUpcomingWeekDays'

export default function Page() {
	const router = useRouter()

	const dates = useUpcomingWeekdays(LIMIT.AVAILABLE_DAYS_IN_ADVANCE)
	const [focusedDate, setFocusedDate] = React.useState(router.query?.date || dates[0].value)
	const [numPlate, setNumPlate] = React.useState('')
	const [isLicPlateMissing, setIsLicPlateMissing] = React.useState(false)
	const [errMsg, isLoading, sendRequest] = useAjaxRequest()
	const { user } = React.useContext(AuthContext)

	React.useEffect(() => {
		setNumPlate(user?.number_plate || '')
	}, [user])

	const handleLicPlateChange = (val) => {
		setNumPlate(val.toUpperCase())
	}

	const handleSubmit = async () => {
		if (!numPlate) {
			setIsLicPlateMissing(true)
			return
		} else {
			setIsLicPlateMissing(false)
		}

		const request = {
			url: '/api/tickets',
			method: HTTP_METHOD.POST,
			data: {
				booking_date: focusedDate,
				number_plate: numPlate,
			},
		}

		await sendRequest(request, () => {
			router.push('/')
		})
	}

	return (
		<Stack
			gap={2}
			component='form'
		>
			<BaseLink href='/'>
				<BackButton />
			</BaseLink>
			{errMsg &&
				<ErrorAlert>
					{errMsg}
				</ErrorAlert>
			}
			<ReadOnlyField
				fullWidth
				label='username'
				value={user?.username || ''}
				InputLabelProps={{ shrink: true }}
			/>
			<BaseTextField
				label='license plate'
				value={numPlate}
				onChange={handleLicPlateChange}
				InputLabelProps={{ shrink: true }}
				required={true}
				error={isLicPlateMissing}
			/>
			<BaseDropdown
				label='date'
				value={focusedDate}
				onChange={setFocusedDate}
				options={dates.map(date => {
					return {
						label: date.format('DD/MM (ddd)'),
						value: date.format('YYYY-MM-DD'),
					}
				})}
			/>
			<SubmitButton
				onClick={handleSubmit}
				loading={isLoading}
			>
				Book Now
			</SubmitButton>
		</Stack>
	)
}
