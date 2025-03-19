export default function Layout({
  children,
}: {
  className: string
  children: React.ReactNode
}) {
  return (
    <div className="h-full !bg-gradient-to-br from-fuchsia-800 from-25% to-sky-600">
      {children}
    </div>
  )
}
