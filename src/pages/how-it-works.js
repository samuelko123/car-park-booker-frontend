import React from 'react'
import { BackButton } from '../components/atoms/Buttons'
import { BaseHeader } from '../components/atoms/Header'
import { BaseLink } from '../components/atoms/Links'
import { BaseParagraph } from '../components/atoms/Paragraph'

export default function Page() {
	return (
		<>
			<BaseLink href='/'>
				<BackButton />
			</BaseLink>
			<BaseHeader>
				How It Works
			</BaseHeader>
			<BaseParagraph>
				1. Login with your {process.env.NEXT_PUBLIC_PARKING_PROVIDER} username and password
			</BaseParagraph>
			<img src='/step1.png' />
			<BaseParagraph>
				2. Pick a date, submit a ticket (i.e. booking request)
			</BaseParagraph>
			<img src='/step2.png' />
			<BaseParagraph>
				3. In the background, we try to book it every 30 minutes.
			</BaseParagraph>
			<img src='/step3.png' />
		</>

	)
}
