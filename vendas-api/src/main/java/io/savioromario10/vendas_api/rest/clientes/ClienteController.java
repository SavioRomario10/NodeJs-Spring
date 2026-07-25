package io.savioromario10.vendas_api.rest.clientes;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.savioromario10.vendas_api.model.service.ClienteService;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin("*")
public class ClienteController {

  private final ClienteService clienteService;

  public ClienteController(ClienteService clienteService){
    this.clienteService = clienteService;
  }

  @PostMapping
  public ResponseEntity<ClienteFormRequest> salvar(@RequestBody ClienteFormRequest request){
    var clienteResponse = clienteService.salvar(request);

    return ResponseEntity.status(HttpStatus.CREATED).body(clienteResponse);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Void> atualizar(
    @PathVariable("id") Long id,
    @RequestBody ClienteFormRequest request){

      HttpStatus status = clienteService.atualizar(id, request);

      if (status == HttpStatus.NOT_FOUND) {
        return ResponseEntity.notFound().build();
      }

      return ResponseEntity.noContent().build();
  }

  @GetMapping("/{id}")
  public ResponseEntity<ClienteFormRequest> getById(@PathVariable Long id){
    
    return clienteService.buscarPorId(id)
      .map(clienteFR -> ResponseEntity.ok(clienteFR))
      .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteById(@PathVariable Long id){
    
    HttpStatus status = clienteService.deletar(id);

    if (status == HttpStatus.NOT_FOUND) {
        return ResponseEntity.notFound().build();
      }

      return ResponseEntity.noContent().build();
  }

  @GetMapping
  public Page<ClienteFormRequest> listarTodos(
    @RequestParam("nome") String nome,
    @RequestParam("cpf") String cpf,
    Pageable pageable
  ){
    return clienteService.listarTodos(nome, cpf, pageable);
  }
}