import React from 'react';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import PacienteContextProvider from './contexts/PacienteContext';
import PacienteList from './components/PacienteList';

function App() {
  return (
    <div className="App">
        <PacienteContextProvider>
            <PacienteList/>
        </PacienteContextProvider>
    </div>
  );
}

export default App;
