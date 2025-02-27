import Link from "next/link"
import slug from "slug"

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const [categories, decks] = await Promise.all([
    fetch(`${baseUrl}/api/categories`).then((res) => res.json()),
    fetch(`${baseUrl}/api/decks`).then((res) => res.json()),
  ])

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
                    href={`/decks/${deck.id}/${slug(deck.name)}`}
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
      <div>
        <p>Decks</p>
        {decks.map((deck: { id: number; name: string }) => {
          return (
            <Link href={`/decks/${deck.id}/${slug(deck.name)}`} key={deck.id}>
              {deck.name}
            </Link>
          )
        })}
      </div>
    </>
  )
}
