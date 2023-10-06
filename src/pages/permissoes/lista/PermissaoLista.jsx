import React, { useEffect, useState } from "react";
import './PermissaoLista.css'; // Certifique-se de que você tem um arquivo CSS correspondente
import { useNavigate } from "react-router-dom";
import { PermissaoService } from "../../../services/PermissaoService";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { ConfirmDialog } from 'primereact/confirmdialog';

const PermissaoLista = () => {
  const navigate = useNavigate();
  const [Permissoes, setPermissoes] = useState([]);
  const PermissaoService = new PermissaoService();
  const [idExcluir, setIdExcluir] = useState(null);
  const [dialogExcluir, setDialogExcluir] = useState(false);

  useEffect(() => {
    buscarPermissoes();
  }, []);

  const buscarPermissoes = () => {
    PermissaoService.listar().then(data => {
      setPermissoes(data.data);
    });
  }

  const abrirFormulario = (rowData) => {
    navigate("/Permissao-formulario", { state: { PermissaoAlterar: rowData } });
  }

  const confirmarExclusao = (rowData) => {
    setIdExcluir(rowData.id);
    setDialogExcluir(true);
  }

  const excluir = () => {
    PermissaoService.excluir(idExcluir).then(data => {
      buscarPermissoes();
    });
    setDialogExcluir(false);
  }

  return (
    <div className="Permissao-lista-container">
      <div className="header">
        <h2 className="page-title">Lista de Permissões</h2>
        <Button className="novo-button" label="Novo Permissao" onClick={() => abrirFormulario(null)} />
      </div>
      <DataTable value={Permissoes} className="Permissao-datatable">
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

export default PermissaoLista;
