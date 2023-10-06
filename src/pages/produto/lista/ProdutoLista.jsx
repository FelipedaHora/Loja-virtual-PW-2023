import React, { useEffect, useState } from "react";
import './ProdutoLista.css';
import { useNavigate } from "react-router-dom";
import { ProdutoService } from "../../../services/ProdutoService";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Paginator } from 'primereact/paginator'; // Importe o componente Paginator

const ProdutoLista = () => {
	const navigate = useNavigate();
	const [produtos, setProdutos] = useState([]);
	const produtoService = new ProdutoService();
	const [idExcluir, setIdExcluir] = useState(null);
	const [dialogExcluir, setDialogExcluir] = useState(false);
	const [first, setFirst] = useState(0); // Adicione o estado para controlar a primeira página

	useEffect(() => {
		buscarProdutos();
	}, [first]); // Atualize a lista quando a página mudar

	const buscarProdutos = () => {
		// Você pode passar o primeiro item da página atual para o serviço para fazer a busca paginada
		produtoService.listar(first).then(data => {
			setProdutos(data.data);
		});
	}

	const formulario = () => {
		navigate("/produto-formulario");
	}

	const alterar = (rowData) => {
		navigate("/produto-formulario", { state: { produtoAlterar: rowData } })
	}

	const excluir = () => {
		produtoService.excluir(idExcluir).then(data => {
			buscarProdutos();
		});
		setDialogExcluir(false);
	}

	const optionColumn = (rowData) => {
		return (
			<div className="options">
				<Button label="Alterar" severity="warning" onClick={() => alterar(rowData)} />
				<Button label="Excluir" severity="danger" onClick={() => { setIdExcluir(rowData.id); setDialogExcluir(true) }} />
			</div>
		)
	}

	const onPageChange = (event) => {
		setFirst(event.first); // Atualize a primeira página
	}

	return (
		<div className="container">
			<h2>Lista de Produtos</h2>
			<button onClick={formulario}>Novo Produto</button>
			<br /><br />
			<DataTable
				value={produtos}
				tableStyle={{ minWidth: '50rem' }}
				paginator={true} // Habilita a paginação
				paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport" // Modelo personalizado de paginação
				onPage={onPageChange} // Manipulador de evento para a mudança de página
				rows={10} // Quantidade de itens por página
			>
				<Column field="id" header="Id"></Column>
				<Column field="descricao" header="Descrição"></Column>
				<Column field="valor" header="Valor"></Column>
				<Column field="valorPromocional" header="Valor Promocional"></Column>
				<Column header="Opções" body={optionColumn}></Column>
			</DataTable>

			<ConfirmDialog visible={dialogExcluir} onHide={() => setDialogExcluir(false)} message="Deseja excluir?"
				header="Confirmação" icon="pi pi-exclamation-triangle" accept={excluir} reject={() => setIdExcluir(null)} acceptLabel="Sim" rejectLabel="Não" />
		</div>
	);
}

export default ProdutoLista;
