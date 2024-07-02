import { Slot } from '@radix-ui/react-slot'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  message?: string
  asChild?: boolean
}

export const FormField: React.FC<FormFieldProps> = ({
  label = '',
  message = '',
  className = '',
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : Input

  return (
    <fieldset className={cn('space-y-2', className)}>
      {label && <Label htmlFor={props.name}>{label}</Label>}
      <Comp {...props} />
      <small className="text-sm text-destructive">{message}</small>
    </fieldset>
  )
}
