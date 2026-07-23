"use client";

import { Layout } from "@/components/layout"
import Link from "next/link"
import { TabelaProdutos } from "./tabela"
import { Produto } from "@/app/api/models/produtos"
import useSWR from "swr"
import { httpClient } from "@/app/api/http"
import { AxiosResponse } from "axios"
import { Loader } from "@/components/common";

export const ListagemProdutos: React.FC = () => {

  const produtos: Produto[] = []
  const { data: result } = useSWR<AxiosResponse<Produto[]>>('/api/produtos', (url: string) => httpClient.get(url))

  return(
    <Layout titulo="Produtos">
      <Link href="/cadastros/produtos">
        <button className="button is-success">Novo</button>
      </Link>
      <br/>
      <Loader show={!result}/>
      <TabelaProdutos produtos={result?.data || []}>

      </TabelaProdutos>
    </Layout>
  )
}