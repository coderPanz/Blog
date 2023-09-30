import { PostCard, Categories, PostRecent } from "../components/index";
import { getPosts } from "@/server";

// 在 Next.js 中，getStaticProps 是一个特殊的静态生成函数，用于在构建时获取页面所需的数据。它会在服务器端运行，并将返回的数据作为 props 参数传递给页面组件。
// 在新版的app路由中使用fetch方法代替page路由的中，getStaticProps方法

export default async function Home() {

  const res = (await getPosts()) || []

  return (
    <div className="container mx-auto px-8 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="col-span-8">
          {res.map((post) => (
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
  );
}
