import React from 'react'
import { useRouter } from 'next/router'
import { BaseButton } from '../atoms/Buttons'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

export const BackButton = (props) => {
	const { href } = props

	const router = useRouter()
	const [loading, setLoading] = React.useState(false)

	return (
		<BaseButton
			variant='outlined'
			size='small'
			startIcon={<ArrowBackIosNewIcon />}
			loading={loading}
			onClick={() => {
				setLoading(true)
				router.push(href)
			}}
		>
			Back
		</BaseButton>
	)
}