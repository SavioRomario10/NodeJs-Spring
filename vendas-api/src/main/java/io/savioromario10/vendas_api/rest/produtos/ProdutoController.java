package io.savioromario10.vendas_api.rest.produtos;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pai/aprodutos")
public class ProdutoController {

  @PostMapping
  public ProdutoFormRequest salvar(@RequestBody ProdutoFormRequest produto){
    
    System.out.println(produto);
    return produto;
  }
}