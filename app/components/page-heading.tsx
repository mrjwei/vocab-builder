import { ibm } from "@/lib/fonts"

export const PageHeading = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <div className="relative flex justify-between items-center pt-8">
      <h2 className={`text-2xl font-bold ${ibm.className}`}>{title}</h2>
      {children}
    </div>
  )
}
