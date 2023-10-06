import React, { createContext, useState } from 'react';
import './App.css';
import Menu from './components/menu/Menu';
import Home from './pages/home/Home';
import Rodape from './components/rodape/Rodape';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProdutoLista from './pages/produto/lista/ProdutoLista';
import ProdutoFormulario from './pages/produto/formulario/ProdutoFormulario';
import EstadoFormulario from './pages/estados/formulario/EstadoFormulario';
import EstadoLista from './pages/estados/lista/EstadoLista';
import PermissaoLista from './pages/permissoes/lista/PermissaoLista';
import PermissaoFormulario from './pages/permissoes/formulario/PermissaoFormulario';
import MarcaLista from './pages/marcas/lista/MarcaLista';
import MarcaFormulario from './pages/marcas/formulario/MarcaFormulario';
import CategoriaLista from './pages/categorias/lista/CategoriaLista';
import CategoriaFormulario from './pages/categorias/formulario/CategoriaFormulario';

export const TemaContexto = createContext();

function App() {
	const [dark, setDark] = useState(true);

	return (
		<div className="App">

			<TemaContexto.Provider value={{ dark, setDark }}>
				<BrowserRouter>
					<Menu />
					<Routes>
						<Route exact path='/' Component={() => <Home />} />
						<Route path='/produtos' Component={ProdutoLista} />
						<Route path='/produto-formulario' Component={ProdutoFormulario} />
						<Route path='/estados' Component={EstadoLista} />
						<Route path='/estado-formulario' Component={EstadoFormulario} />
						<Route path='/permissoes' Component={PermissaoLista} />
						<Route path='/permissao-formulario' Component={PermissaoFormulario} />
						<Route path='/marcas' Component={MarcaLista} />
						<Route path='/marca-formulario' Component={MarcaFormulario} />
						<Route path='/categorias' Component={CategoriaLista} />
						<Route path='/categoria-formulario' Component={CategoriaFormulario} />
					</Routes>
					<Rodape />
				</BrowserRouter>
			</TemaContexto.Provider>
		</div>
	);
}

export default App;
