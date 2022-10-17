import React from 'react'
import { BaseMenuItem } from '../atoms/MenuItem'
import { BaseTextField } from '../atoms/TextFields'

export const BaseDropdown = (props) => {
	const {
		label,
		value,
		options,
		onChange,
	} = props

	return (
		<BaseTextField
			select
			value={value}
			label={label}
			onChange={(val) => onChange(val)}
		>
			{
				options.map(option => {
					if (!option || !option.label || !option.value) {
						return null
					}

					return (
						<BaseMenuItem
							key={option.value}
							value={option.value}
						>
							{option.label}
						</BaseMenuItem>
					)
				})
			}
		</BaseTextField>
	)
}