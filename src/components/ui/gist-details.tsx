import { Badge } from "@/components/shadcn/badge"
import { Input } from "@/components/shadcn/input"
import MenuButton from "@/components/ui/menu-button"
import { Gist } from "@/types"
import { ChevronRightIcon, DownloadIcon, ExternalLinkIcon, ShareIcon, Trash2Icon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Codearea } from "../shadcn/codearea"
import { getLanguage } from "@/lib/language"
import TooltipShortcut, { TooltipShortcutTrigger } from "./tooltip-shortcut"
import { getBackendURL } from "@/lib/utils"
import { SidebarTrigger } from "../shadcn/sidebar"

interface GistDetailsProps {
  gist: Gist
  orgName: string
  redirect?: boolean
  onDownload: (name: string, code: string) => void
  onShare: () => void
  onDelete: (id: string) => void
  onSave: (name: string, code: string) => void
}

export default function GistDetails({
  gist,
  orgName,
  redirect,
  onDownload,
  onShare,
  onDelete,
  onSave,
}: GistDetailsProps) {
  const [gistId] = useState(gist.id)
  const [gistName, setGistName] = useState(gist.name)
  const [gistCode, setGistCode] = useState(gist.code)

  const gistState: Gist = {
    id: gistId,
    name: gistName,
    code: gistCode,
  }

  const onOpenPlainText = (gistID: string) => {
    // if production go to https://raw.gists.app/{gistID}
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === "production") {
      const raw_url = getBackendURL().replace("api", "raw") + "/" + gistID
      window.open(raw_url, "_blank")
      return
    }
    window.open(getBackendURL() + "/gists/raw/" + gistID, "_blank")
  }

  return (
    <div className="flex flex-col w-full h-full p-2">
      <Header
        gist={gistState}
        orgName={orgName}
        redirect={redirect}
        onDownload={() => onDownload(gistName, gistCode)}
        onOpenPlainText={onOpenPlainText}
      />
      <div className="h-[1px] bg-border"></div>
      <div className="h-full flex flex-col gap-6 p-6 border-border border-r border-l">
        <div className="flex flex-col gap-6 group">
          <Badge variant="section" className="w-fit">
            File name
          </Badge>
          <Input
            placeholder="Enter your gist name here"
            value={gistName}
            onChange={(e) => setGistName(e.target.value)}
            className="rounded-none"
          />
        </div>
        <div className="h-full flex flex-col gap-6 group">
          <Badge variant="section" className="w-min">
            Code
          </Badge>
          <div className="flex h-full">
            <Codearea
              placeholder="Enter your code here"
              value={gistCode}
              onChange={(e) => setGistCode(e.target.value)}
              className="rounded-none h-full overflow-y-auto w-full"
              language={getLanguage(gistName)}
            />
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-border"></div>
      <div className="py-4 px-6 flex flex-row justify-between items-center rounded-b-lg border-border border-l border-b border-r">
        <TooltipShortcut tooltip="Delete" shortcuts={["Del"]}>
          <TooltipShortcutTrigger>
            <MenuButton onClick={() => onDelete(gistId)} variant={"menu"} icon={<Trash2Icon className="w-4 h-4" />}>
              <span>Delete</span>
            </MenuButton>
          </TooltipShortcutTrigger>
        </TooltipShortcut>
        <div className="flex flex-row gap-4">
          <TooltipShortcut tooltip="Share" shortcuts={["Ctrl", "Shft", "S"]}>
            <TooltipShortcutTrigger>
              <MenuButton className="flex" onClick={onShare} icon={<ShareIcon className="w-4 h-4" />} variant={"menu"}>
                <span>Share</span>
              </MenuButton>
            </TooltipShortcutTrigger>
          </TooltipShortcut>
          <TooltipShortcut tooltip="Save" shortcuts={["Ctrl", "S"]}>
            <TooltipShortcutTrigger>
              <MenuButton onClick={() => onSave(gistName, gistCode)} variant={"menu"}>
                <span>Save</span>
              </MenuButton>
            </TooltipShortcutTrigger>
          </TooltipShortcut>
        </div>
      </div>
    </div>
  )
}

interface HeaderProps {
  gist: Gist
  orgName: string
  redirect?: boolean
  onDownload: (name: string, code: string) => void
  onOpenPlainText?: (gistID: string) => void
}

function Header({ gist, orgName, redirect, onDownload, onOpenPlainText }: HeaderProps) {
  return (
    <div className="py-4 px-6 flex flex-row justify-between items-center rounded-t-lg border-border border-l border-t border-r">
      <div className="flex flex-row gap-6 items-center h-full">
        <SidebarTrigger className="w-4 h-4" />
        <div className="w-[1px] h-2/3 bg-border"></div>
        <div className="flex flex-row gap-2 justify-center items-center">
          {redirect ? (
            <Link href="/mygist" className="hover:underline">
              {orgName}
            </Link>
          ) : (
            <span>{orgName}</span>
          )}
          <ChevronRightIcon className="w-4 h-4" />
          <span>{gist.name}</span>
        </div>
      </div>

      <div className="flex flex-row">
        {onOpenPlainText && (
          <TooltipShortcut tooltip="Open as plain text" shortcuts={["Ctrl", "P"]}>
            <TooltipShortcutTrigger>
              <MenuButton
                className="flex"
                onClick={() => onOpenPlainText(gist.id)}
                icon={<ExternalLinkIcon className="w-4 h-4" />}
                variant={"header"}
              >
                <span>Raw</span>
              </MenuButton>
            </TooltipShortcutTrigger>
          </TooltipShortcut>
        )}
        <TooltipShortcut tooltip="Download" shortcuts={["Ctrl", "D"]}>
          <TooltipShortcutTrigger>
            <MenuButton
              className="flex"
              onClick={() => onDownload(gist.name, gist.code)}
              icon={<DownloadIcon className="w-4 h-4" />}
              variant={"header"}
            >
              <span>Download</span>
            </MenuButton>
          </TooltipShortcutTrigger>
        </TooltipShortcut>
      </div>
    </div>
  )
}
