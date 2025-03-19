import { Term } from "@prisma/client"
import { DeckPageHeadingUnit } from "@/app/components/deck-page-heading-unit"
import { CreateNewTermUnit } from "@/app/components/create-new-term-unit"
import { Accordion } from "@/app/components/accordion"
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

  return (
    <div className="container">
      <DeckPageHeadingUnit deck={deck} />
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
