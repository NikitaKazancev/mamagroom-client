'use client'

import { Role, RoleType, User } from '@/api/user/user.types'
import { format } from 'date-fns'
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

// Format date to a readable string
const formatDate = (date: Date): string => {
	return format(new Date(date), 'MMM dd, yyyy HH:mm')
}

// Get a readable role name from the RoleType enum
const getRoleName = (role: Role): string => {
	// Convert camelCase to Title Case with spaces
	return role
		.replace(/([A-Z])/g, ' $1')
		.replace(/^./, str => str.toUpperCase())
}

interface UserTableClientProps {
	initialUsers: User[]
}

const UserTableClient = ({ initialUsers }: UserTableClientProps) => {
	const [users, setUsers] = useState<User[]>(initialUsers)
	const [searchTerm, setSearchTerm] = useState('')
	const [sortConfig, setSortConfig] = useState<{
		key: keyof User | null
		direction: 'ascending' | 'descending' | null
	}>({ key: 'createdAt', direction: 'descending' })
	const [selectedRoleFilter, setSelectedRoleFilter] = useState<Role | null>(
		null
	)
	const [currentPage, setCurrentPage] = useState(1)
	const [expandedUser, setExpandedUser] = useState<string | null>(null)
	const usersPerPage = 10

	// Apply filters and sorting
	const filteredUsers = useCallback(() => {
		let result = [...initialUsers]

		// Filter by search term
		if (searchTerm) {
			const lowerCaseSearchTerm = searchTerm.toLowerCase()
			result = result.filter(
				user =>
					(user.name?.toLowerCase() || '').includes(lowerCaseSearchTerm) ||
					user.email.toLowerCase().includes(lowerCaseSearchTerm)
			)
		}

		// Filter by role
		if (selectedRoleFilter) {
			result = result.filter(user => user.roles.includes(selectedRoleFilter))
		}

		// Sort users
		if (sortConfig.key && sortConfig.direction) {
			result.sort((a, b) => {
				// Handle potentially undefined values for sorting
				const valueA = a[sortConfig.key as keyof User]
				const valueB = b[sortConfig.key as keyof User]

				// Skip comparison if values are undefined
				if (valueA === undefined || valueB === undefined) return 0

				if (valueA < valueB) {
					return sortConfig.direction === 'ascending' ? -1 : 1
				}
				if (valueA > valueB) {
					return sortConfig.direction === 'ascending' ? 1 : -1
				}
				return 0
			})
		}

		return result
	}, [initialUsers, searchTerm, selectedRoleFilter, sortConfig])

	// Update users when filters or sorting change
	useEffect(() => {
		setUsers(filteredUsers())
	}, [filteredUsers])

	// Handle sorting
	const handleSort = (key: keyof User) => {
		let direction: 'ascending' | 'descending' | null = 'ascending'

		if (sortConfig.key === key) {
			if (sortConfig.direction === 'ascending') {
				direction = 'descending'
			} else if (sortConfig.direction === 'descending') {
				direction = null
			}
		}

		setSortConfig({ key, direction })
	}

	// Get current users for pagination
	const indexOfLastUser = currentPage * usersPerPage
	const indexOfFirstUser = indexOfLastUser - usersPerPage
	const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)
	const totalPages = Math.ceil(users.length / usersPerPage)

	// All possible roles for filtering
	const allRoles = Object.keys(RoleType).filter(role =>
		isNaN(Number(role))
	) as Role[]

	return (
		<div>
			{/* Search and filter bar */}
			<div className='p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50'>
				<div className='relative w-full sm:w-64'>
					<input
						type='text'
						placeholder='Search users...'
						className='pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
					<Search className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
					{searchTerm && (
						<button
							onClick={() => setSearchTerm('')}
							className='absolute right-3 top-2.5'
						>
							<X className='h-4 w-4 text-gray-400 hover:text-gray-600' />
						</button>
					)}
				</div>

				<div className='w-full sm:w-auto'>
					<select
						className='w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						value={selectedRoleFilter || ''}
						onChange={e =>
							setSelectedRoleFilter((e.target.value as Role) || null)
						}
					>
						<option value=''>All Roles</option>
						{allRoles.map(role => (
							<option key={role} value={role}>
								{getRoleName(role)}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* User table */}
			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-200'>
					<thead className='bg-gray-50'>
						<tr>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
							>
								<button
									className='flex items-center space-x-1 focus:outline-none'
									onClick={() => handleSort('name')}
								>
									<span>Name</span>
									{sortConfig.key === 'name' &&
										(sortConfig.direction === 'ascending' ? (
											<ChevronUp className='h-4 w-4' />
										) : (
											<ChevronDown className='h-4 w-4' />
										))}
								</button>
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
							>
								<button
									className='flex items-center space-x-1 focus:outline-none'
									onClick={() => handleSort('email')}
								>
									<span>Email</span>
									{sortConfig.key === 'email' &&
										(sortConfig.direction === 'ascending' ? (
											<ChevronUp className='h-4 w-4' />
										) : (
											<ChevronDown className='h-4 w-4' />
										))}
								</button>
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
							>
								<button
									className='flex items-center space-x-1 focus:outline-none'
									onClick={() => handleSort('createdAt')}
								>
									<span>Created</span>
									{sortConfig.key === 'createdAt' &&
										(sortConfig.direction === 'ascending' ? (
											<ChevronUp className='h-4 w-4' />
										) : (
											<ChevronDown className='h-4 w-4' />
										))}
								</button>
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
							>
								<button
									className='flex items-center space-x-1 focus:outline-none'
									onClick={() => handleSort('updatedAt')}
								>
									<span>Updated</span>
									{sortConfig.key === 'updatedAt' &&
										(sortConfig.direction === 'ascending' ? (
											<ChevronUp className='h-4 w-4' />
										) : (
											<ChevronDown className='h-4 w-4' />
										))}
								</button>
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
							>
								Roles
							</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
						{currentUsers.length > 0 ? (
							currentUsers.map(user => (
								<tr
									key={user.id}
									onClick={() =>
										setExpandedUser(
											expandedUser === user.id ? null : user.id
										)
									}
									className='hover:bg-gray-50 cursor-pointer'
								>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm font-medium text-gray-900'>
											{user.name || 'N/A'}
										</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm text-gray-500'>
											{user.email}
										</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
										{formatDate(user.createdAt)}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
										{formatDate(user.updatedAt)}
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm text-gray-500 flex flex-wrap gap-1'>
											{user.roles.length > 3 ? (
												<>
													{user.roles.slice(0, 2).map(role => (
														<span
															key={role}
															className='px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800'
														>
															{getRoleName(role)}
														</span>
													))}
													<span className='px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800'>
														+{user.roles.length - 2} more
													</span>
												</>
											) : (
												user.roles.map(role => (
													<span
														key={role}
														className='px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800'
													>
														{getRoleName(role)}
													</span>
												))
											)}
										</div>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={5}
									className='px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500'
								>
									No users found matching your filters
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Expanded user roles view */}
			{expandedUser && (
				<div className='p-4 bg-gray-50 border-t border-gray-200'>
					<h3 className='text-lg font-medium text-gray-900 mb-3'>
						User Roles
					</h3>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
						{users
							.find(user => user.id === expandedUser)
							?.roles.map(role => (
								<div
									key={role}
									className='px-3 py-2 bg-white rounded-md border border-gray-200 text-sm'
								>
									{getRoleName(role)}
								</div>
							))}
					</div>
				</div>
			)}

			{/* Pagination */}
			{users.length > usersPerPage && (
				<div className='px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
					<div className='flex-1 flex justify-between sm:hidden'>
						<button
							onClick={() =>
								setCurrentPage(prevPage => Math.max(prevPage - 1, 1))
							}
							disabled={currentPage === 1}
							className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
								currentPage === 1
									? 'bg-gray-100 text-gray-400 cursor-not-allowed'
									: 'bg-white text-gray-700 hover:bg-gray-50'
							}`}
						>
							Previous
						</button>
						<button
							onClick={() =>
								setCurrentPage(prevPage =>
									Math.min(prevPage + 1, totalPages)
								)
							}
							disabled={currentPage === totalPages}
							className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
								currentPage === totalPages
									? 'bg-gray-100 text-gray-400 cursor-not-allowed'
									: 'bg-white text-gray-700 hover:bg-gray-50'
							}`}
						>
							Next
						</button>
					</div>
					<div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
						<div>
							<p className='text-sm text-gray-700'>
								Showing{' '}
								<span className='font-medium'>
									{indexOfFirstUser + 1}
								</span>{' '}
								to{' '}
								<span className='font-medium'>
									{Math.min(indexOfLastUser, users.length)}
								</span>{' '}
								of <span className='font-medium'>{users.length}</span>{' '}
								results
							</p>
						</div>
						<div>
							<nav
								className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
								aria-label='Pagination'
							>
								<button
									onClick={() => setCurrentPage(1)}
									disabled={currentPage === 1}
									className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
										currentPage === 1
											? 'text-gray-300 cursor-not-allowed'
											: 'text-gray-500 hover:bg-gray-50'
									}`}
								>
									<span className='sr-only'>First</span>
									<span className='text-xs'>First</span>
								</button>
								<button
									onClick={() =>
										setCurrentPage(prevPage =>
											Math.max(prevPage - 1, 1)
										)
									}
									disabled={currentPage === 1}
									className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium ${
										currentPage === 1
											? 'text-gray-300 cursor-not-allowed'
											: 'text-gray-500 hover:bg-gray-50'
									}`}
								>
									<span className='sr-only'>Previous</span>
									<ChevronUp className='h-5 w-5 rotate-90' />
								</button>

								{/* Page numbers */}
								{Array.from(
									{ length: Math.min(5, totalPages) },
									(_, i) => {
										// Calculate page number based on current page
										let pageNum = currentPage
										if (currentPage <= 3) {
											pageNum = i + 1
										} else if (currentPage >= totalPages - 2) {
											pageNum = totalPages - 4 + i
										} else {
											pageNum = currentPage - 2 + i
										}

										// Only show page numbers that exist
										if (pageNum > 0 && pageNum <= totalPages) {
											return (
												<button
													key={pageNum}
													onClick={() => setCurrentPage(pageNum)}
													className={`relative inline-flex items-center px-4 py-2 border ${
														currentPage === pageNum
															? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
															: 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
													} text-sm font-medium`}
												>
													{pageNum}
												</button>
											)
										}
										return null
									}
								)}

								<button
									onClick={() =>
										setCurrentPage(prevPage =>
											Math.min(prevPage + 1, totalPages)
										)
									}
									disabled={currentPage === totalPages}
									className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium ${
										currentPage === totalPages
											? 'text-gray-300 cursor-not-allowed'
											: 'text-gray-500 hover:bg-gray-50'
									}`}
								>
									<span className='sr-only'>Next</span>
									<ChevronDown className='h-5 w-5 rotate-90' />
								</button>
								<button
									onClick={() => setCurrentPage(totalPages)}
									disabled={currentPage === totalPages}
									className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
										currentPage === totalPages
											? 'text-gray-300 cursor-not-allowed'
											: 'text-gray-500 hover:bg-gray-50'
									}`}
								>
									<span className='sr-only'>Last</span>
									<span className='text-xs'>Last</span>
								</button>
							</nav>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default UserTableClient
