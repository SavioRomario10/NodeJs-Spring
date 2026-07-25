"use client";

import { Layout } from "@/components/layout";
import { Input, InputCpf } from "@/components/common";
import { useFormik } from "formik";
import { useState } from "react";
import { Cliente } from "@/app/api/models/clientes";
import { Page } from "@/app/api/models/common/page";
import { useClienteService } from "@/app/api/services/cliente.service";

interface ConsultaFormik {
    nome?: string;
    cpf?: string;
}

export const ListagemClientes: React.FC = () => {

    const clienteService = useClienteService();

    const [clientes, setClientes] = useState<Page<Cliente>>({
        content: [],
        first: true,
        last: true,
        number: 0,
        numberOfElements: 0,
        size: 3,
        totalElements: 0,
        totalPages: 0
    });

    const handleSubmit = async (filtro: ConsultaFormik) => {

        const resultado = await clienteService.find(
            filtro.nome ?? '',
            filtro.cpf ?? '',
            0,
            3
        );

        setClientes(resultado);
    };

    const {
        handleSubmit: formikSubmit,
        values: filtro,
        handleChange
    } = useFormik<ConsultaFormik>({
        onSubmit: handleSubmit,
        initialValues: {
            nome: '',
            cpf: ''
        }
    });

    const pesquisar = async (page = 0) => {

        const resultado = await clienteService.find(
            filtro.nome ?? '',
            filtro.cpf ?? '',
            page,
            3
        );

        setClientes(resultado);
    };

  return (
    <Layout titulo="Clietes">
      <form onSubmit={formikSubmit} >
        <div className="columns">
          <Input id="nome" name="nome" label="Nome:" onChange={handleChange} value={filtro.nome ?? ''} autoComplete="off" colunms="is-half"/>
          <InputCpf id="cpf" name="cpf" label="Cpf:" onChange={handleChange} value={filtro.cpf ?? ''} autoComplete="off" colunms="is-half"/>
        </div>
        <div className="field is-grouped">
          <div className="control is-link">
            <button type="submit" className="button is-success">Filtrar</button>
          </div>
        </div>
      </form>

      <div className="is-full">
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Email</th>
            </tr>
          </thead>

          <tbody>
              {clientes.content.map(cliente => (
                  <tr key={cliente.id}>
                      <td>{cliente.id}</td>
                      <td>{cliente.nome}</td>
                      <td>{cliente.cpf}</td>
                      <td>{cliente.email}</td>
                  </tr>
              ))}
          </tbody>
        </table>

        <nav className="pagination is-centered" role="navigation">

        <button 
          className="pagination-previous" type="button" disabled={clientes.first} 
          onClick={() => pesquisar(clientes.number - 1)}>
          Anterior
        </button>

        <button
          className="pagination-next" type="button" disabled={clientes.last}
          onClick={() => pesquisar(clientes.number + 1)}>
            Próxima
        </button>
      </nav>
      <p>
          Página {clientes.number + 1} de {clientes.totalPages}
      </p>

      <p>
          Total de registros: {clientes.totalElements}
      </p>
      </div>
    </Layout>
  );
};