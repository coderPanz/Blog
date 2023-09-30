// 获取slug, 进入对应slug的帖子
"use client";
import { getAppointPost } from "@/server";
import { useEffect, useState } from "react";
import { PostCard, PostRecent, Categories } from "@/components";
// 动态的部分作为params传递到该组件, 详情参见:
// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes

const Page = ({ params }) => {
  const [post, setPost] = useState(null);
  const { slug } = params;

  // 当进入不同的帖子时, 传进来的slug也会不同, slug发生变化则重新获取数据
  useEffect(() => {
    getAppointPost(slug).then((res) => setPost(res));
  }, [slug]);

  return (
    <div className="container mx-auto px-8 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="col-span-8">
          <PostCard post={post} isShow={false}/>
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
};

export default Page;
