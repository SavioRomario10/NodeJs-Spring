"use client";

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Layout, Input, TextArea} from "@/components"
import { useProdutoService } from "@/app/api/services"
import { Produto } from "@/app/api/models/produtos";
import { converterEmBigDecimal, formatReal } from "@/app/api/util/money";
import { Message } from "@/components";
import { Alert } from "@/components/common/message";
import * as yup from "yup"

const msgCampo = "Campo obrigatório"
const msgMore = "Valor deve ser maior que zero(0,00)"

const validationSchema = yup.object().shape({
  sku: yup.string().trim().required(msgCampo),
  nome: yup.string().trim().required(msgCampo),
  descricao: yup.string().trim().required(msgCampo),
  preco: yup.number().required(msgCampo).moreThan(0, msgMore)
})

interface FormErros{
  sku?: string;
  nome?: string;
  preco?: string;
  descricao?: string;
}

export const CadastroProdutos: React.FC = () => {

  const service = useProdutoService()
  const [sku, setSku] = useState<string>('')
  const [preco, setPreco] = useState<string>('')
  const [nome, setNome] = useState<string>('')
  const [descricao, setDesc] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [cadastro, setCadastro] = useState<string>('')
  const [messages, setMessages] = useState<Array<Alert>>([])
  const [errors, setErros] = useState<FormErros>({})
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryId = searchParams.get("id");
  
  useEffect(() => {
    if(queryId){
      service.carregarProduto(queryId ?? '').then(produto =>{
        setId(produto.id ?? '')
        setSku(produto.sku ?? '')
        setNome(produto.nome ?? '')
        setDesc(produto.descricao ?? '')
        setCadastro(produto.cadastro ?? '')
        setPreco(formatReal(`${produto.preco}`) ?? '')
      })
    }
  }, [queryId])
  
  const submit = () => {

    const produto: Produto = {
      id,
      sku,
      preco: converterEmBigDecimal(preco),
      nome,
      descricao
    }

    validationSchema.validate(produto).then(obj => {

      setErros({})

      if(id){
        service
          .atualizar(produto)
          .then(response => setMessages([{
            tipo:"success", texto:"Produto atualizado com sucesso"
          }]))
      }
      else{   
        service
          .salvar(produto)
          .then(produtoResposta => {
            setId(produtoResposta.id || '')
            setCadastro(produtoResposta.cadastro || '')
            setMessages([{
              tipo:"success", texto:"Produto salvo com sucesso"
            }])
          })
      }
    }).catch(err =>{
      const field = err.path;
      const message = err.message;

      setErros({
        [field]: message
      })

    })
  }

  const clear = () => {
    setSku('')
    setPreco('')
    setNome('')
    setDesc('')

    setId('')
    setMessages([])
  }

  return(
    <Layout titulo="Cadastro de Produtos" mensagens={messages}>
      {id &&
        <div className="columns">
          <Input label="Códido: *" colunms="is-half" value={id} id="inputId" disabled/>
          <Input label="Data cadastro: *" colunms="is-half" value={cadastro} id="inputCadastro" disabled={true}/>
        </div>
      }
      <div className="columns">
        <Input label="SKU: *" colunms="is-half" value={sku} id="inputSku" onValueChange={setSku} place="SKU" error={errors.sku}/>
        <Input label="Preço: *" colunms="is-half" value={preco} id="inputPreco" onValueChange={setPreco} place="Preço" maxLength={16} error={errors.preco} currency/>
      </div>
      <div className="columns">
        <Input label="Nome: *" colunms="is-full" value={nome} id="inputNome" onValueChange={setNome} error={errors.nome} place="Nome" />
      </div>
      <div className="columns">
        <TextArea label="Descrição: *" colunms="is-full" value={descricao} id="inputDesc" onValueChange={setDesc} place="Descrição" error={errors.descricao}/>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" onClick={submit}>
            {id ? "Atualizar":"Salvar"}
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light" onClick={clear}>Limpar</button>
        </div>
        <div className="control">
          <Link href="/consultas/produtos">
            <button className="button is-link is-light">Voltar</button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}