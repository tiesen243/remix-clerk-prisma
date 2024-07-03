import { useUser } from '@clerk/remix'
import { redirect, type ActionFunctionArgs } from '@remix-run/node'
import { Form, useActionData, useNavigation } from '@remix-run/react'
import { z } from 'zod'

import { FormField } from '@/components/form-field'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { db } from '@/lib/db'

export const action = async (args: ActionFunctionArgs) => {
  const schema = z.object({
    userId: z.string(),
    title: z.string().min(1),
    content: z.string().min(1),
  })
  const parsed = schema.safeParse(Object.fromEntries(await args.request.formData()))

  if (!parsed.success) return { success: false, fieldErrors: parsed.error.flatten().fieldErrors }

  await db.todo.create({ data: parsed.data })

  return redirect('/')
}

const CreatePost: React.FC = () => {
  const { user } = useUser()

  const navigation = useNavigation()
  const isPending = navigation.state === 'submitting'

  const mutate = useActionData<typeof action>()

  return (
    <Form method="post" className="mb-4 space-y-4">
      <FormField
        name="title"
        label="Title"
        message={mutate?.fieldErrors.title?.at(0)}
        disabled={isPending}
      />

      <FormField
        name="content"
        label="Content"
        message={mutate?.fieldErrors.content?.at(0)}
        disabled={isPending}
        asChild
      >
        <Textarea />
      </FormField>

      <input type="hidden" name="userId" value={user?.id ?? ''} />

      <Button className="w-full" isLoading={isPending}>
        Submit
      </Button>
    </Form>
  )
}

export default CreatePost
