import Link from "next/link"
import slug from "slug"
import { Term } from "@prisma/client"
import { capitalize } from "@/lib/utils"
import { Card } from "@/app/components/card"
import { StatusUnit } from "@/app/components/status-unit"
import { ibm } from "@/lib/fonts"

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const decks = await fetch(`${baseUrl}/api/decks`).then((res) => res.json())

  return (
    <main className="p-8 xl:max-w-[1200px] xl:mx-auto">
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
