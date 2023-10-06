import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './MarcaFormulario.css';
import { MarcaService } from "../../../services/MarcaService";

const MarcaFormulario = (props) => {
  const navigate = useNavigate();
  const marcaNovo = { nome: '', sigla: '' };
  const location = useLocation();
  const { MarcaAlterar } = location.state || {};

  const [marca, setMarca] = useState(marcaNovo);
  const marcaService = new MarcaService();

  useEffect(() => {
    if (MarcaAlterar) {
      setMarca(MarcaAlterar);
    } else {
      setMarca(marcaNovo);
    }
  }, []);

  const listaMarcas = () => {
    navigate("/Marcas")
  }

  const alterarValor = (event) => {
    setMarca({ ...marca, [event.target.name]: event.target.value });
  }

  const salvar = () => {
    if (marca.id) {
      marcaService.alterar(marca).then(data => {
        console.log(data);
        setMarca(marcaNovo);
      });
    } else {
      marcaService.inserir(marca).then(data => {
        console.log(data);
        setMarca(marcaNovo);
      });
    }
  }

  return (
    <div className="container">
      <h2 className="page-title">Inserir ou Alterar um Marca</h2>
      <input type="text" name="nome" className="input-field" value={marca.nome} onChange={alterarValor} /><br /><br />
      <input type="text" name="sigla" className="input-field" value={marca.sigla} onChange={alterarValor} /><br /><br />
      <button className="save-button" onClick={salvar}>Salvar</button>
      <button className="list-button" onClick={listaMarcas}>Lista Marcas</button>
    </div>
  );
}

export default MarcaFormulario;
