async function fetchBreeds(lang: string) {
	const res = await fetch(`http://localhost:8080/api/breeds?lang=${lang}`)
	if (!res.ok) {
		throw new Error('Failed to fetch products')
	}
	return res.json()
}

export default async function Breeds({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const breeds = await fetchBreeds(locale)

	return <div>Breeds</div>
}
