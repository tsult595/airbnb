import type { NextConfig } from "next";

const allowedDomains = [
  "encrypted-tbn0.gstatic.com", "sonxeber.az", "apa.az", "report.az",
  "oxu.az", "trend.az", "azvision.az", "aznews.az", "azxeber.com",
  "i0.wp.com", "aznews24.az", "qafqazinfo.az", "images.oxu.az",
  "unsplash.com", "images.unsplash.com"
];

const nextConfig: NextConfig = {
    images: {
    remotePatterns: allowedDomains.map((domain) => ({
      protocol: 'https',
      hostname: domain,
      pathname: '/**',
    })),
  },
};

export default nextConfig;
