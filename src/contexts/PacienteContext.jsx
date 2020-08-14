import React, { createContext, useState, useEffect } from "react";
import { PacienteService } from "../services/PacienteService";

export const PacienteContext = createContext();

const PacienteContextProvider = (props) => {
  const pacienteService = new PacienteService();

  const [pacientes, setPacientes] = useState([]);

  const [editPaciente, setEditPaciente] = useState(null);

  useEffect(() => {
    pacienteService.readAll().then((data) => setPacientes(data));
  }, []);

  const createPaciente = (paciente) => {
    pacienteService
      .create(paciente)
      .then((data) => setPacientes([...pacientes, data]));
  };

  const deletePaciente = (id) => {
    pacienteService
      .delete(id)
      .then(() => setPacientes(pacientes.filter((p) => p._id !== id)));
  };

  const findPaciente = (id) => {
    const paciente = pacientes.find((p) => p._id === id);

    setEditPaciente(paciente);
  };

  const updatePaciente = (paciente) => {
    pacienteService
      .update(paciente)
      .then((data) =>
        setPacientes(
          pacientes.map((p) => (p._id === paciente._id ? data : paciente))
        )
      );

    setEditPaciente(null);
  };

  return (
    <PacienteContext.Provider
      value={{
        createPaciente,
        deletePaciente,
        findPaciente,
        updatePaciente,
        editPaciente,
        pacientes,
      }}
    >
      {props.children}
    </PacienteContext.Provider>
  );
};

export default PacienteContextProvider;
