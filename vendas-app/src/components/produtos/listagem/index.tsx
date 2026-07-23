"use client";

import { Layout } from "@/components/layout"
import Link from "next/link"
import { TabelaProdutos } from "./tabela"
import { Produto } from "@/app/api/models/produtos"
import useSWR from "swr"
import { httpClient } from "@/app/api/http"
import { AxiosResponse } from "axios"
import { Loader } from "@/components/common";
import { useRouter } from "next/navigation";
import { useProdutoService } from "@/app/api/services";
import { useState } from "react";
import { Alert } from "@/components/common/message";
import { useEffect } from "react";

export const ListagemProdutos: React.FC = () => {

  const [messages, setMessages] = useState<Array<Alert>>([])
  
  const service = useProdutoService();
  const router = useRouter();
  
  const produtos: Produto[] = []
  const { data: result } = useSWR<AxiosResponse<Produto[]>>('/api/produtos', (url: string) => httpClient.get(url))

  const [lista, setLista] = useState<Produto[]>([])

  useEffect(() => {
    setLista(result?.data || [])
  }, [result])

  const editar = (produto:Produto) => {
    const url = `/cadastros/produtos?id=${produto.id}`
    router.push(url)
  }
  const deletar = (produto:Produto) => {
    service.deletar(produto.id ?? '').then(response =>{
      setMessages([{tipo: "success", texto:"Produto excluido com sucesso!"}])
    })

    const listaAlterada: Produto[] = lista?.filter(p => p.id != produto.id)
    setLista(listaAlterada)
  }

  return(
    <Layout titulo="Produtos" mensagens={messages}>
      <Link href="/cadastros/produtos">
        <button className="button is-success">Novo</button>
      </Link>
      <br/>
      <br/>
      <Loader show={!result}/>
      <TabelaProdutos onEdit={editar} onDelete={deletar} produtos={lista}>

      </TabelaProdutos>
    </Layout>
  )
}