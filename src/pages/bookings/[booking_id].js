import React from 'react'
import { useRouter } from 'next/router'
import {
	BackButton,
	DeleteButton,
} from '../../components/atoms/Buttons'
import { BaseLink } from '../../components/atoms/Links'
import { ReadOnlyField } from '../../components/atoms/TextFields'
import { Stack } from '@mui/material'
import {
	ERROR,
	HTTP_METHOD,
	HTTP_STATUS,
} from '../../utils/constants'
import { ErrorAlert } from '../../components/atoms/Alerts'
import { DeleteDialog } from '../../components/molecules/Dialogs'
import { useAjaxRequest } from '../../hooks/useAjaxRequest'
import { useDataFetcher } from '../../hooks/useDataFetcher'
import { BaseSpinner } from '../../components/atoms/Spinner'
import { BaseHeader } from '../../components/atoms/Header'

export default function Page() {
	const router = useRouter()
	const { booking_id } = router.query
	const [openModal, setOpenModal] = React.useState(false)
	const [deleteErrMsg, , sendDeleteRequest] = useAjaxRequest()

	const handleDelete = async () => {
		const request = {
			url: `/api/bookings/${booking_id}`,
			method: HTTP_METHOD.DELETE,
		}

		await sendDeleteRequest(request, (res) => {
			if (res.status === HTTP_STATUS.OK) {
				router.push('/')
			}
		})
	}

	const {
		data: booking,
		error,
		isLoading,
	} = useDataFetcher(`/api/bookings/${booking_id}`)

	return (
		<Stack gap={2}>
			<Stack flexDirection='row' gap={2}>
				<BaseLink href='/'>
					<BackButton />
				</BaseLink>
				{isLoading &&
					<BaseSpinner />
				}
			</Stack>
			{error &&
				<ErrorAlert>
					{error?.message || ERROR.UNKNOWN}
				</ErrorAlert>
			}
			{deleteErrMsg &&
				<ErrorAlert>
					{deleteErrMsg}
				</ErrorAlert>
			}
			{booking &&
				<>
					<Stack
						gap={3}
						sx={{ width: '100%' }}
					>
						<BaseHeader>Booking Details</BaseHeader>
						{['id', 'booking_date', 'car_park', 'bay', 'number_plate', 'status'].map(field => {
							let val = booking[field]
							if (field === 'booking_date') {
								val = val.substr(0, 10)
							}
							return (
								<ReadOnlyField
									key={field}
									label={field}
									value={val}
									fullWidth
								/>
							)
						})}
						<DeleteButton
							variant='outlined'
							onClick={() => { setOpenModal(true) }}
						/>
						<DeleteDialog
							open={openModal}
							onConfirm={handleDelete}
							onClose={() => { setOpenModal(false) }}
						/>
					</Stack>
				</>
			}
		</Stack>
	)
}