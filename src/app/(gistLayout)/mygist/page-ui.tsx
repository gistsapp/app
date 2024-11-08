import { MyGistListFeature } from '@/components/logic/mygist-list-logic'
import { SidebarTrigger } from '@/components/shadcn/sidebar'
import MenuButton from '@/components/ui/menu-button'
import { PaginationComponent } from '@/components/ui/pagination'
import TooltipShortcut, { TooltipShortcutTrigger } from '@/components/ui/tooltip-shortcut'
import { TornadoIcon } from 'lucide-react'

interface MyGistPageProps {}

export default function MyGistsPage({}: MyGistPageProps) {
  return (
    <div className="flex flex-col flex-grow h-full p-2">
      <div className="py-4 px-6 flex flex-row justify-between items-center rounded-t-lg border-border border-l border-t border-r">
        <div className="flex flex-row gap-6 items-center h-full">
          <SidebarTrigger className='w-4 h-4' />
          <div className="w-[1px] h-2/3 bg-border"></div>
          <span>My Gists</span>
        </div>
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
      <div className="p-4 rounded-b-lg border-border border-l border-b border-r">
        <PaginationComponent />
      </div>
    </div>
  )
}
