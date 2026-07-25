package io.savioromario10.vendas_api.model.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import io.savioromario10.vendas_api.model.Cliente;
import io.savioromario10.vendas_api.model.repository.ClienteRepository;
import io.savioromario10.vendas_api.rest.clientes.ClienteFormRequest;

@Service
public class ClienteService {

  private final ClienteRepository clienteRepository;

  public ClienteService(ClienteRepository clienteRepository){
    this.clienteRepository = clienteRepository;
  }

  public ClienteFormRequest salvar(ClienteFormRequest request){
    
    Cliente clienteSalvo = clienteRepository.save(request.toModel());
    return ClienteFormRequest.fromModel(clienteSalvo);
  }

  public HttpStatus atualizar(Long id, ClienteFormRequest request) {
    
    Optional<Cliente> clienteOptional = clienteRepository.findById(id);

    if(clienteOptional.isEmpty()){
      return HttpStatus.NOT_FOUND;
    }

    Cliente clienteSalvo = request.toModel();
    clienteSalvo.setId(id);

    clienteRepository.save(clienteSalvo);

    return HttpStatus.NO_CONTENT;
  }

  public Optional<ClienteFormRequest> buscarPorId(Long id){
    return clienteRepository.findById(id).map(ClienteFormRequest::fromModel);
  }

  public HttpStatus deletar(Long id) {
    return clienteRepository.findById(id).map(
      cliente -> {
        clienteRepository.deleteById(id);
        return HttpStatus.NO_CONTENT;
      }
    ).orElseGet(
      () -> HttpStatus.NOT_FOUND
    );
  }

  public Page<ClienteFormRequest> listarTodos(String nome, String cpf, Pageable pageable) {
    return 
      clienteRepository
        .findByNomeCpf("%" + nome.toUpperCase() + "%","%" + cpf + "%", pageable)
          .map(ClienteFormRequest::fromModel);
  }
}