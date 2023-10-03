"use client"
import moment from "moment";
import { getComments } from "@/server";
import { useEffect, useState } from "react";

const Comment = ({ slug }) => {
  const [ comments, setComments ] = useState([])

  useEffect(() => {
    (async () => {
      const res = await getComments(slug)
      setComments(res)
    })()
  }, [])

  return (
    // 评论区
    <div className="mt-8 bg-gray-50 p-6 rounded-xl">
      {/* 标题 */}
      <div className="font-semibold text-2xl italic">评论区</div>
      {/* 评论列表 */}
      <div className='bg-gray-200 rounded-lg mt-5 p-2'>
        {comments.map((comment, index) => (
          <div key={index} className="px-4 mb-3">
            {/* name and date */}
            <div className="flex h-8 items-center justify-between">
              <span className="font-medium italic text-xl">{comment.name}</span>
              <span className="italic text-gray-500">{moment(comment.createdAt).format('YYYY-MM-DD')}</span>
            </div>
            {/* 评论 */}
            <span className='text-gray-700 text-sm'>
              {comment.comment}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Comment;
