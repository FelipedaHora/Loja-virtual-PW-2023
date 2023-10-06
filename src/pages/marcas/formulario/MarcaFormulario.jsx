import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './MarcaFormulario.css';
import { MarcaService } from "../../../services/MarcaService";

const MarcaFormulario = (props) => {
  const navigate = useNavigate();
  const MarcaNovo = { nome: '', sigla: '' };
  const location = useLocation();
  const { MarcaAlterar } = location.state || {};

  const [Marca, setMarca] = useState(MarcaNovo);
  const MarcaService = new MarcaService();

  useEffect(() => {
    if (MarcaAlterar) {
      setMarca(MarcaAlterar);
    } else {
      setMarca(MarcaNovo);
    }
  }, []);

  const listaMarcas = () => {
    navigate("/Marcas")
  }

  const alterarValor = (event) => {
    setMarca({ ...Marca, [event.target.name]: event.target.value });
  }

  const salvar = () => {
    if (Marca.id) {
      MarcaService.alterar(Marca).then(data => {
        console.log(data);
        setMarca(MarcaNovo);
      });
    } else {
      MarcaService.inserir(Marca).then(data => {
        console.log(data);
        setMarca(MarcaNovo);
      });
    }
  }

  return (
    <div className="container">
      <h2 className="page-title">Inserir ou Alterar um Marca</h2>
      <input type="text" name="nome" className="input-field" value={Marca.nome} onChange={alterarValor} /><br /><br />
      <input type="text" name="sigla" className="input-field" value={Marca.sigla} onChange={alterarValor} /><br /><br />
      <button className="save-button" onClick={salvar}>Salvar</button>
      <button className="list-button" onClick={listaMarcas}>Lista Marcas</button>
    </div>
  );
}

export default MarcaFormulario;
