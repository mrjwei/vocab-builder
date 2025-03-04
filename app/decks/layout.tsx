export default function DecksLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className="p-8 xl:max-w-[1200px] xl:mx-auto">{children}</main>
}
