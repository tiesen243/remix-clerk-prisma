import { Form } from '@remix-run/react'
import { Button } from './ui/button'

export const DeletePost: React.FC<{ id: string }> = ({ id }) => {
  return (
    <Form method="POST" action="/actions/delete-post">
      <input type="hidden" name="postId" value={id} />
      <Button type="submit">Delete Post</Button>
    </Form>
  )
}
