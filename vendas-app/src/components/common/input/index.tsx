import { InputHTMLAttributes } from 'react'
import { formatReal } from '@/app/api/util/money'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  onValueChange?: (value: string) => void;
  label: string;
  colunms: string
  value: string;
  id: string;
  place?: string
  currency?: boolean;
  error?: string;
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
                  let value = e.target.value;
                  if(value && props.currency){
                    value = formatReal(value) ?? '';
                  }
                  if (props.onValueChange){
                    props.onValueChange(value)}
                }}
              placeholder={
                props.place ?
                `digite o ${props.place} do produto` : undefined}/>
          {props.error &&
            <p className="help is-danger">{props.error}</p>
          }
      </div>
    </div>
  )
}