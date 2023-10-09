import Link from "next/link";
const Profile = ({ author, posts }) => {
  return (
    <>
      {/* 作者简介 */}
      <div className="bg-white rounded-xl px-7 pb-7 mb-8 border-8 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700">
        {/* 标题 */}
        <div className="font-bold text-2xl font-mono text-center py-3 border-b dark:text-gray-300">
          作者简介
        </div>
        {/* 头像和名字,研究方向,帖子数 */}
        <Link href={'https://github.com/coderPanz'}>
          <div className="mt-4 flex items-center dark:text-gray-300">
            <img
              src={author.photo?.url}
              alt={author.name}
              className="rounded-full w-12 h-12 mr-4 mt-1 mb-1"
            />
            <div>
              <p className="italic text-xl">{author.name}</p>
              <div className="flex items-center">
                <span className="bg-blue-500 px-1 text-white w-auto h-5 text-sm text-center rounded">前端开发</span>
                <span className="bg-green-600 px-1 ml-2 mr-5 text-white w-auto h-5 text-sm text-center rounded">{`帖子数量-${posts}`}</span>
                <img className="w-28 mt-0 mb-0" src="https://skillicons.dev/icons?i=next,graphql,react,tailwind" />
              </div>
            </div>
          </div>
        </Link>
        <div className="flex mt-2">
        </div>
        {/* bio */}
        <div className="mt-4 text-lg italic bg-gray-100 rounded-lg p-4 dark:bg-gray-800 dark:text-gray-300">
          {author.bio}
        </div>
      </div>
    </>
  );
}
export default Profile