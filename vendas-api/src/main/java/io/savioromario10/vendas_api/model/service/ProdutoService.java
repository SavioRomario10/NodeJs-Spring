package io.savioromario10.vendas_api.model.service;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import io.savioromario10.vendas_api.model.Produto;
import io.savioromario10.vendas_api.model.repository.ProdutoRepository;
import io.savioromario10.vendas_api.rest.produtos.ProdutoFormRequest;

@Service
public class ProdutoService {

  private final ProdutoRepository produtoRepository;


  public ProdutoService(ProdutoRepository produtoRepository){
    this.produtoRepository = produtoRepository;
  }

  public Produto salvar(ProdutoFormRequest produto){
    
    Produto produtoSalvar = produto.toModel();

    return produtoRepository.save(produtoSalvar);
  }

  public HttpStatus atualizar(Long id, ProdutoFormRequest produto){

    Optional<Produto> prOptional = produtoRepository.findById(id);
    if(prOptional.isPresent()){
      
      Produto produtoAtualizar = produto.toModel();
      produtoAtualizar.setId(id);
  
      produtoRepository.save(produtoAtualizar);

      return HttpStatus.OK;
    }
    
    return HttpStatus.NOT_FOUND;
  }
}