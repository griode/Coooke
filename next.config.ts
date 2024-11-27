import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    env: {
        API_KEY: process.env.API_KEY,
        AUTH_DOMAIN: process.env.AUTH_DOMAIN,
        PROJECT_ID: process.env.PROJECT_ID,
        STORAGE_BUCKET: process.env.STORAGE_BUCKET,
        MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
        APP_ID: process.env.APP_ID,
        MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    },
  /* config options here */
  images: {
      domains: ["firebasestorage.googleapis.com", "lh3.googleusercontent.com"],
  },
};

export default nextConfig;
