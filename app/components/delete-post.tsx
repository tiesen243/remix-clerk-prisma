import { Form, useNavigation } from '@remix-run/react'

import { Button } from '@/components/ui/button'

export const DeletePost: React.FC<{ id: string }> = ({ id }) => {
  const navigation = useNavigation()

  // check if navigation.location is equal to '/actions/delete-post?postId=${id}' and if it is, return the following:
  // navigation.state is equal to 'submitting' and the following:
  const isPending =
    navigation.location?.pathname === `/actions/delete-post/${id}` &&
    navigation.state === 'submitting'

  return (
    <Form method="POST" action={`/actions/delete-post/${id}`}>
      <input type="hidden" name="postId" value={id} />
      <Button variant="destructive" className="w-full" isLoading={isPending}>
        Delete Post
      </Button>
    </Form>
  )
}
