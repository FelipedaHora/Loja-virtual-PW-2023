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
    const [erroCamposVazios, setErroCamposVazios] = useState(false); // Estado para controlar o erro de campos vazios
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
        // Remova a mensagem de erro quando o usuário começar a preencher os campos
        setErroCamposVazios(false);
    }

    const salvar = () => {
        if (estado.nome.trim() === '' || estado.sigla.trim() === '') {
            // Exiba a mensagem de erro quando os campos estiverem vazios
            setErroCamposVazios(true);
            return;
        }

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
            <div className="input-container">
                <div className="input-field">
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" name="nome" id="nome" value={estado.nome} onChange={alterarValor} />
                </div>
                <div className="input-field">
                    <label htmlFor="sigla">Sigla:</label>
                    <input type="text" name="sigla" id="sigla" value={estado.sigla} onChange={alterarValor} />
                </div>
            </div>
            {erroCamposVazios && (
                <p className="erro-campos-vazios">Preencha todos os campos antes de salvar.</p>
            )}
            <br />
            <button className="save-button" onClick={salvar}>Salvar</button>
            <button className="list-button" onClick={listaEstados}>Lista Estados</button>
        </div>
    );
}

export default EstadoFormulario;
