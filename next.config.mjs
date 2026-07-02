/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: 'i0.wp.com' },
      { protocol: 'https', hostname: 'www.middleeastmonitor.com' },
      { protocol: 'https', hostname: 'static.srpcdigital.com' },
      { protocol: 'https', hostname: 'files.modern.az' },
      { protocol: 'https', hostname: 'img.lemde.fr' }
    ],
  },
};

export default nextConfig;
