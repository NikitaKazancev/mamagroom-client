'use client'

import useSettingsStore from '@/modules/settings/utils/store'
import { SettingsIcon } from '@/ui/icons/settings/settings'
import classNames from 'classnames'
import styles from './settings.module.scss'

export const Settings = ({
	formComponent,
	iconClassname,
	onSubmit,
	componentProps,
}: {
	formComponent: React.ComponentType
	iconClassname?: string
	onSubmit: (formData: FormData) => void
	componentProps: Record<string, any>
}) => {
	const { show } = useSettingsStore()

	const handleClick = () => {
		show({ Component: formComponent, componentProps, onSubmit })
	}

	return (
		<SettingsIcon
			onClick={handleClick}
			className={classNames(styles.icon, iconClassname)}
		/>
	)
}
