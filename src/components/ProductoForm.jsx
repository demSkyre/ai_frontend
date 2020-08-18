import React, { useContext, useState, useEffect } from "react";
import { ProductoContext } from "../contexts/ProductoContext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";

const ProductoForm = (props) => {
  const { isVisible, setIsVisible } = props;

  const {
    createProducto,
    deleteProducto,
    editProducto,
    updateProducto,
  } = useContext(ProductoContext);

  const initialProductoState = {
    _id: null,
    nombre: "",
    precio: "",
    fecha_almacen: null,
  };

  const [productoData, setProductoData] = useState(initialProductoState);

  useEffect(() => {
    if (editProducto) setProductoData(editProducto);
  }, [editProducto]);

  const updateField = (data, field) => {
    setProductoData({
      ...productoData,
      [field]: data,
    });

    console.log(productoData);
  };

  const _deleteProducto = () => {
    if (editProducto) {
      deleteProducto(productoData._id);
      setProductoData(initialProductoState);
    }
    setIsVisible(false);
  };

  const saveProducto = () => {
    if (!editProducto) {
      createProducto(productoData);
    } else {
      updateProducto(productoData);
    }
    setProductoData(initialProductoState);
    setIsVisible(false);
  };

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button label="Delete" icon="pi pi-times" onClick={_deleteProducto} />
      <Button label="Save" icon="pi pi-check" onClick={saveProducto} />
    </div>
  );

  const clearSelected = () => {
    setIsVisible(false);
    setProductoData(initialProductoState);
  };

  return (
    <div>
      <Dialog
        visible={isVisible}
        modal={true}
        style={{ width: "420px" }}
        contentStyle={{ overflow: "visible" }}
        header="Detalles del Producto"
        onHide={() => clearSelected()}
        footer={dialogFooter}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={productoData.nombre}
              onChange={(e) => updateField(e.target.value.trim(), "nombre")}
            />
            <label>Nombres:</label>
          </div>
          <br />
          <div className="p-float-label">
          <InputNumber
              value={productoData.precio}
              onChange={(e) => updateField(e.target.value, "precio")}
            />
            <label>Apellidos:</label>
          </div>
          <br />
          <div className="p-float-label">
            <Calendar
              value={
                productoData.fecha_almacen &&
                new Date(productoData.fecha_almacen + " ")
              }
              onChange={(e) =>
                updateField(
                  e.target.value.toISOString().substring(0, 10),
                  "fecha_almacen"
                )
              }
              dateFormat="yy-mm-dd"
            />
            <label>Fecha en Almacen:</label>
          </div>
          <br />
        </div>
      </Dialog>
    </div>
  );
};

export default ProductoForm;
