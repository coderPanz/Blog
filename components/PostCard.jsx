import Image from "next/image"

const PostCard = ({ post }) => {
  return (
    // 总容器
    <div className=" bg-gray-50 p-5 rounded-lg">
      {/* 图片 */}
      <div className="w-full">
        <Image 
          alt={post.title}
          src={post.featuredImage.url}
          width={80}
          height={80}
        />
      </div>
      {/* 头像作者日期 */}
      <div>
        <Image 
          alt={post.author.name}
          src={post.author.photo.url}
          width={30}
          height={30}
        />
        <p>{post.author.name}</p>
        <span>{post.createdAt}</span>
      </div>
      {/* 标题 */}
      <div>{post.title}</div>
      {/* 概述 */}
      <div>{post.excerpt}</div>
    </div>
  )
}
export default PostCard