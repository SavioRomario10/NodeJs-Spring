package io.savioromario10.vendas_api.rest.produtos;

import java.math.BigDecimal;

public class ProdutoFormRequest {

  private String descricao;
  private String name;
  private BigDecimal preco;
  private String sku;

  public String getDescricao() {
    return descricao;
  }
  public void setDescricao(String descricao) {
    this.descricao = descricao;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
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
  
  @Override
  public String toString() {
    return "ProdutoFormRequest [descricao=" + descricao + ", name=" + name + ", preco=" + preco + ", sku=" + sku + "]";
  }
}