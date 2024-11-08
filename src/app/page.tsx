import GistsLandingLogic from '@/components/logic/gists-landing-logic'

export default function HomePage() {
  return (
    <div className="w-full min-h-dvh sm:min-h-screen flex flex-row p-2">
      <script defer src="https://cloud.umami.is/script.js" data-website-id="0e9bcd71-c239-4666-9b8e-a7c9e99ae235"></script>
      <GistsLandingLogic />
    </div>
  )
}
