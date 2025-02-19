/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_SECRET: 'Ey7nTKnggBc0bRN8WUjyShw2qzOZ6KW4fUyqcKBePxY=',
  },
  // reactStrictMode: false,
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'photos.google.com',
      //   port: '',
      //   pathname: '/share/**',
      // },
      {
        protocol: 'https',
        hostname: 'minioapi.goxmore.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
