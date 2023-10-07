import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './PermissaoFormulario.css'; // Certifique-se de que você tem um arquivo CSS correspondente
import { PermissaoService } from "../../../services/PermissaoService";

const PermissaoFormulario = (props) => {
  const navigate = useNavigate();
  const PermissaoNovo = { nome: '' };
  const location = useLocation();
  const { PermissaoAlterar } = location.state || {};

  const [permissao, setPermissao] = useState(PermissaoNovo);
  const permissaoService = new PermissaoService();

  useEffect(() => {
    if (PermissaoAlterar) {
      setPermissao(PermissaoAlterar);
    } else {
      setPermissao(PermissaoNovo);
    }
  }, []);

  const listaPermissaos = () => {
    navigate("/permissoes");
  }

  const alterarValor = (event) => {
    setPermissao({ ...permissao, [event.target.name]: event.target.value });
  }

  const salvar = () => {
    // Verifica se o campo 'nome' está vazio
    if (!permissao.nome) {
      alert('O campo nome não pode estar vazio');
      return; // Impede a execução do salvamento
    }

    if (permissao.id) {
      permissaoService.alterar(permissao).then(data => {
        console.log(data);
        setPermissao(PermissaoNovo);
      });
    } else {
      permissaoService.inserir(permissao).then(data => {
        console.log(data);
        setPermissao(PermissaoNovo);
      });
    }
  }

  return (
    <div className="container">
      <h2 className="page-title">Inserir ou Alterar uma Permissão</h2>
      <label htmlFor="nome" style={{ fontWeight: 'bold', color: 'black' }}>Nome:</label>
      <input type="text" name="nome" id="nome" className="input-field" value={permissao.nome} onChange={alterarValor} /><br /><br />
      <button className="save-button" onClick={salvar}>Salvar</button>
      <button className="list-button" onClick={listaPermissaos}>Lista Permissaos</button>
    </div>
  );
}

export default PermissaoFormulario;
