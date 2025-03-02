import { Status } from "@prisma/client"
import clsx from "clsx"

export const Bar = ({ status, width }: { status: Status; width: number }) => {
  return (
    <div
      className={clsx("h-3 rounded-full", {
        "bg-fuchsia-200": status === "MASTERED",
        "bg-fuchsia-400": status === "LEARNING",
        "bg-fuchsia-700": status === "DIFFICULT",
      })}
      style={{ width: `${width}px` }}
    ></div>
  )
}
