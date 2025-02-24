type TProps =
  | {
      htmlFor: string
      name: string
      labelText: string
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
      hasBtn: false
    }

export const FormControl = (props: TProps) => {
  const { htmlFor, name, labelText, hasBtn } = props
  return (
    <div>
      <label htmlFor={htmlFor}>{labelText}</label>
      {hasBtn ? (
        <div className="flex">
          <input type="text" id={htmlFor} name={name} />
          <button type="button" onClick={props.onClick} id={props.btnId}>
            {props.btnLabel}
          </button>
        </div>
      ) : (
        <input type="text" id={htmlFor} name={name} />
      )}
    </div>
  )
}
