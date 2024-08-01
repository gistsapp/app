import { Button } from '@/components/ui/button'

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 w-96 h-screen p-2">
      <h2>Log in to Gists</h2>
      <div className="flex flex-col gap-4 w-full">
        <Button>Log in with Email</Button>
        <Button variant={'secondary'}>Log in with GitHub</Button>
        <Button variant={'secondary'}>Log in with Google</Button>
      </div>
    </div>
  )
}
