/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimizaciones de imagen
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: false,
  },
  // Deshabilitar el overlay de desarrollo en producción (automático)
  // En development aparecerá solo si hay errores
};

export default nextConfig;
