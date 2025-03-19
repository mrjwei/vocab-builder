"use client"
import { useRouter } from "next/navigation"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Button } from "@/app/components/button"

export const Chip = ({ label, color }: { label: string; color: string }) => {
  const router = useRouter()
  return (
    <Button
      type="button"
      className="flex text-white !px-4 !py-1 !rounded-full gap-1 items-center"
      style={{ backgroundColor: color }}
      onClick={() => router.push("/decks")}
    >
      <span>{label}</span>
      <XMarkIcon className="size-4" />
    </Button>
  )
}
