package io.savioromario10.vendas_api.rest.produtos;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.savioromario10.vendas_api.model.Produto;
import io.savioromario10.vendas_api.model.service.ProdutoService;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin("*")
public class ProdutoController {

  private final ProdutoService produtoService;

  public ProdutoController(ProdutoService produtoService){
    this.produtoService = produtoService;
  }

  @PostMapping
  public ProdutoFormRequest salvar(@RequestBody ProdutoFormRequest produto){
    
    Produto produtoSalvo = produtoService.salvar(produto);

    return ProdutoFormRequest.fromModel(produtoSalvo);
  }

  @PutMapping("{id}")
  public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody ProdutoFormRequest produto){

    HttpStatus status = produtoService.atualizar(id, produto);

    return ResponseEntity.status(status).build();
  }
}