import React, { useEffect, useState } from "react";
import './MarcaLista.css'; // Certifique-se de que você tem um arquivo CSS correspondente
import { useNavigate } from "react-router-dom";
import { MarcaService } from "../../../services/MarcaService";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { ConfirmDialog } from 'primereact/confirmdialog';

const MarcaLista = () => {
  const navigate = useNavigate();
  const [Marcas, setMarcas] = useState([]);
  const MarcaService = new MarcaService();
  const [idExcluir, setIdExcluir] = useState(null);
  const [dialogExcluir, setDialogExcluir] = useState(false);

  useEffect(() => {
    buscarMarcas();
  }, []);

  const buscarMarcas = () => {
    MarcaService.listar().then(data => {
      setMarcas(data.data);
    });
  }

  const abrirFormulario = (rowData) => {
    navigate("/Marca-formulario", { state: { MarcaAlterar: rowData } });
  }

  const confirmarExclusao = (rowData) => {
    setIdExcluir(rowData.id);
    setDialogExcluir(true);
  }

  const excluir = () => {
    MarcaService.excluir(idExcluir).then(data => {
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
      <DataTable value={Marcas} className="Marca-datatable">
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
