"use client"
import { getCategoriesAll } from "@/server"
import { useEffect, useState } from "react"
import { PostCard, PostRecent, Categories } from "@/components"

const Type = ({ params }) => {
  const { slug } = params
  const [ posts, setPosts ] = useState([])
  useEffect(() => {
    getCategoriesAll(slug).then(res => {
      setPosts(res)
    })
  }, [])
  return (
    <div className="container mx-auto px-8 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="col-span-8">
          {posts.map((post) => (
            <PostCard post={post.node} key={post.node.title} isShow={true} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div>
            <PostRecent />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Type

