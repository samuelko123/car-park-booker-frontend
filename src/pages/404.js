import { ErrorAlert } from '../components/atoms/Alerts'
import { BackButton } from '../components/molecules/BackButton'

export default function Page() {
	return (
		<>
			<BackButton href='/' />
			<ErrorAlert>
				Page Not Found
			</ErrorAlert>
		</>
	)
}