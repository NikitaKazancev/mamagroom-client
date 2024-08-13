export const SERVICES_DOGS = { name: 'Процедуры для собак', link: '/dogs' }
export const SERVICES_CATS = { name: 'Процедуры для кошек', link: '/cats' }

export const HOME = { name: 'Главная', link: '/' }
export const SERVICES = {
	name: 'Процедуры и цены',
	link: '/procedures',
	sublinks: [SERVICES_DOGS, SERVICES_CATS],
}
export const CONTACTS = { name: 'Контакты', link: '/contacts' }
export const EMPLOYEES = { name: 'Мастера', link: '/masters' }
export const VACANCIES = { name: 'Вакансии', link: '/vacancies' }

type NavLinks = {
	name: string
	link: string
	sublinks?: NavLinks[]
}

export const NAV_LINKS: NavLinks[] = [
	HOME,
	SERVICES,
	EMPLOYEES,
	VACANCIES,
	CONTACTS,
]
