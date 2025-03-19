import Link from "next/link"
import { Category } from "@prisma/client"

export const CategoryTag = ({ category }: { category: Category }) => {
  return (
    <Link
      href={`/decks?category=${category.name}&color=${category.color.replace("#", "%23")}`}
      className="inline-block px-4 py-1"
      style={{
        color: category.color,
        border: `1px solid ${category.color}`,
        borderRadius: "100px",
      }}
    >
      {category.name}
    </Link>
  )
}
