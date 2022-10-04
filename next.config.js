/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	eslint: {
		dirs: ['src', 'tests'],
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://localhost:3001/api/:path*',
			},
		]
	},
}

module.exports = nextConfig