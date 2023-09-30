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
    <div className="h-24 mb-8 mx-8 flex  border-b justify-between">
      <Link href={`/`}>
        <div
          className="flex items-center h-full text-3xl italic text-gray-50">
          coderPanz_Blog
        </div>
      </Link>
      <div className="flex items-center h-full text-lg italic text-gray-50">
        <p>佛系博客</p>
      </div>
    </div>
  );
};
export default Header;
