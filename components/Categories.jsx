"use client"

import { useState, useEffect } from "react";
import { getCategories } from "@/server";
import Link from "next/link";

const Categories = () => {
  const [ categories, setCategories ] = useState([])

  useEffect(() => {
    (async () => {
      const res = await getCategories()
      setCategories(res)
    })()
  })
  return (
    <>
      {/* 文章类别 */}
      <div className="bg-white rounded-xl px-7 pb-7">
        {/* 标题 */}
        <div className="font-bold text-2xl font-mono text-center py-3 border-b">
          文章类别
        </div>
        {/* 数据盒子 */}
        <div>
          {
            categories.map(category => (
              <Link href={`/category/${category.slug}`} key={category.name}>
                <p className="mt-5 text-gray-600">{category.name}</p>
              </Link>
            ))
          }
        </div>
      </div>
    </>
  );
};
export default Categories;
