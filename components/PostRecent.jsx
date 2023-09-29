"use client";
import { useState, useEffect } from "react";
import { getRecentPosts, getSimilarPosts } from "@/server/index";


const PostRecent = ({ categories, slug }) => {
  // console.log(slug)
  // const res = await getRecentPosts()
  // console.log(res)

  const [relatedPosts, setRelatedPosts] = useState([]);

  // getRecentPosts()
  // .then(res => {
  //   setRelatedPosts([
  //     ...relatedPosts,
  //     res
  //   ])
  // })
  // getRecentPosts().then((res) => {
  //   console.log(res)
  // });
  // 若展示的帖子存在slug的话则左边的小部件显示与slug相关类型的帖子, 否则显示最近的帖子
  // 注意: useEffect 钩子的回调函数不能直接是异步函数。取而代之的是，你应该将异步操作封装在回调函数中，并确保回调函数是同步的。
  // 不能在异步组件中使用hooks
  useEffect(() => {
    if(slug) {
      getSimilarPosts(categories, slug)
        .then(res => {
          setRelatedPosts(res)
        })
    } else {
      console.log(`first`)
      getRecentPosts()
      .then(res => {
        setRelatedPosts(res)
        console.log(res)
      })
    }
  }, [slug]);
  return (
    <div className="bg-white rounded-xl px-7 pb-7">
      <div className="font-bold text-2xl font-mono text-center py-3 border-b">
        近期文章
      </div>
      {/* 展示盒子 */}
      <div>
        {/* 单条展示项目(map渲染) */}
        {relatedPosts.map((item) => (
          <div className="mt-4 flex items-center" key={item}>
            <img
              src={item.featuredImage.url}
              alt=""
              className="w-9 h-9 rounded-full"
            />
            <div className="ml-5">
              <p className="h-5">{item.title}</p>
              <p className="h-5">{item.title}</p>
              <p className="h-5">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PostRecent;
