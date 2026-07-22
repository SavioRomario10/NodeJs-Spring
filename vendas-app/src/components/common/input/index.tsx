import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  onValueChange?: (value: string) => void;
  label: string;
  colunms: string
  value: string;
  id: string;
  place?: string
}

export const Input:  React.FC<InputProps> = ({
  ... props
}: InputProps) => {
  return (
    <div className={`field column ${props.colunms}`}>
      <label className="label" htmlFor={props.id}>{props.label}</label>
      <div className="control">
        <input
              className="input" 
              id={props.id} 
              value={props.value} 
              onChange={e => {
                if(props.onValueChange && props.id=="inputPreco")
                  {props.onValueChange(e.target.value.replace(/[^0-9.]/g, ''))}
                else if(props.onValueChange)
                  {props.onValueChange(e.target.value)}
              }}
              placeholder={
                props.place ?
                `digite o ${props.place} do produto` : undefined}/>
      </div>
    </div>
  )
}