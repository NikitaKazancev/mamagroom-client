import { SERVER_PATH } from '@/api/instances'
import { Language } from '@/i18n'
import Image from 'next/image'
import Link from 'next/link'

export default async function AdminAuth({
	params,
}: {
	params: { locale: Language }
}) {
	return (
		<div className='width-full m-28 flex flex-col items-center justify-center gap-5'>
			<Link
				href={`${SERVER_PATH}/auth/google`}
				className='flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50'
			>
				<Image
					src='/google.svg'
					width={20}
					height={20}
					alt='google auth'
					className='w-5 h-5'
				/>
			</Link>
			<Link
				href={`${SERVER_PATH}/auth/github`}
				className='flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50'
			>
				<Image
					src='/github.svg'
					width={20}
					height={20}
					alt='github auth'
					className='w-5 h-5'
				/>
			</Link>
		</div>
	)
}
