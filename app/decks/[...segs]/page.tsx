import { Term } from "@prisma/client"
import { CreateNewTermUnit } from "@/app/components/create-new-term-unit"
import { Accordion } from "@/app/components/accordion"
import { ibm } from "@/lib/fonts"
import { deckById } from "@/lib/data"

export default async function DeckPage({
  params,
}: {
  params: { segs: [number, string] }
}) {
  const [id, slug] = (await params).segs
  const deck = await deckById(Number(id))
  if (deck === null) {
    return
  }
  const deckName = deck.name.charAt(0).toUpperCase() + deck.name.substring(1)
  return (
    <div className="container">
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
