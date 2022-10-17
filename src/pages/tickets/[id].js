import React from 'react'
import { useRouter } from 'next/router'
import {
	BackButton,
	DeleteButton,
} from '../../components/atoms/Buttons'
import { BaseLink } from '../../components/atoms/Links'
import {
	CircularProgress,
	Stack,
} from '@mui/material'
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
import { LogList } from '../../components/lists/LogList'
import { DeleteDialog } from '../../components/Dialogs'
import { useDataFetcher } from '../../hooks/useDataFetcher'
import { TicketDetail } from '../../components/details/TicketDetail'

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
				{isLoading && <CircularProgress size='2rem' />}
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
						handleClose={() => { setOpenModal(false) }}
					/>
					<TicketDetail data={data} />
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