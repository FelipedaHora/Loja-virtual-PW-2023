import React, { useEffect, useState } from "react";
import './CategoriaLista.css'; // Certifique-se de que você tem um arquivo CSS correspondente
import { useNavigate } from "react-router-dom";
import { CategoriaService } from "../../../services/CategoriaService";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Paginator } from 'primereact/paginator'; // Importe o componente Paginator

const CategoriaLista = () => {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const categoriasService = new CategoriaService();
  const [idExcluir, setIdExcluir] = useState(null);
  const [dialogExcluir, setDialogExcluir] = useState(false);
  const [first, setFirst] = useState(0); // Adicione o estado para controlar a primeira página

  useEffect(() => {
    buscarCategorias();
  }, [first]); // Atualize a lista quando a página mudar

  const buscarCategorias = () => {
    categoriasService.listar(first).then(data => { // Adicione um parâmetro para a página atual
      setCategorias(data.data);
    });
  }

  const abrirFormulario = (rowData) => {
    navigate("/categorias-formulario", { state: { categoriasAlterar: rowData } });
  }

  const confirmarExclusao = (rowData) => {
    setIdExcluir(rowData.id);
    setDialogExcluir(true);
  }

  const excluir = () => {
    categoriasService.excluir(idExcluir).then(data => {
      buscarCategorias();
    });
    setDialogExcluir(false);
  }

  const onPageChange = (event) => {
    setFirst(event.first); // Atualize a primeira página
  }

  return (
    <div className="categorias-lista-container">
      <div className="header">
        <h2 className="page-title">Lista de Categorias</h2>
        <Button className="novo-button" label="Nova Categoria" onClick={() => abrirFormulario(null)} />
      </div>
      <DataTable
        value={categorias}
        className="categorias-datatable"
        paginator={false} // Desabilite a paginação aqui
      >
        <Column field="id" header="Id"></Column>
        <Column field="nome" header="Nome"></Column>
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

export default CategoriaLista;
