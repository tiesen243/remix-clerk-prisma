import { MoonIcon, SunIcon } from 'lucide-react'
import { Theme, useTheme } from 'remix-themes'

import { Button } from '@/components/ui/button'

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useTheme()

  const toggleTheme = () => setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)

  return (
    <Button onClick={toggleTheme} variant="ghost" size="icon">
      {theme === Theme.DARK ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
