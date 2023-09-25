import { PostCard, Categories, PostWidget } from "../components/index";

const posts = [
  { title: "NextJS_Note", excperpt: "记录学习Nextjs的一些感悟!" },
  { title: "ReactJS_Note", excperpt: "记录学习Reactjs的一些感悟!" },
];
export default function Home() {
  return (
    <div className="container mx-auto px-8 mb-8">
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-8">
          {posts.map((post) => (
            <PostCard post={post} key={post.title} />
          ))}
        </div>
        <div className=" col-span-4">
          <div>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
