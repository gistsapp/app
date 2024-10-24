import { MyGistListFeature } from '@/components/logic/mygist-list-logic'
import MenuButton from '@/components/ui/menu-button'
import { PaginationComponent } from '@/components/ui/pagination'
import TooltipShortcut, { TooltipShortcutTrigger } from '@/components/ui/tooltip-shortcut'
import { TornadoIcon } from 'lucide-react'

interface MyGistPageProps {}

export default function MyGistsPage({}: MyGistPageProps) {
  return (
    <div className="flex flex-col flex-grow border-border rounded-lg border">
      <div className="py-4 px-6 flex flex-row justify-between items-center">
        <span>My Gists</span>
        <TooltipShortcut tooltip="Sort your gists" shortcuts={['S']}>
          <TooltipShortcutTrigger>
            <MenuButton icon={<TornadoIcon className="w-4 h-4" />} variant={'menu'}>
              <span>Sort by</span>
            </MenuButton>
          </TooltipShortcutTrigger>
        </TooltipShortcut>
      </div>
      <div className="h-[1px] bg-border"></div>
      <MyGistListFeature />
      <div className="h-[1px] bg-border"></div>
      <div className="p-4">
        <PaginationComponent />
      </div>
    </div>
  )
}
