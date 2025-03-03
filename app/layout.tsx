import type { Metadata } from "next"
import "./globals.css"
import { poppins } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased text-neutral-800 bg-neutral-200/80`}
      >
        {children}
      </body>
    </html>
  )
}
