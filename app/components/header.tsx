import Link from "next/link"

const navItems = [
  {
    label: "Decks",
    href: "/decks",
  },
]

export const Header = () => {
  return (
    <header className="bg-neutral-800 text-white py-4 px-8">
      <div className="container flex items-center justify-between">
        <h1>
          <Link href="/">VocabBuilder</Link>
        </h1>
        <nav>
          <ul className="flex items-center gap-8">
            {navItems.map((item) => {
              const { label, href } = item
              return (
                <li key={label}>
                  <Link href={href}>{label}</Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
