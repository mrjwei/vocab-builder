import Link from "next/link"
import slug from "slug"
import { Term } from "@prisma/client"
import { capitalize } from "@/lib/utils"
import { Card } from "@/app/components/card"
import { StatusUnit } from "@/app/components/status-unit"
import { ibm } from "@/lib/fonts"

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const [categories, decks] = await Promise.all([
    fetch(`${baseUrl}/api/categories`).then((res) => res.json()),
    fetch(`${baseUrl}/api/decks`).then((res) => res.json()),
  ])

  return (
    <main className="p-8">
      <div className="container">
        {categories.map(
          (category: {
            name: string
            decks: { id: number; name: string; terms: Term[] }[]
          }) => {
            return (
              <div key={category.name} className="py-4">
                <h2 className={`text-2xl font-bold mb-4 ${ibm.className}`}>
                  {capitalize(category.name)}
                </h2>
                <div className="grid grid-cols-12 gap-8">
                  {category.decks.map((deck) => {
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
                      <Link
                        key={deck.id}
                        href={`/decks/${deck.id}/${slug(deck.name)}`}
                        className="col-span-12 sm:col-span-6 lg:col-span-4"
                      >
                        <Card title={capitalize(deck.name)}>
                          <div>
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
                          </div>
                        </Card>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          }
        )}
        <div className="py-4">
          <h2 className={`text-2xl font-bold mb-4 ${ibm.className}`}>
            All Decks
          </h2>
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
                <Link
                  key={deck.id}
                  href={`/decks/${deck.id}/${slug(deck.name)}`}
                  className="col-span-12 sm:col-span-6 lg:col-span-4"
                >
                  <Card title={capitalize(deck.name)}>
                    <div>
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
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
