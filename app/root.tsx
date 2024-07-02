import { ClerkApp } from '@clerk/remix'
import { rootAuthLoader } from '@clerk/remix/ssr.server'
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'
import clsx from 'clsx'
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from 'remix-themes'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import { themeSessionResolver } from '@/lib/theme'

import '@/globals.css'

export const loader = async (args: LoaderFunctionArgs) =>
  rootAuthLoader(args, async ({ request }) => {
    const { getTheme } = await themeSessionResolver(request)
    return { theme: getTheme() }
  })

export const meta: MetaFunction = () => [
  {
    charSet: 'utf-8',
    title: 'Remix Clerk Prisma',
    description: 'A starter for Remix with Clerk and Prisma',
  },
]

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

function App() {
  const data = useLoaderData<typeof loader>()
  const [theme] = useTheme()

  return (
    <html lang="en" className={clsx(theme)} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>

      <body className="flex min-h-dvh flex-col">
        <Header />

        <main className="container my-4 flex-1">
          <Outlet />
        </main>

        <Footer />

        <Toaster />

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default ClerkApp(App)
