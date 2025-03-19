import { Button } from "@/app/components/button"

type TProps =
  | {
      htmlFor: string
      name: string
      labelText: string
      type: string
      defaultValue?: string
      className?: string
      hasBtn: true
      btnId: string
      btnLabel: string
      onClick:
        | (() => void)
        | ((event: React.MouseEvent<HTMLButtonElement>) => void)
    }
  | {
      htmlFor: string
      name: string
      labelText: string
      type: string
      defaultValue?: string
      className?: string
      hasBtn: false
    }

export const FormControl = (props: TProps) => {
  const { htmlFor, name, labelText, hasBtn, type, defaultValue } = props
  return (
    <div className={props.className}>
      {hasBtn ? (
        <>
          <div className="flex items-center justify-between gap-2 mb-2">
            <label htmlFor={htmlFor} className="font-medium text-neutral-600">
              {labelText}
            </label>
            <Button
              type="button"
              size="small"
              className="text-red-400 hover:bg-red-50 transition-colors ease-in-out duration-300"
              onClick={props.onClick}
              id={props.btnId}
            >
              {props.btnLabel}
            </Button>
          </div>
          <input
            type={type}
            id={htmlFor}
            name={name}
            className="flex-1"
            defaultValue={defaultValue}
          />
        </>
      ) : (
        <>
          <label
            htmlFor={htmlFor}
            className="font-medium text-neutral-600 mb-2"
          >
            {labelText}
          </label>
          <input
            type="text"
            id={htmlFor}
            name={name}
            defaultValue={defaultValue}
          />
        </>
      )}
    </div>
  )
}
