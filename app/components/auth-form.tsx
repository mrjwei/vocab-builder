import { Button } from "@/app/components/button"

type TProps =
  | {
      title: string
      btnLabel: string
      children: React.ReactNode
      formAction: (formData: FormData) => void
      hasFooter: false
    }
  | {
      title: string
      btnLabel: string
      children: React.ReactNode
      formAction: (formData: FormData) => void
      hasFooter: true
      footer: React.JSX.Element
    }

export const AuthForm = (props: TProps) => {
  const { title, btnLabel, children, formAction, hasFooter } = props
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="text-white font-bold text-center mb-8">
        <span className="block text-3xl">Vocabulary Learning Made Easy</span>
        <span className="!font-semibold text-white/80">With</span>
        <span className="block text-4xl italic">Vocab Builder</span>
      </h1>
      <div className="min-w-80 md:min-w-96 bg-white rounded-lg shadow-card">
        <h2 className="font-bold text-center text-xl mb-8 pt-12 pb-4 px-12 rounded-t-lg">
          {title}
        </h2>
        <form action={formAction} className="pb-8 px-12">
          {children}
          <Button
            type="submit"
            className="w-full bg-fuchsia-700 text-white hover:bg-neutral-600 transition-colors ease-in-out duration-300 mt-6"
          >
            {btnLabel}
          </Button>
        </form>
        {hasFooter && props.footer}
      </div>
    </div>
  )
}
