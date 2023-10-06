import React, { useContext } from 'react';
import './Menu.css';
import { TemaContexto } from '../../App';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const { dark, setDark } = useContext(TemaContexto);
  const navigate = useNavigate();

  const navegar = (pagina) => {
    navigate(pagina);
  }

  return (
    <div className={`menu ${dark ? 'dark' : 'light'}`}>
      <div className="logo">
        <h1>Music Store</h1>
      </div>
      <ul>
        <li onClick={() => navegar("/")}>Home</li>
        <li onClick={() => navegar("/produtos")}>Produtos</li>
        <li onClick={() => navegar("/estados")}>Estados</li>
        <li onClick={() => navegar("/permissoes")}>Permissões</li>
        <li onClick={() => navegar("/marcas")}>Marcas</li>
        <li onClick={() => navegar("/categorias")}>Categorias</li>
      </ul>
      <div className="theme-toggle">
        <label className="switch">
          <input type="checkbox" onClick={() => setDark(!dark)} />
          <span className="slider round"></span>
        </label>
        <span>Modo Escuro</span>
      </div>
    </div>
  );
};

export default Menu;
