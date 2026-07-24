import { InputHTMLAttributes } from 'react'
import { formatReal } from '@/app/api/util/money'
import { FormatUtils } from '@4us-dev/utils'

const formatUtils = new FormatUtils();

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  label: string;
  colunms: string
  value: string;
  id: string;
  place?: string
  error?: string;
  formatter?: (value: string ) => string
}

export const Input:  React.FC<InputProps> = ({
  formatter, 
  onChange,
  ... props
}: InputProps) => {

  const onInputChange = (event : any) => {
    const value = event.target.value;
    const name = event.target.name;

    const formattedValue = (formatter && formatter(value as string)) || value
    
    onChange?.({
      ... event,
      target:{
        name,
        value: formattedValue
      }
    })
  }

  return (
    <div className={`field column ${props.colunms}`}>
      <label className="label" htmlFor={props.id}>{props.label}</label>
      <div className="control">
        <input
            className="input"
            {...props}
            onChange={onInputChange}
          />
          {props.error &&
            <p className="help is-danger">{props.error}</p>
          }
      </div>
    </div>
  )
}

export const InputMoney: React.FC<InputProps> = (props: InputProps) => {
  return (
    <Input {...props} formatter={formatReal}/>
  )
}

export const InputCpf: React.FC<InputProps> = (props: InputProps) => {
  return(
    <Input {...props} formatter={formatUtils.formatCPF}/>
  )
}

export const InputPhone: React.FC<InputProps> = (props: InputProps) => {
  return(
    <Input {...props} formatter={formatUtils.formatPhone}/>
  )
}

export const InputDate: React.FC<InputProps> = (props: InputProps) => {

  const formatDate = (value: string) => {
    if(!value){
      return '';
    }

    const data = formatUtils.formatOnlyIntegers(value);
    const size = value.length;

    if(size < 3){
      return data;
    }
    if(size < 5){
      return data.substr(0,2) + "/" + data.substr(2,2);
    }
    return data.substr(0,2) + "/" + data.substr(2,2) + "/" + data.substr(4,2);
  }

  return(
    <Input {...props} maxLength={12} formatter={formatDate}/>
  )
}