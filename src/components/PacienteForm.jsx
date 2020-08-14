import React, { useContext, useState, useEffect } from "react";
import { PacienteContext } from "../contexts/PacienteContext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";

const PacienteForm = (props) => {
  const { isVisible, setIsVisible } = props;

  const {
    createPaciente,
    deletePaciente,
    editPaciente,
    updatePaciente,
  } = useContext(PacienteContext);

  const initialPacienteState = {
    _id: null,
    nombres: "",
    apellidos: "",
    fecha_alta: null,
    fecha_baja: null,
  };

  const [pacienteData, setPacienteData] = useState(initialPacienteState);

  useEffect(() => {
    if (editPaciente) setPacienteData(editPaciente);
  }, [editPaciente]);

  const updateField = (data, field) => {
    setPacienteData({
      ...pacienteData,
      [field]: data,
    });

    console.log(pacienteData);
  };

  const _deletePaciente = () => {
    if (editPaciente) {
      deletePaciente(pacienteData._id);
      setPacienteData(initialPacienteState);
    }
    setIsVisible(false);
  };

  const savePaciente = () => {
    if (!editPaciente) {
      createPaciente(pacienteData);
    } else {
      updatePaciente(pacienteData);
    }
    setPacienteData(initialPacienteState);
    setIsVisible(false);
  };

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button label="Delete" icon="pi pi-times" onClick={_deletePaciente} />
      <Button label="Save" icon="pi pi-check" onClick={savePaciente} />
    </div>
  );

  const clearSelected = () => {
    setIsVisible(false);
    setPacienteData(initialPacienteState);
  };

  return (
    <div>
      <Dialog
        visible={isVisible}
        modal={true}
        style={{ width: "420px" }}
        contentStyle={{ overflow: "visible" }}
        header="Detalles del Paciente"
        onHide={() => clearSelected()}
        footer={dialogFooter}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={pacienteData.nombres}
              onChange={(e) => updateField(e.target.value.trim(), "nombres")}
            />
            <label>Nombres:</label>
          </div>
          <br />
          <div className="p-float-label">
          <InputText
              value={pacienteData.apellidos}
              onChange={(e) => updateField(e.target.value.trim(), "apellidos")}
            />
            <label>Apellidos:</label>
          </div>
          <br />
          <div className="p-float-label">
            <Calendar
              value={
                pacienteData.fecha_alta &&
                new Date(pacienteData.fecha_alta + " ")
              }
              onChange={(e) =>
                updateField(
                  e.target.value.toISOString().substring(0, 10),
                  "fecha_alta"
                )
              }
              dateFormat="yy-mm-dd"
            />
            <label>Fecha de alta:</label>
          </div>
          <br />
          <div className="p-float-label">
            <Calendar
              value={
                pacienteData.fecha_baja &&
                new Date(pacienteData.fecha_baja + " ")
              }
              onChange={(e) =>
                updateField(
                  e.target.value.toISOString().substring(0, 10),
                  "fecha_baja"
                )
              }
              dateFormat="yy-mm-dd"
            />
            <label>Fecha de baja:</label>
          </div>
          <br />
        </div>
      </Dialog>
    </div>
  );
};

export default PacienteForm;
