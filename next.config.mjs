/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_SECRET: 'Ey7nTKnggBc0bRN8WUjyShw2qzOZ6KW4fUyqcKBePxY=',
  },
  // reactStrictMode: false,
  images: {
    domains: [
      'lh3.googleusercontent.com'
    ],
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'photos.google.com',
      //   port: '',
      //   pathname: '/share/**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'lh3.googleusercontent.com',
      //   port: '',
      //   pathname: '*',
      // },
    ],
  },
};

export default nextConfig;
