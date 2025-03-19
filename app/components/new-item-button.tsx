import { PlusIcon } from "@heroicons/react/24/outline"
import { Button } from "@/app/components/button"

export const NewItemButton = ({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) => {
  return (
    <Button
      type="button"
      className="fixed left-0 bottom-0 w-full !py-4 !rounded-none !m-0 md:static md:w-auto md:!py-2 md:!rounded-md md:-translate-y-2 flex items-center justify-center md:justify-start gap-2 bg-fuchsia-700 text-white hover:bg-fuchsia-500 transition-colors ease-in-out duration-300"
      onClick={onClick}
    >
      <PlusIcon className="size-4" />
      <span>{label}</span>
    </Button>
  )
}
