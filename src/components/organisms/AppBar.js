import React from 'react'
import { AuthContext } from './AuthProvider'
import { BaseAppBar } from '../atoms/AppBar'
import { BrandHeader } from '../molecules/BrandHeader'
import { MenuButton } from '../atoms/Buttons'

export const AppBar = (props) => {
	const {
		title,
		onClickMenuButton,
	} = props

	const { user } = React.useContext(AuthContext)

	return (
		<BaseAppBar>
			<BrandHeader
				href='/'
				title={title}
			/>
			{user &&
				<MenuButton
					onClick={onClickMenuButton}
					color='inherit'
				/>
			}
		</BaseAppBar>

	)
}