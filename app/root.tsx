import type { MetaFunction } from '@remix-run/node'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { ThemeProvider } from 'next-themes'

import '@/globals.css'

export const meta: MetaFunction = () => [
  { title: 'Very cool app | Remix' },
  { property: 'og:title', content: 'Very cool app' },
  { name: 'description', content: 'This app is the best' },
]

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="en" suppressHydrationWarning>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body>
      {children}
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
)

const App: React.FC = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
    <main className="container my-4">
      <Outlet />
    </main>
  </ThemeProvider>
)

export default App
