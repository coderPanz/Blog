"use client"
import Markdown from 'react-markdown'
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
  console.log(comments)
  return (
    // 评论区
    <div className="mt-10 bg-gray-50 p-6 rounded-xl">
      {/* 标题 */}
      <div className="font-semibold text-2xl italic">评论区</div>
      {/* 评论列表 */}
      <div>
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-200 mt-5 rounded-lg py-3 px-4">
            {/* name and date */}
            <div className="flex h-10 items-center justify-between">
              <span className="font-medium italic text-xl">{comment.name}</span>
              <span className="italic text-gray-500">{moment(comment.createdAt).format('YYYY-MM-DD')}</span>
            </div>
            {/* 评论 */}
            <span>
              <Markdown>{comment.comment}</Markdown>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Comment;
