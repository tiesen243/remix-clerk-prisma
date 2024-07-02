import { useUser } from '@clerk/remix'
import { Form, useActionData, useNavigation } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

import { type ActionData } from '@/routes/_index'
import { FormField } from './form-field'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

export const CreatePost: React.FC = () => {
  const { user } = useUser()
  const formRef = useRef<HTMLFormElement>(null)

  const navigation = useNavigation()

  const action = useActionData<ActionData>()

  useEffect(() => {
    if (navigation.state !== 'loading') return
    if (action?.message) {
      toast.success(action.message)
      formRef.current?.reset()
    }
  }, [navigation.state, action?.message])

  return (
    <Form method="post" ref={formRef} className="mb-4 space-y-4">
      <FormField name="title" label="Title" message={action?.fieldErrors.title?.at(0)} />
      <FormField
        name="content"
        label="Content"
        message={action?.fieldErrors.content?.at(0)}
        asChild
      >
        <Textarea />
      </FormField>

      <input type="hidden" name="userId" value={user?.id ?? ''} />

      <Button className="w-full" isLoading={navigation.state === 'submitting'}>
        Submit
      </Button>
    </Form>
  )
}
