import { Term } from "@prisma/client"
import { CreateNewTermUnit } from "@/app/components/create-new-term-unit"
import { Accordion } from "@/app/components/accordion"
import { ibm } from "@/lib/fonts"

export default async function DeckPage({
  params,
}: {
  params: { segs: [number, string] }
}) {
  const [id, slug] = (await params).segs
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const res = await fetch(`${baseUrl}/api/decks/${id}`)
  const deck = await res.json()
  const deckName = deck.name.charAt(0).toUpperCase() + deck.name.substring(1)
  return (
    <div>
      <h2 className={`text-2xl font-bold mb-4 ${ibm.className}`}>{deckName}</h2>
      <ul>
        {deck.terms.map((term: Term) => {
          const { id } = term
          return (
            <li key={id}>
              <Accordion term={term} deckId={deck.id} slug={slug} />
            </li>
          )
        })}
      </ul>
      <CreateNewTermUnit deckId={Number(id)} slug={slug} />
    </div>
  )
}
