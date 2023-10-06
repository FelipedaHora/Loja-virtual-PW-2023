import React, { useEffect, useState } from "react";
import './MarcaLista.css';
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { MarcaService } from "../../../services/MarcaService";
import { Paginator } from 'primereact/paginator'; // Importe o componente Paginator

const MarcaLista = () => {
  const navigate = useNavigate();
  const [marcas, setMarcas] = useState([]);
  const marcaService = new MarcaService();
  const [idExcluir, setIdExcluir] = useState(null);
  const [dialogExcluir, setDialogExcluir] = useState(false);
  const [first, setFirst] = useState(0); // Adicione o estado para controlar a primeira página

  useEffect(() => {
    buscarMarcas();
  }, [first]); // Atualize a lista quando a página mudar

  const buscarMarcas = () => {
    // Você pode passar o primeiro item da página atual para o serviço para fazer a busca paginada
    marcaService.listar(first).then(data => {
      setMarcas(data.data);
    });
  }

  const abrirFormulario = (rowData) => {
    navigate("/marca-formulario", { state: { MarcaAlterar: rowData } });
  }

  const confirmarExclusao = (rowData) => {
    setIdExcluir(rowData.id);
    setDialogExcluir(true);
  }

  const excluir = () => {
    marcaService.excluir(idExcluir).then(data => {
      buscarMarcas();
    });
    setDialogExcluir(false);
  }

  const onPageChange = (event) => {
    setFirst(event.first); // Atualize a primeira página
  }

  return (
    <div className="Marca-lista-container">
      <div className="header">
        <h2 className="page-title">Lista de Marcas</h2>
        <Button className="novo-button" label="Nova Marca" onClick={() => abrirFormulario(null)} />
      </div>
      <DataTable
        value={marcas}
        className="Marca-datatable"
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

export default MarcaLista;
