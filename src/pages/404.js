import { ErrorAlert } from '../components/atoms/Alerts'
import { BackButton } from '../components/atoms/Buttons'
import { BaseLink } from '../components/atoms/Links'

export default function Page() {
	return (
		<>
			<BaseLink href='/'>
				<BackButton />
			</BaseLink>
			<ErrorAlert>
				Page Not Found
			</ErrorAlert>
		</>
	)
}