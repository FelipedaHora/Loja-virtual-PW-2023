import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './MarcaFormulario.css';
import { MarcaService } from "../../../services/MarcaService";

const MarcaFormulario = (props) => {
  const navigate = useNavigate();
  const marcaNovo = { nome: '' };
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
    navigate("/Marcas");
  }

  const alterarValor = (event) => {
    setMarca({ ...marca, [event.target.name]: event.target.value });
  }

  const salvar = () => {
    // Verifica se o campo 'nome' está vazio
    if (!marca.nome) {
      alert('O campo nome não pode estar vazio');
      return; // Impede a execução do salvamento
    }

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
      <h2 className="page-title">Inserir ou Alterar uma Marca</h2>
      <label htmlFor="nome" style={{ fontWeight: 'bold', color: 'black' }}>Nome:</label>
      <input type="text" name="nome" id="nome" className="input-field" value={marca.nome} onChange={alterarValor} /><br /><br />
      <button className="save-button" onClick={salvar}>Salvar</button>
      <button className="list-button" onClick={listaMarcas}>Lista Marcas</button>
    </div>
  );
}

export default MarcaFormulario;
