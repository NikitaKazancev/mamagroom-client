import classNames from 'classnames'
import { FaGithub } from 'react-icons/fa'
import styles from './github.module.scss'

export const GithubIcon = ({
	className,
	onClick,
}: {
	className?: string
	onClick?: () => void
}) => {
	return (
		<FaGithub
			className={classNames(styles.icon, className)}
			onClick={onClick}
		/>
	)
}
