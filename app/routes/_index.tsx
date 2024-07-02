import type { ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { z } from 'zod'

import { CreatePost } from '@/components/create-post'
import { clerkClient } from '@/lib/clerk'
import { db } from '@/lib/db'
import { DeletePost } from '@/components/delete-post'

export const loader = async () => {
  const posts = await db.todo.findMany()

  return posts.map((post) => ({
    ...post,
    author: clerkClient.users.getUser(post.userId),
  }))
}

export const action = async (args: ActionFunctionArgs) => {
  const schema = z.object({
    userId: z.string(),
    title: z.string().min(1),
    content: z.string().min(1),
  })
  const parsed = schema.safeParse(Object.fromEntries(await args.request.formData()))

  if (!parsed.success) return { message: '', fieldErrors: parsed.error.flatten().fieldErrors }

  await db.todo.create({ data: parsed.data })

  return { message: 'Post created!', fieldErrors: {} }
}

export type ActionData = typeof action

const Page: React.FC = () => {
  const posts = useLoaderData<typeof loader>()

  return (
    <div>
      <CreatePost />

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <li key={post.id} className="rounded-lg border p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-bold">{post.title}</h3>
            <p className="">{post.content}</p>

            <DeletePost id={post.id} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Page
