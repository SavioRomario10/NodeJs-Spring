package io.savioromario10.vendas_api.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "cliente")
public class Cliente {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "nascimento")
  private LocalDate nascimento;

  @Column(name = "cpf")
  private String cpf;

  @Column(name = "nome")
  private String nome;

  @Column(name = "endereco")
  private String endereco;

  @Column(name = "telefone")
  private String telefone;

  @Column(name = "email")
  private String email;

  @Column(name = "data_cadastro")
  private LocalDate dataCadastro;

  public Cliente() {}
  public Cliente(LocalDate nascimento, String cpf, String nome, String endereco, String telefone, String email, LocalDate dataCadastro) {
    this.nascimento = nascimento;
    this.cpf = cpf;
    this.nome = nome;
    this.endereco = endereco;
    this.telefone = telefone;
    this.email = email;
    this.dataCadastro = dataCadastro;
  }
  public Cliente(Long id, LocalDate nascimento, String cpf, String nome, String endereco, String telefone, String email, LocalDate dataCadastro) {
    this.id = id;
    this.nascimento = nascimento;
    this.cpf = cpf;
    this.nome = nome;
    this.endereco = endereco;
    this.telefone = telefone;
    this.email = email;
    this.dataCadastro = dataCadastro;
  }
  
  @PrePersist
  public void prePersiste(){
    setDataCadastro(LocalDate.now());
  }

  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }
  public LocalDate getNascimento() {
    return nascimento;
  }
  public void setNascimento(LocalDate nascimento) {
    this.nascimento = nascimento;
  }
  public String getCpf() {
    return cpf;
  }
  public void setCpf(String cpf) {
    this.cpf = cpf;
  }
  public String getNome() {
    return nome;
  }
  public void setNome(String nome) {
    this.nome = nome;
  }
  public String getEndereco() {
    return endereco;
  }
  public void setEndereco(String endereco) {
    this.endereco = endereco;
  }
  public String getTelefone() {
    return telefone;
  }
  public void setTelefone(String telefone) {
    this.telefone = telefone;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public LocalDate getDataCadastro() {
    return dataCadastro;
  }
  public void setDataCadastro(LocalDate dataCadastro) {
    this.dataCadastro = dataCadastro;
  }

  @Override
  public String toString() {
    return "Cliente [id=" + id + ", nascimento=" + nascimento + ", cpf=" + cpf + ", nome=" + nome + ", endereco="
        + endereco + ", telefone=" + telefone + ", email=" + email + ", dataCadastro=" + dataCadastro + "]";
  }
}