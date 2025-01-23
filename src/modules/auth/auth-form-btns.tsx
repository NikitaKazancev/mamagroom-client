import { SERVER_URL } from '@/api/request'
import { Button } from '@/ui/button/button'
import { GithubIcon } from '@/ui/icons/github/github'
import { GoogleIcon } from '@/ui/icons/google/google'
import { YandexIcon } from '@/ui/icons/yandex/yandex'
import Link from 'next/link'

export const AuthFormBtns = ({ btnStyle }: { btnStyle: string }) => {
	return (
		<>
			<Link href={`${SERVER_URL}/auth/yandex`}>
				<Button Icon={<YandexIcon />} theme='dark' className={btnStyle} />
			</Link>
			<Link href={`${SERVER_URL}/auth/google`}>
				<Button Icon={<GoogleIcon />} theme='dark' className={btnStyle} />
			</Link>
			<Link href={`${SERVER_URL}/auth/github`}>
				<Button Icon={<GithubIcon />} theme='dark' className={btnStyle} />
			</Link>
		</>
	)
}
