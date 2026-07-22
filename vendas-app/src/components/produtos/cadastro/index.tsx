"use client";

import { useState } from "react"
import { Layout, Input, TextArea} from "@/components"
import { useProdutoService } from "@/app/api/services"
import { Produto } from "@/app/api/models/produtos";

export const CadastroProdutos: React.FC = () => {

  const service = useProdutoService()
  const [sku, setSku] = useState<string>('')
  const [preco, setPreco] = useState<string>('')
  const [nome, setNome] = useState<string>('')
  const [descricao, setDesc] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [cadastro, setCadastro] = useState<string>('')

  const submit = () => {
    const produto: Produto = {
      id,
      sku,
      preco: parseFloat(preco),
      nome,
      descricao
    }

    if(id){
      service
        .atualizar(produto)
        .then(response => console.log("atualizado!"))
    }
    else{   
      service
        .salvar(produto)
        .then(produtoResposta => {
          setId(produtoResposta.id || '')
          setCadastro(produtoResposta.cadastro || '')
        })
    }
  }

  const clear = () => {
    setSku('')
    setPreco('')
    setNome('')
    setDesc('')

    setId('')
  }

  return(
    <Layout titulo="Cadastro de Produtos">
      {id &&
        <div className="columns">
          <Input label="Códido: *" colunms="is-half" value={id} id="inputId" disabled/>
          <Input label="Data cadastro: *" colunms="is-half" value={cadastro} id="inputCadastro" disabled={true}/>
        </div>
      }
      <div className="columns">
        <Input label="SKU: *" colunms="is-half" value={sku} id="inputSku" onValueChange={setSku} place="SKU" />
        <Input label="Preço: *" colunms="is-half" value={preco} id="inputPreco" onValueChange={setPreco} place="Preço" />
      </div>
      <div className="columns">
        <Input label="Nome: *" colunms="is-full" value={nome} id="inputNome" onValueChange={setNome} place="Nome" />
      </div>
      <div className="columns">
        <TextArea label="Descrição: *" colunms="is-full" value={descricao} id="inputDesc" onValueChange={setDesc} place="Descrição" />
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
          <button className="button is-link is-light">Voltar</button>
        </div>
      </div>
    </Layout>
  )
}