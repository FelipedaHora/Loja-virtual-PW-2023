import axios from 'axios';

export class MarcaService {
  URL = "http://localhost:8080/marcas";

  inserir(marca) {
    return axios.post(this.URL, marca);
  }

  alterar(marca) {
    return axios.put(this.URL, marca);
  }

  excluir(id) {
    return axios.delete(this.URL + "/" + id);
  }

  listar() {
    return axios.get(this.URL);
  }
}
