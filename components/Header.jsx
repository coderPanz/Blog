import Link from "next/link"

const categories = [
  { name: 'React', slug: 'react' },
  { name: 'Web Development', slug: 'web-dev' }
]

const Header = () => {
  return (
    <div className="h-24 m-8 flex  border-b justify-between">
      <div 
        className="flex items-center h-full
        text-3xl italic text-gray-50">
        coderPanz_Blog
      </div>
      <div className="flex items-center h-full text-lg italic text-gray-50">
        {categories.map((category) => 
          <Link key={category.name} href={`/category/${category.slug}`}>
            <span>{category.name}</span>
          </Link>
        )}
      </div>
    </div>
  )
}
export default Header