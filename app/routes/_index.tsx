import { Link, useLoaderData } from '@remix-run/react'

import { DeletePost } from '@/components/delete-post'
import { Button } from '@/components/ui/button'
import { clerkClient } from '@/lib/clerk'
import { db } from '@/lib/db'

export const loader = async () => {
  const posts = await db.todo.findMany()

  return posts.map((post) => ({
    ...post,
    author: clerkClient.users.getUser(post.userId),
  }))
}

const Page: React.FC = () => {
  const posts = useLoaderData<typeof loader>()

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Button className="w-fit" asChild>
          <Link to="/create-post">Create Post</Link>
        </Button>
      </div>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <li key={post.id} className="rounded-lg border p-6 shadow-lg">
            <h3 className="mb-2 text-2xl font-bold">{post.title}</h3>
            <p className="mb-6">{post.content}</p>

            <DeletePost id={post.id} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Page
