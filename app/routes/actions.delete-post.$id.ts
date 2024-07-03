import { db } from '@/lib/db'
import { redirect, type ActionFunctionArgs } from '@remix-run/node'

export const action = async ({ request }: ActionFunctionArgs) => {
  const postId = new URL(request.url).pathname.split('/').pop()

  if (typeof postId !== 'string') return redirect('/', { status: 400 })

  await db.todo.delete({ where: { id: postId } })

  return redirect('/')
}
