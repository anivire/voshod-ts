import Icons from "unplugin-icons/webpack";

/** @type {import('next').NextConfig} */
export default {
  webpack(config) {
    config.plugins.push(
      Icons({
        compiler: "jsx",
        jsx: "react",
      }),
    );

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'test.taxivoshod.ru',
        port: '',
      }
    ],
  },
  env: {
    API_URL: process.env.API_URL
  }
};
