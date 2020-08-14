import React, { useContext, useState } from "react";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { PacienteContext } from "../contexts/PacienteContext";
import PacienteForm from "./PacienteForm";

const PacienteList = () => {
  const { pacientes, findPaciente } = useContext(PacienteContext);

  const [isVisible, setIsVisible] = useState(false);

  const savePaciente = (id) => {
    findPaciente(id);
    setIsVisible(true);
  };

  const footer = (
    <div className="p-clearfix" style={{ width: "100%" }}>
      <Button
        style={{ float: "left" }}
        icon="pi pi-plus"
        label="Add"
        onClick={() => setIsVisible(true)}
      />
    </div>
  );

  return (
    <div>
      <Panel header="LISTA DE PACIENTES" style={{ textAlign: "center" }}>
        <DataTable
          value={pacientes}
          selectionMode="single"
          onSelectionChange={(e) => savePaciente(e.value._id)}
          footer={footer}
        >
          <Column field="_id" header="Id" />
          <Column field="nombres" header="Nombres" />
          <Column field="apellidos" header="Apellidos" />
          <Column field="fecha_alta" header="Fecha de Alta" />
          <Column field="fecha_baja" header="Fecha de Baja" />
        </DataTable>
      </Panel>
      <PacienteForm isVisible={isVisible} setIsVisible={setIsVisible} />
    </div>
  );
};

export default PacienteList;
