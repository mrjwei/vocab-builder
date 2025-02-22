export default async function DeckPage({
  params,
}: {
  params: { segs: (string | number)[] }
}) {
  const [id] = params.segs
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const res = await fetch(`${baseUrl}/api/decks/${id}`)
  const deck = await res.json()
  return (
    <div>
      {deck.terms.map((term: { id: number; text: string }) => {
        return <p key={term.id}>{term.text}</p>
      })}
    </div>
  )
}
