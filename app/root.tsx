import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'

import { Header } from '@/components/header'
import '@/globals.css'
import { themeSessionResolver } from './sessions.server'
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from 'remix-themes'
import clsx from 'clsx'

export const meta: MetaFunction = () => [
  { title: 'Very cool app | Remix' },
  { property: 'og:title', content: 'Very cool app' },
  { name: 'description', content: 'This app is the best' },
]

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request)
  return { theme: getTheme() }
}

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const data = useLoaderData<typeof loader>()

  return (
    <ThemeProvider
      specifiedTheme={data.theme}
      themeAction="/actions/set-theme"
      disableTransitionOnThemeChange
    >
      {children}
    </ThemeProvider>
  )
}

const App: React.FC = () => {
  const [theme] = useTheme()

  return (
    <html lang="en" className={clsx(theme)} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        <Header />

        <main className="container my-4">
          <Outlet />
        </main>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default App
