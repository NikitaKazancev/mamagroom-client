import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '8080',
				pathname: '/api/static/**',
			},
			{
				protocol: 'https',
				hostname: 'mamagroom.ru',
				port: '80',
				pathname: '/api/static/**',
			},
		],
	},
}

export default withNextIntl(nextConfig)
