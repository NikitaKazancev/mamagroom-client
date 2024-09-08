export async function generateMetadata({
	params,
}: {
	params: { locale: string }
}) {
	return {
		title: 'Admin',
		description: 'Admin',
	}
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<main>{children}</main>
		</>
	)
}
