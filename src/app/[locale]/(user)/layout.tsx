import { headerNavbarLinkAPI } from '@/api/header-navbar-link/header-navbar-link.api'
import { Footer } from '@/modules/footer/footer'
import { Header } from '@/modules/header/header'
import { getTranslations } from 'next-intl/server'

export default async function Layout({
	children,
	params,
}: {
	children: React.ReactNode
	params: { locale: string }
}) {
	const navLinks = await headerNavbarLinkAPI.findMany({
		language: params.locale,
	})
	const t = await getTranslations('General')

	return (
		<>
			<Header translations={{ book: t('book') }} navLinks={navLinks} />
			<main>{children}</main>
			<Footer />
		</>
	)
}
