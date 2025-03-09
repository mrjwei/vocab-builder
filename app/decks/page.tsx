import slug from "slug"
import { Term } from "@prisma/client"
import { capitalize } from "@/lib/utils"
import { Card } from "@/app/components/card"
import { StatusUnit } from "@/app/components/status-unit"
import { CreateNewDeckUnit } from "@/app/components/create-new-deck-unit"
import { ibm } from "@/lib/fonts"
import { allDecks } from "@/lib/data"

export default async function DecksPage() {
  const decks = await allDecks()

  return (
    <div className="container">
      <h2 className={`text-2xl font-bold pt-8 ${ibm.className}`}>Decks</h2>
      <div className="py-8">
        <div className="grid grid-cols-12 gap-8">
          {decks.map((deck: { id: number; name: string; terms: Term[] }) => {
            const numTerms = deck.terms.length
            const numDifficult = deck.terms.filter(
              (t) => t.status === "DIFFICULT"
            ).length
            const numLearning = deck.terms.filter(
              (t) => t.status === "LEARNING"
            ).length
            const numMastered = deck.terms.filter(
              (t) => t.status === "MASTERED"
            ).length
            return (
              <Card
                key={deck.id}
                title={capitalize(deck.name)}
                deckId={deck.id}
                href={`/decks/${deck.id}/${slug(deck.name)}`}
                className="col-span-12 sm:col-span-6 lg:col-span-4"
              >
                <StatusUnit
                  status="DIFFICULT"
                  numStatus={numDifficult}
                  numTotal={numTerms}
                />
                <StatusUnit
                  status="LEARNING"
                  numStatus={numLearning}
                  numTotal={numTerms}
                />
                <StatusUnit
                  status="MASTERED"
                  numStatus={numMastered}
                  numTotal={numTerms}
                />
              </Card>
            )
          })}
        </div>
      </div>
      <CreateNewDeckUnit />
    </div>
  )
}
