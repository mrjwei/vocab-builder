import { Header } from "@/app/components/header"
import { userFromCookie, userInfoById } from "@/lib/data"

export default async function DecksLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await userFromCookie()
  const { username } = await userInfoById(Number(user?.sub))

  return (
    <>
      <Header username={username} />
      <main className="h-full p-8 xl:max-w-[1200px] xl:mx-auto">
        {children}
      </main>
    </>
  )
}
