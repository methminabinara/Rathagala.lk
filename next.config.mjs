import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rathagala.s3.ap-south-1.amazonaws.com"
      },
      {
        protocol: "https",
        hostname: "kidlink.s3.ap-south-1.amazonaws.com"
      }
    ]
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  // Fix for "Unable to find lambda for route" error in Vercel deployment
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/core-linux-x64-gnu',
      'node_modules/@swc/core-linux-x64-musl',
      'node_modules/@esbuild/linux-x64',
    ],
  },
  // Externalize Sharp package to reduce lambda size
  serverExternalPackages: ['sharp']
};

export default withPlaiceholder(nextConfig);
