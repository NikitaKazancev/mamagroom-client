import { Link } from '@/navigation'

export default function CatchAllPage() {
	return (
		<div>
			<h2>Not Found 1</h2>
			<p>Could not find requested resource</p>
			<Link href='/'>Return Home</Link>
		</div>
	)
}
