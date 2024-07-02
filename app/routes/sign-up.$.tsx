import { SignUp } from '@clerk/remix'
import { dark, experimental__simple as light } from '@clerk/themes'
import { Theme, useTheme } from 'remix-themes'

const Page = () => {
  const [theme] = useTheme()

  return (
    <div className="flex min-h-[80dvh] items-center justify-center">
      <SignUp appearance={{ baseTheme: theme === Theme.DARK ? dark : light }} />
    </div>
  )
}

export default Page
