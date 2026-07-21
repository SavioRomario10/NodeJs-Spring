import { InputHTMLAttributes } from 'react'

interface TextAreaProps extends InputHTMLAttributes<HTMLInputElement>{
  onValueChange?: (value: string) => void;
  label: string;
  colunms: string
  value: string;
  id: string;
  place: string
}

export const TextArea: React.FC<TextAreaProps> = ({
  ... props
}: TextAreaProps) =>{
  return(
    <div className={`field column ${props.colunms}`} >
      <label className="label" htmlFor={props.id}>{props.label}</label>
      <div className="control">
        <textarea
              className="textarea" 
              id={props.id} 
              value={props.value} 
              onChange={e => {
                if(props.onValueChange){props.onValueChange(e.target.value)}}}
              placeholder={`digite o ${props.place} do produto`}/>
      </div>
    </div>
  )
}