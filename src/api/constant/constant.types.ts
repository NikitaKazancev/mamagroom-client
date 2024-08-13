type ConstantFromServer = {
	language: string
	type: string
	name: string
}

type NavLink = {
	name: string
	link?: string
	sublinks?: NavLink[]
}
