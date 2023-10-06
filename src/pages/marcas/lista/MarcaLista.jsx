import React, { useEffect, useState } from "react";
import './MarcaLista.css';
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { MarcaService } from "../../../services/MarcaService";

const MarcaLista = () => {
  const navigate = useNavigate();
  const [marcas, setMarcas] = useState([]);
  const marcaService = new MarcaService();
  const [idExcluir, setIdExcluir] = useState(null);
  const [dialogExcluir, setDialogExcluir] = useState(false);

  useEffect(() => {
    buscarMarcas();
  }, []);

  const buscarMarcas = () => {
    marcaService.listar().then(data => {
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

  return (
    <div className="Marca-lista-container">
      <div className="header">
        <h2 className="page-title">Lista de Marcas</h2>
        <Button className="novo-button" label="Novo Marca" onClick={() => abrirFormulario(null)} />
      </div>
      <DataTable value={marcas} className="Marca-datatable">
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

export default MarcaLista;
