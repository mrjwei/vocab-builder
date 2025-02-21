type TProps = {
  params: {
    slug: string
  }
}

export default function DeckPage({ params }: TProps) {
  return <div>Deck: {params.slug}</div>
}
