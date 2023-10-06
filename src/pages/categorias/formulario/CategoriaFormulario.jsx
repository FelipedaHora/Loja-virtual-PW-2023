import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './CategoriaFormulario.css'; // Certifique-se de que você tem um arquivo CSS correspondente
import { CategoriaService } from "../../../services/CategoriaService";

const CategoriaFormulario = (props) => {
  const navigate = useNavigate();
  const categoriaNovo = { nome: ''};
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
    navigate("/categorias")
  }

  const alterarValor = (event) => {
    setCategoria({ ...categoria, [event.target.name]: event.target.value });
  }

  const salvar = () => {
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
      <h2 className="page-title">Inserir ou Alterar um Categoria</h2>
      <input type="text" name="nome" className="input-field" value={categoria.nome} onChange={alterarValor} /><br /><br />
      <input type="text" name="sigla" className="input-field" value={categoria.sigla} onChange={alterarValor} /><br /><br />
      <button className="save-button" onClick={salvar}>Salvar</button>
      <button className="list-button" onClick={listaCategorias}>Lista Categorias</button>
    </div>
  );
}

export default CategoriaFormulario;
