import React from 'react';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import ProductoContextProvider from './contexts/PacienteContext';
import ProductoList from './components/ProductoList';

function App() {
  return (
    <div className="App">
        <ProductoContextProvider>
            <ProductoList/>
        </ProductoContextProvider>
    </div>
  );
}

export default App;
