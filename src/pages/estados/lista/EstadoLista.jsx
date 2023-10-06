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
        })
    }

    const formulario = () => {
        navigate("/estado-formulario");
    }

    const alterar = (rowData) => {
        navigate("/estado-formulario", { state: { estadoAlterar: rowData } })
    }

    const excluir = () => {
        estadoService.excluir(idExcluir).then(data => {
            buscarEstados();
        });
    }

    const optionColumn = (rowData) => {
        return (
            <div className="options">
                <Button label="Alterar" className="alterar-button" onClick={() => alterar(rowData)} />
                <Button label="Excluir" className="excluir-button" onClick={() => { setIdExcluir(rowData.id); setDialogExcluir(true) }} />
            </div>
        )
    }

    return (
        <div className="container">
            <h2 className="page-title">Lista de Estados</h2>
            <button className="novo-button" onClick={formulario}>Novo Estado</button>
            <br /><br />
            <DataTable value={estados} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="Id"></Column>
                <Column field="nome" header="Nome"></Column>
                <Column field="sigla" header="Sigla"></Column>
                <Column header="Opções" body={optionColumn}></Column>
            </DataTable>

            <ConfirmDialog visible={dialogExcluir} onHide={() => setDialogExcluir(false)} message="Deseja excluir?"
                header="Confirmação" icon="pi pi-exclamation-triangle" accept={excluir} reject={() => setIdExcluir(null)} acceptLabel="Sim" rejectLabel="Não" />
        </div>
    );
}

export default EstadoLista;
