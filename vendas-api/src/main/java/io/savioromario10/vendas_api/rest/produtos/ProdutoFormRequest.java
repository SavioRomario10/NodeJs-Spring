package io.savioromario10.vendas_api.rest.produtos;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.savioromario10.vendas_api.model.Produto;

public class ProdutoFormRequest {

  private Long id;
  private String nome;
  private String descricao;
  private BigDecimal preco;
  private String sku;

  @JsonFormat(pattern = "dd/MM/yyyy")
  private LocalDate cadastro;

  public ProdutoFormRequest() {}
  public ProdutoFormRequest(
    Long id, String nome, String descricao, BigDecimal preco, String sku, LocalDate cadastro) {

    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.sku = sku;
    this.cadastro = cadastro;
  }

  public Produto toModel(){
    return new Produto(id, nome, descricao, preco, sku);
  }

  public static ProdutoFormRequest fromModel(Produto produto){
    return new ProdutoFormRequest(
      produto.getId(), 
      produto.getNome(), 
      produto.getDescricao(),
      produto.getPreco(), 
      produto.getSku(),
      produto.getDataCadastro()
    );
  }

  public String getDescricao() {
    return descricao;
  }
  public void setDescricao(String descricao) {
    this.descricao = descricao;
  }
  public String getNome() {
    return nome;
  }
  public void setNome(String name) {
    this.nome = name;
  }
  public BigDecimal getPreco() {
    return preco;
  }
  public void setPreco(BigDecimal preco) {
    this.preco = preco;
  }
  public String getSku() {
    return sku;
  }
  public void setSku(String sku) {
    this.sku = sku;
  }
  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }
  public LocalDate getCadastro() {
    return cadastro;
  }
  public void setCadastro(LocalDate cadastro) {
    this.cadastro = cadastro;
  }  

  @Override
  public String toString() {
    return "ProdutoFormRequest [id=" + id + ", descricao=" + descricao + ", nome=" + nome + ", preco=" + preco
        + ", sku=" + sku + "]";
  }
}