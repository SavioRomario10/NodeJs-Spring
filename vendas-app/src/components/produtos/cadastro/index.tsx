"use client";

import { useState } from "react"
import { Layout, Input, TextArea} from "@/components"

export const CadastroProdutos: React.FC = () => {

  const [sku, setSku] = useState<string>('')
  const [preco, setPreco] = useState<string>('')
  const [nome, setNome] = useState<string>('')
  const [descricao, setDesc] = useState<string>('')

  const submit = () => {
    const produto = {
      sku,
      preco,
      nome,
      descricao
    }
    console.log(produto)
    clear()
  }

  const clear = () => {
    setSku('')
    setPreco('')
    setNome('')
    setDesc('')
  }

  return(
    <Layout titulo="Cadastro de Produtos">
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
          <button className="button is-link" onClick={submit}>Salvar</button>
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