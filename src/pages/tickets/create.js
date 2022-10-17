import React from 'react'
import moment from 'moment'
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

export default function Page() {
	const router = useRouter()

	const dates = [...Array(LIMIT.AVAILABLE_DAYS_IN_ADVANCE).keys()].map((index) => {
		const momentObj = moment().add(index + 1, 'days')

		// skip weekend
		const weekday = momentObj.weekday()
		if ([0, 6].includes(weekday)) {
			return null
		}

		return {
			label: momentObj.format('DD/MM (ddd)'),
			value: momentObj.format('YYYY-MM-DD'),
		}
	}).filter(elem => !!elem)

	const [date, setDate] = React.useState(router.query?.date || dates[0].value)
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
				booking_date: date,
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
				value={date}
				onChange={setDate}
				options={dates}
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
