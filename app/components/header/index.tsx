import { Link } from '@remix-run/react'

import { Auth } from './auth'
import { ThemeToggle } from './toggle-theme'

export const Header: React.FC = () => (
  <header className="sticky inset-0 z-50 border-b bg-background/70 py-2 backdrop-blur-xl backdrop-saturate-150">
    <div className="container flex items-center justify-between gap-4">
      <Link to="/" className="text-2xl font-bold text-primary">
        Remix Blog
      </Link>

      <div className="flex items-center gap-2">
        <Auth />
        <ThemeToggle />
      </div>
    </div>
  </header>
)
