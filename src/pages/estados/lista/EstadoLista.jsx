import React, { useEffect, useState } from "react";
import './EstadoLista.css'; // Certifique-se de que você tem um arquivo CSS correspondente
import { useNavigate } from "react-router-dom";
import { EstadoService } from "../../../services/EstadoService";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Paginator } from 'primereact/paginator'; // Importe o componente Paginator

const EstadoLista = () => {
    const navigate = useNavigate();
    const [estados, setEstados] = useState([]);
    const estadoService = new EstadoService();
    const [idExcluir, setIdExcluir] = useState(null);
    const [dialogExcluir, setDialogExcluir] = useState(false);
    const [first, setFirst] = useState(0); // Adicione o estado para controlar a primeira página

    useEffect(() => {
        buscarEstados();
    }, [first]); // Atualize a lista quando a página mudar

    const buscarEstados = () => {
        // Você pode passar o primeiro item da página atual para o serviço para fazer a busca paginada
        estadoService.listar(first).then(data => {
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

    const onPageChange = (event) => {
        setFirst(event.first); // Atualize a primeira página
    }

    return (
        <div className="estado-lista-container">
            <div className="header">
                <h2 className="page-title">Lista de Estados</h2>
                <Button className="novo-button" label="Novo Estado" onClick={() => abrirFormulario(null)} />
            </div>
            <DataTable
                value={estados}
                className="estado-datatable"
                paginator={false} // Desabilite a paginação aqui
            >
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
            <Paginator // Componente Paginator para a paginação
                first={first}
                rows={10}
                totalRecords={100} // Total de registros (você deve obter isso do servidor)
                onPageChange={onPageChange}
            />
            <ConfirmDialog visible={dialogExcluir} onHide={() => setDialogExcluir(false)} message="Deseja excluir?"
                header="Confirmação" icon="pi pi-exclamation-triangle" accept={excluir} reject={() => setIdExcluir(null)} acceptLabel="Sim" rejectLabel="Não" />
        </div>
    );
}

export default EstadoLista;
