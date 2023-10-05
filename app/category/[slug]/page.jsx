"use client"
import { getCategoriesAll } from "@/server"
import { useEffect, useState } from "react"
import { PostCard, PostRecent, Categories } from "@/components"

const Type = ({ params }) => {
  const { slug } = params
  const [ posts, setPosts ] = useState([])
  const [ index, setIndex ] = useState(0)

  useEffect(() => {
    getCategoriesAll(slug).then(res => {
      setPosts(res)
    })
  }, [])

  const handleShowMore = () => {
    setIndex(preIndex => preIndex + 3)
  }

  return (
    <div className="container mx-auto px-8 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="col-span-8 text-center">
          {posts.slice(0, index + 3).map((post) => (
            <PostCard post={post.node} key={post.node.title} isShow={true} />
          ))}
          <button className="bg-green-700 text-white text-lg transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-28 h-10 rounded-md" onClick={handleShowMore}>显示更多</button>
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

