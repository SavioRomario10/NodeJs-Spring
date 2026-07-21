package io.savioromario10.vendas_api.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "produto")
public class Produto {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "nome")
  private String nome;
  
  @Column(name = "descricao")
  private String descricao;

  @Column(name = "preco", precision = 2, scale = 16)
  private BigDecimal preco;

  @Column(name = "sku")
  private String sku;

  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }
  public String getNome() {
    return nome;
  }
  public void setNome(String nome) {
    this.nome = nome;
  }
  public String getDescricao() {
    return descricao;
  }
  public void setDescricao(String descricao) {
    this.descricao = descricao;
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
    return "Produto [id=" + id + ", nome=" + nome + ", descricao=" + descricao + ", preco=" + preco + ", sku=" + sku
        + "]";
  }
}