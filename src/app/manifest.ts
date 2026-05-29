import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Green Gate MENA',
    short_name: 'Green Gate',
    description:
      "The MENA region's gateway to climate and environmental opportunities.",
    start_url: '/',
    display: 'standalone',
    background_color: '#fbf8f1',
    theme_color: '#00796b',
    icons: [
      {
        src: '/logo/logo-mark-color.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/logo/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
    ],
  }
}
