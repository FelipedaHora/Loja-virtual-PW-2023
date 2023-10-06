import axios from 'axios';

export class PermissaoService {
  URL = "http://localhost:8080/estados";

  inserir(permissao) {
    return axios.post(this.URL, permissao);
  }

  alterar(permissao) {
    return axios.put(this.URL, permissao);
  }

  excluir(id) {
    return axios.delete(this.URL + "/" + id);
  }

  listar() {
    return axios.get(this.URL);
  }
}
