import { SignedIn, SignedOut, UserButton } from '@clerk/remix'
import { Link } from '@remix-run/react'
import { dark, experimental__simple as light } from '@clerk/themes'
import { Theme, useTheme } from 'remix-themes'

export const Auth: React.FC = () => {
  const [theme] = useTheme()

  return (
    <>
      <SignedIn>
        <UserButton appearance={{ baseTheme: theme === Theme.DARK ? dark : light }} />
      </SignedIn>

      <SignedOut>
        <Link to="/sign-in">Sign In</Link>
      </SignedOut>
    </>
  )
}
