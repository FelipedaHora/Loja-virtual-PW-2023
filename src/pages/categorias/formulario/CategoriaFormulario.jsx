import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './CategoriaFormulario.css';
import { CategoriaService } from "../../../services/CategoriaService";

const CategoriaFormulario = (props) => {
  const navigate = useNavigate();
  const categoriaNovo = { nome: '' };
  const location = useLocation();
  const { categoriaAlterar } = location.state || {};

  const [categoria, setCategoria] = useState(categoriaNovo);
  const categoriaService = new CategoriaService();

  useEffect(() => {
    if (categoriaAlterar) {
      setCategoria(categoriaAlterar);
    } else {
      setCategoria(categoriaNovo);
    }
  }, []);

  const listaCategorias = () => {
    navigate("/categorias");
  }

  const alterarValor = (event) => {
    setCategoria({ ...categoria, [event.target.name]: event.target.value });
  }

  const salvar = () => {
    // Verifica se o campo 'nome' está vazio
    if (!categoria.nome) {
      alert('O campo nome não pode estar vazio');
      return; // Impede a execução do salvamento
    }

    if (categoria.id) {
      categoriaService.alterar(categoria).then(data => {
        console.log(data);
        setCategoria(categoriaNovo);
      });
    } else {
      categoriaService.inserir(categoria).then(data => {
        console.log(data);
        setCategoria(categoriaNovo);
      });
    }
  }

  return (
    <div className="container">
      <h2 className="page-title">Inserir ou Alterar uma Categoria</h2>
      <label htmlFor="nome" style={{ fontWeight: 'bold', color: 'black' }}>Nome:</label>
      <input type="text" name="nome" id="nome" className="input-field" value={categoria.nome} onChange={alterarValor} /><br /><br />
      <button className="save-button" onClick={salvar}>Salvar</button>
      <button className="list-button" onClick={listaCategorias}>Lista Categorias</button>
    </div>
  );
}

export default CategoriaFormulario;
