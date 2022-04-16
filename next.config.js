/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			'avatars.planningcenteronline.com',
			'lh3.googleusercontent.com',
		],
	},
};

module.exports = nextConfig;
