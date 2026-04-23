import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Esto crea una ruta falsa en tu localhost que apunta al servidor real
        source: '/api-remota/:path*',
        destination: 'https://www.rutasgo.com/rutasgov2/api/:path*',
      },
    ];
  },
};

export default nextConfig;