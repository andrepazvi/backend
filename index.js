const objetos = [
    {
      manzanas: 3,
      peras: 2,
      carne: 1,
      jugos: 5,
      dulces: 2,
    },
    {
      manzanas: 1,
      sandias: 1,
      huevos: 6,
      jugos: 1,
      panes: 4,
    },
  ];
  
  // Creo un nuevo array con todos los tipos de productos
  const TipoDeProductos = objetos.reduce((types, obj) => {
    Object.keys(obj).forEach((productType) => {
      if (!types.includes(productType)) {
        types.push(productType);
      }
    });
    return types;
  }, []);
  
  // Muestro el nuevo array por consola
  console.log("Tipos de productos:", TipoDeProductos);
  
  // Obtengo el total de productos vendidos
  const totalProductosVendidos = objetos.reduce((total, obj) => {
    const cantidades = Object.values(obj);
    const sumCantidades = cantidades.reduce((sum, cantidad) => sum + cantidad, 0);
    return total + sumCantidades;
  }, 0);
  
  console.log("Total de productos vendidos:", totalProductosVendidos);
  