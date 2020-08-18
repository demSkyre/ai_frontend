import React, { createContext, useState, useEffect } from "react";
import { ProductoService } from "../services/ProductoService";

export const ProductoContext = createContext();

const ProductoContextProvider = (props) => {
  const productoService = new ProductoService();

  const [productos, setProductos] = useState([]);

  const [editProducto, setEditProductos] = useState(null);

  useEffect(() => {
    productoService.readAll().then((data) => setProductos(data));
  }, [productoService, productos]);

  const createProducto = (producto) => {
    productoService
      .create(producto)
      .then((data) => setProductos([...productos, data]));
  };

  const deleteProducto = (id) => {
    productoService
      .delete(id)
      .then(() => setProductos(productos.filter((p) => p._id !== id)));
  };

  const findProducto = (id) => {
    const producto = productos.find((p) => p._id === id);

    setEditProductos(producto);
  };

  const updateProducto = (producto) => {
    productoService
      .update(producto)
      .then((data) =>
        setProductos(
          productos.map((p) => (p._id === producto._id ? data : producto))
        )
      );

    setEditProductos(null);
  };

  return (
    <ProductoContext.Provider
      value={{
        createProducto,
        deleteProducto,
        findProducto,
        updateProducto,
        editProducto,
        productos,
      }}
    >
      {props.children}
    </ProductoContext.Provider>
  );
};

export default ProductoContextProvider;
