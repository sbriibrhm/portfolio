"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Calendar,
  Home,
  User,
  Mail,
  Moon,
  Sun,
  Download,
  BookOpen,
} from "lucide-react"
import { useTheme } from "next-themes"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

const CommandPaletteContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
}>({
  open: false,
  setOpen: () => {},
})

export function useCommandPalette() {
  return React.useContext(CommandPaletteContext)
}

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen }}>
      {children}
    </CommandPaletteContext.Provider>
  )
}

export function CommandPalette() {
  const { open, setOpen } = useCommandPalette()
  const router = useRouter()
  const { setTheme, theme } = useTheme()

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [setOpen])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => runCommand(() => {
              const target = document.getElementById("home")
              if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            })}
          >
            <Home />
            <span>Home</span>
            <CommandShortcut>⌘H</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => {
              const target = document.getElementById("about")
              if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            })}
          >
            <User />
            <span>About</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/experience"))}
          >
            <Calendar />
            <span>Experience</span>
            <CommandShortcut>⌘E</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/blog"))}
          >
            <BookOpen />
            <span>Blog</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => {
              window.location.href = "mailto:sbriibrhm@gmail.com"
            })}
          >
            <Mail />
            <span>Contact</span>
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => runCommand(() => {
              window.open("/resume.pdf", "_blank")
            })}
          >
            <Download />
            <span>Download Resume</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem
            onSelect={() => runCommand(() => {
              setTheme(theme === "dark" ? "light" : "dark")
            })}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
            <span>Toggle Theme</span>
            <CommandShortcut>⌘T</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

