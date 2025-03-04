import Link from "next/link"
import slug from "slug"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { Term } from "@prisma/client"
import { capitalize } from "@/lib/utils"
import { Card } from "@/app/components/card"
import { StatusUnit } from "@/app/components/status-unit"
import { ibm } from "@/lib/fonts"
import { allCategories, allDecks } from "@/lib/data"

export default async function Home() {
  const [categories, decks] = await Promise.all([allCategories(), allDecks()])

  return (
    <main className="p-8 xl:max-w-[1200px] xl:mx-auto">
      <div className="container">
        {categories.map(
          (category: {
            name: string
            decks: { id: number; name: string; terms: Term[] }[]
          }) => {
            return (
              <div key={category.name} className="py-8">
                <h2 className={`text-2xl font-bold mb-8 ${ibm.className}`}>
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
        <div className="py-8">
          <h2 className={`text-2xl font-bold mb-8 ${ibm.className}`}>
            All Decks
          </h2>
          <div className="grid grid-cols-12 gap-8 mb-8">
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
          <Link
            href="/decks"
            className="inline-flex border-2 border-neutral-800 items-center justify-between gap-2 py-2 px-4 rounded-md hover:border-neutral-500 hover:text-neutral-500 transition-colors ease-in-out duration-300"
          >
            <span>See More</span>
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
