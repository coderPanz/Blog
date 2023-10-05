"use client"
import { useState, useEffect } from "react";
import { PostCard, Categories, PostRecent, Profile } from "../components/index";
import { getPosts, getAuthor } from "@/server";

// 在 Next.js 中，getStaticProps 是一个特殊的静态生成函数，用于在构建时获取页面所需的数据。它会在服务器端运行，并将返回的数据作为 props 参数传递给页面组件。
// 在新版的app路由中使用fetch方法代替page路由的中，getStaticProps方法

export default function Home() {

  const [ index, setIndex ] = useState(0)
  const [ res, setRes ] = useState([])
  const [ author, setAuthor ] = useState({})

  const handleShowMore = () => {
    setIndex(preIndex => preIndex + 3)
  }

  useEffect(() => {
    (async () => {
      const res = await getPosts()
      const author = await getAuthor()
      setRes(res)
      setAuthor(author)
    })()
  }, [])

  return (
    <div className="container mx-auto px-8 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="col-span-8 text-center">
          {/* 在主页仅显示前三个帖子 */}
          {res.slice(0, index + 3).map((post) => (
            <PostCard post={post.node} key={post.node.title} isShow={true} />
          ))}
          <button className="bg-green-700 text-white text-lg transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-28 h-10 rounded-md" onClick={handleShowMore}>显示更多</button>
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div>
            <Profile author={author} posts={res.length} />
            <PostRecent />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
