import Link from "next/link"
import slug from "slug"

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const res = await fetch(`${baseUrl}/api/categories`)
  const categories = await res.json()
  return (
    <>
      {categories.map(
        (category: { name: string; decks: { id: number; name: string }[] }) => {
          return (
            <div key={category.name}>
              <p>{category.name}</p>
              {category.decks.map((deck) => {
                return (
                  <Link
                    href={`/deck/${deck.id}/${slug(deck.name)}`}
                    key={deck.id}
                  >
                    {deck.name}
                  </Link>
                )
              })}
            </div>
          )
        }
      )}
    </>
  )
}
