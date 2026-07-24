package io.savioromario10.vendas_api.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.savioromario10.vendas_api.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long>{

}