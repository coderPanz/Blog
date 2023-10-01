"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getCategories } from "@/server";

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getCategories();
      setCategories(res);
    })();
  }, []);

  return (
    <div className="h-24 mb-8 mx-8 flex  border-b border-gray-400 justify-between">
      <Link href={`/`}>
        <div
          className="flex font-semibold items-center h-full text-3xl italic text-gray-50">
          學吳紫荆的博客
        </div>
      </Link>
      <div className="flex items-center h-full text-lg italic text-gray-50">
        <p>佛系博客</p>
      </div>
    </div>
  );
};
export default Header;
