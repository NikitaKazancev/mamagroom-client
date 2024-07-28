import classNames from 'classnames'
import styles from './layout.module.scss'

type Props = {
	children: React.ReactNode
	className?: string
	bg?: boolean
}

export const Layout = ({ children, className, bg }: Props) => {
	return (
		<div className={classNames(styles.layout, bg && styles.bg, className)}>
			{children}
		</div>
	)
}
