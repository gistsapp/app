import { Metadata } from 'next'
import GistDetailsWrapper from '@/components/feature/gist-details-wrapper'

export const metadata: Metadata = {
  metadataBase: new URL('https://gists.app'),
  keywords: [
    'gists',
    'app',
    'code snippets',
    'code sharing',
    'developer tools',
    'programming',
    'collaboration',
    'open source',
    'project management',
    'code editor',
    'gist platform',
    'coding platform',
    'software development',
    'team collaboration',
    'version control',
    'code storage',
  ],
  title: 'Gists',
  openGraph: {
    description: 'Gists is a platform for sharing code snippets and collaborating on projects',
    images: [''],
  },
}

export default function HomePage() {
  return (
    <div className="w-full h-screen flex flex-row p-2">
      <script defer src="https://cloud.umami.is/script.js" data-website-id="0e9bcd71-c239-4666-9b8e-a7c9e99ae235"></script>
      <GistDetailsWrapper />
    </div>
  )
}
