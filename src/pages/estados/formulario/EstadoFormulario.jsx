import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './EstadoFormulario.css'; // Certifique-se de que você tem um arquivo CSS correspondente
import { EstadoService } from "../../../services/EstadoService";

const EstadoFormulario = (props) => {
    const navigate = useNavigate();
    const estadoNovo = { nome: '', sigla: '' };
    const location = useLocation();
    const { estadoAlterar } = location.state || {};

    const [estado, setEstado] = useState(estadoNovo);
    const estadoService = new EstadoService();

    useEffect(() => {
        if (estadoAlterar) {
            setEstado(estadoAlterar);
        } else {
            setEstado(estadoNovo);
        }
    }, []);

    const listaEstados = () => {
        navigate("/estados")
    }

    const alterarValor = (event) => {
        setEstado({ ...estado, [event.target.name]: event.target.value });
    }

    const salvar = () => {
        if (estado.id) {
            estadoService.alterar(estado).then(data => {
                console.log(data);
                setEstado(estadoNovo);
            });
        } else {
            estadoService.inserir(estado).then(data => {
                console.log(data);
                setEstado(estadoNovo);
            });
        }
    }

    return (
        <div className="container">
            <h2 className="page-title">Inserir ou Alterar um Estado</h2>
            <input type="text" name="nome" className="input-field" value={estado.nome} onChange={alterarValor} /><br /><br />
            <input type="text" name="sigla" className="input-field" value={estado.sigla} onChange={alterarValor} /><br /><br />
            <button className="save-button" onClick={salvar}>Salvar</button>
            <button className="list-button" onClick={listaEstados}>Lista Estados</button>
        </div>
    );
}

export default EstadoFormulario;
