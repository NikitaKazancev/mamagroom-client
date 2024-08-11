export const SERVICES_DOGS = { name: 'Процедуры для собак', path: '/dogs' }
export const SERVICES_CATS = { name: 'Процедуры для кошек', path: '/cats' }

export const HOME = { name: 'Главная', path: '/' }
export const SERVICES = {
	name: 'Процедуры и цены',
	path: '/procedures',
	sublinks: [SERVICES_DOGS, SERVICES_CATS],
}
export const CONTACTS = { name: 'Контакты', path: '/contacts' }
export const EMPLOYEES = { name: 'Мастера', path: '/masters' }
export const VACANCIES = { name: 'Вакансии', path: '/vacancies' }

type NavLinks = {
	name: string
	path: string
	sublinks?: NavLinks[]
}

export const NAV_LINKS: NavLinks[] = [
	HOME,
	SERVICES,
	EMPLOYEES,
	VACANCIES,
	CONTACTS,
]
