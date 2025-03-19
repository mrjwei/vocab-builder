import { Term } from "@prisma/client"
import { CreateNewTermUnit } from "@/app/components/create-new-term-unit"
import { Accordion } from "@/app/components/accordion"
import { ibm } from "@/lib/fonts"
import { deckById, userFromCookie } from "@/lib/data"

export default async function DeckPage({
  params,
}: {
  params: { segs: [number, string] }
}) {
  const [id, slug] = (await params).segs

  const user = await userFromCookie()
  const deck = await deckById(Number(user?.sub), Number(id))
  if (deck === null) {
    return
  }
  const deckName = deck.name.charAt(0).toUpperCase() + deck.name.substring(1)
  return (
    <div className="container">
      <h2 className={`text-2xl font-bold pt-8 ${ibm.className}`}>{deckName}</h2>
      <ul className="py-8">
        {deck.terms.map((term: Term) => {
          const { id } = term
          return (
            <li key={id}>
              <Accordion term={term} deckId={deck.id} slug={slug} />
            </li>
          )
        })}
      </ul>
      <CreateNewTermUnit
        userId={Number(user?.sub)}
        deckId={Number(id)}
        slug={slug}
      />
    </div>
  )
}
