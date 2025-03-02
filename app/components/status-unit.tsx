import {
  ExclamationCircleIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline"
import { Bar } from "@/app/components/bar"
import { barWidth } from "@/lib/utils"
import { Status } from "@prisma/client"

const Icon = (status: Status) => {
  switch (status) {
    case "DIFFICULT":
      return <ExclamationCircleIcon className="size-6 text-fuchsia-700" />
    case "LEARNING":
      return <ClockIcon className="size-6 text-fuchsia-400" />
    case "MASTERED":
      return <CheckCircleIcon className="size-6 text-fuchsia-300" />
  }
}

export const StatusUnit = ({
  status,
  numStatus,
  numTotal,
}: {
  status: Status
  numStatus: number
  numTotal: number
}) => {
  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center gap-2">
        {Icon(status)}
        <Bar status={status} width={barWidth(numStatus / numTotal)} />
      </div>
      <span className="font-bold">{numStatus}</span>
    </div>
  )
}
