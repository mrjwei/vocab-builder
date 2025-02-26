import { Term } from "@prisma/client"
import { NewTermForm } from "@/app/components/new-term-form"
import { Accordion } from "@/app/components/accordion"

export default async function DeckPage({
  params,
}: {
  params: { segs: [number, string] }
}) {
  const [id, slug] = (await params).segs
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const res = await fetch(`${baseUrl}/api/decks/${id}`)
  const deck = await res.json()
  return (
    <div>
      <ul>
        {deck.terms.map((term: Term) => {
          const { id } = term
          return (
            <li key={id}>
              <Accordion term={term} />
            </li>
          )
        })}
      </ul>
      <NewTermForm deckId={Number(id)} slug={slug} />
    </div>
  )
}
