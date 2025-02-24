import { NewTermForm } from "@/app/components/new-term-form"

export default async function DeckPage({
  params,
}: {
  params: { segs: [number, string] }
}) {
  const [id, slug] = params.segs
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const res = await fetch(`${baseUrl}/api/decks/${id}`)
  const deck = await res.json()
  return (
    <div>
      <ul>
        {deck.terms.map((term: { id: number; text: string }) => {
          return <li key={term.id}>{term.text}</li>
        })}
      </ul>
      <NewTermForm deckId={Number(id)} slug={slug} />
    </div>
  )
}
