import { Moon, Sun } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'

const themes = ['light', 'dark', 'system']

export function ModeToggle() {
  const [theme, setThemeState] = React.useState<'light' | 'dark' | 'system'>(
    'light',
  )

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setThemeState(isDarkMode ? 'dark' : 'light')
  }, [])

  React.useEffect(() => {
    const isDark =
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark')
  }, [theme])

  const onChangeTheme = (theme: any) => {
    setThemeState(theme)
    localStorage.setItem('theme', theme)
  }

  const onNextTheme = () => {

    const currentIndex = themes.indexOf(theme)
    if (currentIndex === -1) {
      return themes[0]
    }

    // Get the next theme, cycling back to the first if at the end
    setThemeState(themes[(currentIndex + 1) % themes.length] as 'light' | 'dark' | 'system')
  }

  return (
    <Button variant="outline" size="icon" onClick={() => onNextTheme()}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant="outline" size="icon">
    //       <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    //       <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    //       <span className="sr-only">Toggle theme</span>
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end">
    //     <DropdownMenuItem onClick={() => onChangeTheme('light')}>
    //       Light
    //     </DropdownMenuItem>
    //     <DropdownMenuItem onClick={() => onChangeTheme('dark')}>
    //       Dark
    //     </DropdownMenuItem>
    //     <DropdownMenuItem onClick={() => onChangeTheme('system')}>
    //       System
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  )
}
