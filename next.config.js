/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/search',
            },
        ]
    },
}

module.exports = nextConfig
