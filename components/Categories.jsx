"use client"

import { useState, useEffect } from "react";
import { getCategories } from "@/server";
import Link from "next/link";

const Categories = () => {
  const [ categories, setCategories ] = useState([])
  const [ index, setIndex ] = useState(0)

  useEffect(() => {
    (async () => {
      const res = await getCategories()
      setCategories(res)
    })()
  })

  const handleShowMore = () => {
    setIndex(preIndex => preIndex + 3)
  }

  return (
    <>
      {/* 文章类别 */}
      <div className="bg-white rounded-xl px-7 pb-7 border-8 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700">
        {/* 标题 */}
        <div className="font-bold text-2xl font-mono text-center py-3 border-b dark:text-gray-300">
          文章类别
        </div>
        {/* 数据盒子 */}
        <div className="mt-5">
          {
            categories.slice(0, index + 3).map(category => (
              <Link href={`/category/${category.slug}`} key={category.name}>
                <p className="mb-3 text-white dark:text-gray-300 transition ease-in-out delay-150 bg-blue-400 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-400 duration-300 rounded-md h-10 text-center leading-10 dark:bg-blue-900">{category.name}</p>
              </Link>
            ))
          }
        </div>
        <div className="h-5 mt-4 w-full text-center">
          <button onClick={handleShowMore} className="text-white py-1 w-20 transition ease-in-out delay-150 bg-green-600 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-400 duration-300 rounded dark:bg-green-800 dark:text-gray-300">更多类型</button>
        </div>
      </div>
    </>
  );
};
export default Categories;
