"use client";
import moment from "moment/moment";
import Link from "next/link";

import { useState, useEffect } from "react";
import { getRecentPosts, getSimilarPosts } from "@/server/index";

const PostRecent = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  // 若展示的帖子存在slug的话则左边的小部件显示与slug相关类型的帖子, 否则显示最近的帖子
  // 注意: useEffect 钩子的回调函数不能直接是异步函数。取而代之的是，你应该将异步操作封装在回调函数中，并确保回调函数是同步的。不能在异步组件中使用hooks
  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((res) => {
        setRelatedPosts(res);
      });
    } else {
      getRecentPosts().then((res) => {
        setRelatedPosts(res);
      });
    }
  }, [slug]);
  return (
    <>
      {/* 近期文章 */}
      <div className="bg-white rounded-xl px-7 pb-7 mb-8 border-8 border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
        <div className="font-bold text-2xl font-mono text-center py-3 border-b">
          近期文章
        </div>
        {/* 展示盒子 */}
        <div>
          {/* 单条展示项目(map渲染) */}
          {relatedPosts.map((item) => (
            <Link key={item.title} href={`/posts/${item.slug}`}>
              <div className="mt-4 flex text-white dark:text-gray-300 items-center transition ease-in-out delay-150 bg-blue-400 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-400 duration-300 rounded-lg px-3 py-2 dark:bg-blue-900">
                <img
                  src={item.featuredImage.url}
                  alt=""
                  className="w-12 h-12 rounded-full mt-0 mb-0"
                />
                <div className="ml-5">
                  <span className="h-5 text-lg font-medium">{item.title}</span>
                  {/* <span className="h-5 text-lg">({item.author.name})</span> */}
                  <p className="h-5 italic text-sm">
                    {moment(item.createdAt).format("YYYY-MM-DD")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
export default PostRecent;
