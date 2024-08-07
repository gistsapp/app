import { MyGistListFeature } from '@/components/feature/mygist-list-feature'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/shadcn/tooltip'
import HeaderButton from '@/components/ui/header-button'
import MenuButton from '@/components/ui/menu-button'
import Shortcut from '@/components/ui/shortcut'
import { TornadoIcon } from 'lucide-react'

interface MyGistPageProps {}

export default function MyGistsPage({}: MyGistPageProps) {
  return (
    <div className="flex flex-col flex-grow border-border rounded-lg border">
      <div className="py-4 px-6 flex flex-row justify-between items-center">
        <span>My Gists</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MenuButton icon={<TornadoIcon className="w-4 h-4" />} variant={'menu'}>
                <span>Sort by</span>
              </MenuButton>
            </TooltipTrigger>
            <TooltipContent className="flex flex-row gap-2 justify-center items-center">
              <span>Sort your gists</span>
              <Shortcut letter="S" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="h-[1px] bg-border"></div>
      <MyGistListFeature />
      <div className="h-[1px] bg-border"></div>
      <div className="p-4"></div>
    </div>
  )
}
