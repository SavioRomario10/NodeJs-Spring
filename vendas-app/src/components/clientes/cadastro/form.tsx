"use client";

import { Cliente } from "@/app/api/models/clientes"
import { useFormik } from "formik";
import { Input, InputCpf, InputPhone, InputDate } from "@/components/common";
import * as Yup from 'yup'

interface ClienteFormProps{
  cliente: Cliente;
  onSubmit: (cliente: Cliente) => void
}

const formSchema: Cliente = {
  cadastro: '',
  id: '',
  nome: '',
  cpf: '',
  dataNascimento: '',
  endereco: '',
  email: '',
  telefone: ''
}

const campoObrigatorioMensagem = "Campo obrigatório";
const campoObrigatorio  = Yup.string().trim().required(campoObrigatorioMensagem)

const validationSchema = Yup.object().shape({ 
  cpf: Yup.string().trim().required(campoObrigatorioMensagem).length(14, "CPF inválido"),
  dataNascimento: Yup.string().trim().required(campoObrigatorioMensagem).length(8, "CPF inválido"),
  email: Yup.string().trim().required(campoObrigatorioMensagem).email("Email inválido"),
  endereco: campoObrigatorio,
  nome: campoObrigatorio,
  telefone: campoObrigatorio
})

export const ClienteForm: React.FC<ClienteFormProps> = ({
  cliente,
  onSubmit
}) => {

  const formik = useFormik<Cliente> ({
    initialValues: {...formSchema, ...cliente},
    onSubmit,
    enableReinitialize: true,
    validationSchema:  validationSchema
  })

  return(
    <form onSubmit={formik.handleSubmit}>
      {formik.values.id &&
        <div className="columns">
          <Input id="id" name="id" autoComplete="off" colunms="is-half" label="Código: *" value={formik.values.id ?? ''} disabled/>
          <Input id="cadastro" name="cadastro" autoComplete="off" colunms="is-half" label="Data cadastro: *" value={formik.values.cadastro ?? ''} disabled/>
        </div>
      }
      <div className="columns">
        <Input id="nome" name="nome" autoComplete="off" colunms="is-full" label="Nome: *" onChange={formik.handleChange} value={formik.values.nome ?? ''} error={formik.errors.nome}/>
      </div>
      <div className="columns">
        <InputCpf id="cpf" name="cpf" autoComplete="off" colunms="is-half" label="CPF: *" onChange={formik.handleChange} value={formik.values.cpf ?? ''} error={formik.errors.cpf}/>
        <InputDate id="dataNascimento" name="dataNascimento"autoComplete="off" colunms="is-half" label="Data Nascimento: *" onChange={formik.handleChange} value={formik.values.dataNascimento ?? ''} error={formik.errors.dataNascimento}/>
      </div>
      <div className="columns">
        <Input id="endereco" name="endereco" autoComplete="off" colunms="is-full" label="Endereço: *" onChange={formik.handleChange} value={formik.values.endereco ?? ''} error={formik.errors.endereco}/>
      </div>
      <div className="columns">
        <Input id="email" name="email" autoComplete="off" colunms="is-half" label="Email: *" onChange={formik.handleChange} value={formik.values.email ?? ''} error={formik.errors.email}/>
        <InputPhone id="telefone" name="telefone" autoComplete="off" colunms="is-half" label="Telefone: *" onChange={formik.handleChange} value={formik.values.telefone ?? ''} error={formik.errors.telefone}/>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" type="submit">
            {formik.values.id ? "Atualizar":"Salvar"}
          </button>
        </div>
      </div>
    </form>
  )
}