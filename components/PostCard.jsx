import moment from "moment/moment";
import Link from "next/link";

const PostCard = ({ post, isShow }) => {
  console.log(post)
  return (
    // 总容器
    <div className=" bg-gray-50 p-6 rounded-xl shadow-lg mb-10">
      {/* 图片 */}
      <div className="w-full mb-5">
        <img
          src={post?.featuredImage.url}
          alt={post?.title}
          className="w-full h-96 rounded-xl"
        />
      </div>
      {/* 头像作者日期 */}
      <div className="flex items-center italic text-gray-600 text-2xl mb-8">
        <img
          src={post?.author.photo.url}
          alt={post?.author.name}
          className="rounded-full w-9 h-9 mr-4"
        />
        <p className="mr-5 text-lg">{post?.author.name}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline mr-2 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-lg">
          {moment(post?.createdAt).format("YYYY-MM-DD")}
        </span>
      </div>
      {/* 标题 */}
      <div className="text-4xl font-bold mb-8">{post?.title}</div>
      {/* 显示主页和指定帖子根据isShow */}
      {isShow ? (
        <div>
          {/* 概述 */}
          <div className="mb-5">{post?.excerpt}</div>
          {/* 按钮 */}
          <div className="w-full text-center text-white">
            <Link href={`posts/${post?.slug}`}>
              <button className="text-lg transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-28 h-10 rounded-md">
                愿闻其详
              </button>
            </Link>
          </div>
        </div>
      ) : (
        // 正文
        <div>
          {post?.content.text}
        </div>
      )}
    </div>
  );
};
export default PostCard;
