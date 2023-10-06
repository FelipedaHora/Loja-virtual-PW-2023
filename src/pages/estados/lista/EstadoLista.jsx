import React, { useEffect, useState } from "react";
import './EstadoLista.css'; // Certifique-se de que você tem um arquivo CSS correspondente
import { useNavigate } from "react-router-dom";
import { EstadoService } from "../../../services/EstadoService";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { ConfirmDialog } from 'primereact/confirmdialog';

const EstadoLista = () => {
    const navigate = useNavigate();
    const [estados, setEstados] = useState([]);
    const estadoService = new EstadoService();
    const [idExcluir, setIdExcluir] = useState(null);
    const [dialogExcluir, setDialogExcluir] = useState(false);

    useEffect(() => {
        buscarEstados();
    }, []);

    const buscarEstados = () => {
        estadoService.listar().then(data => {
            setEstados(data.data);
        });
    }

    const abrirFormulario = (rowData) => {
        navigate("/estado-formulario", { state: { estadoAlterar: rowData } });
    }

    const confirmarExclusao = (rowData) => {
        setIdExcluir(rowData.id);
        setDialogExcluir(true);
    }

    const excluir = () => {
        estadoService.excluir(idExcluir).then(data => {
            buscarEstados();
        });
        setDialogExcluir(false);
    }

    return (
        <div className="estado-lista-container">
            <div className="header">
                <h2 className="page-title">Lista de Estados</h2>
                <Button className="novo-button" label="Novo Estado" onClick={() => abrirFormulario(null)} />
            </div>
            <DataTable value={estados} className="estado-datatable">
                <Column field="id" header="Id"></Column>
                <Column field="nome" header="Nome"></Column>
                <Column field="sigla" header="Sigla"></Column>
                <Column header="Ações" body={(rowData) => (
                    <div className="options">
                        <Button label="Editar" className="editar-button" onClick={() => abrirFormulario(rowData)} />
                        <Button label="Excluir" className="excluir-button" onClick={() => confirmarExclusao(rowData)} />
                    </div>
                )}></Column>
            </DataTable>

            <ConfirmDialog visible={dialogExcluir} onHide={() => setDialogExcluir(false)} message="Deseja excluir?"
                header="Confirmação" icon="pi pi-exclamation-triangle" accept={excluir} reject={() => setIdExcluir(null)} acceptLabel="Sim" rejectLabel="Não" />
        </div>
    );
}

export default EstadoLista;
