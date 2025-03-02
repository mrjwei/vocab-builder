import { Poppins, IBM_Plex_Sans } from "next/font/google"

export const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
})

export const ibm = IBM_Plex_Sans({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
})
