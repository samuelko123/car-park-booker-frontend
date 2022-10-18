import React from 'react'
import { useRouter } from 'next/router'
import {
	BackButton,
	DeleteButton,
} from '../../components/atoms/Buttons'
import { BaseLink } from '../../components/atoms/Links'
import { Stack } from '@mui/material'
import {
	ERROR,
	HTTP_METHOD,
	HTTP_STATUS,
} from '../../utils/constants'
import {
	ErrorAlert,
	InfoAlert,
} from '../../components/atoms/Alerts'
import { useAjaxRequest } from '../../hooks/useAjaxRequest'
import { LogList } from '../../components/organisms/LogList'
import { DeleteDialog } from '../../components/molecules/Dialogs'
import { useDataFetcher } from '../../hooks/useDataFetcher'
import { BaseSpinner } from '../../components/atoms/Spinner'
import moment from 'moment'
import { ReadOnlyField } from '../../components/atoms/TextFields'

export default function Page() {
	const router = useRouter()
	const { id } = router.query
	const [deleteErrMsg, , sendDeleteRequest] = useAjaxRequest()
	const [openModal, setOpenModal] = React.useState(false)

	const handleDelete = async () => {
		const request = {
			url: `/api/tickets/${id}`,
			method: HTTP_METHOD.DELETE,
		}

		await sendDeleteRequest(request, (res) => {
			if (res.status === HTTP_STATUS.OK) {
				router.push('/')
			}
		})
	}

	const {
		data,
		error,
		isLoading,
	} = useDataFetcher(`/api/tickets/${id}`)

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
			{data &&
				<>
					<DeleteButton
						variant='outlined'
						onClick={() => setOpenModal(true)}
					/>
					<DeleteDialog
						open={openModal}
						onConfirm={handleDelete}
						onClose={() => { setOpenModal(false) }}
					/>
					{['booking_date', 'number_plate', 'status', 'run_count', 'last_run_at', 'created_at'].map(field => {
						let val = data[field]
						if (field === 'booking_date') {
							val = val.substr(0, 10)
						}

						if (field === 'last_run_at' || field === 'created_at') {
							val = moment(val).utc().format('DD/MM HH:mm')
						}

						if (field === 'run_count') {
							val = val || 0
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
				</>
			}
			{data?.status === 'Active' &&
				<InfoAlert>
					It will keep trying every 30 minutes.
				</InfoAlert>
			}
			{data?.logs && data.logs.length > 0 &&
				<LogList data={data?.logs} />
			}
		</Stack>
	)
}