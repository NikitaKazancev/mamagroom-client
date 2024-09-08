import { userAPI } from '@/api/user/user.api'

export default async function SocialAuthPage() {
	const userData = await userAPI.findCurrentUserData()

	return (
		<div className='flex flex-col items-left justify-center gap-2 m-10'>
			<span>
				<b>ID</b>: {userData.id}
			</span>
			<span>
				<b>Email</b>: {userData.email}
			</span>
			<span>
				<b>Name</b>: {userData.name}
			</span>
			<span>
				<b>Created at</b>: {userData.createdAt}
			</span>
		</div>
	)
}
