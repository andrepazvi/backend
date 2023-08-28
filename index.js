const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.nextId = 1;
    this.loadProductsFromDB();
  }

  addProduct(product) {
    if (!this.validateProduct(product)) {
      console.log("Error: Producto no válido.");
      return;
    }

    if (this.isCodeDuplicate(product.code)) {
      console.log("Error: el código del producto ya existe.");
      return;
    }

    product.id = this.nextId++;
    this.products.push(product);
    this.saveProductsToDB();
    console.log("Producto añadido:", product);
  }

  validateProduct(product) {
    return (
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.code &&
      product.stock !== undefined
    );
  }

  isCodeDuplicate(code) {
    return this.products.some((product) => product.code === code);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      throw new Error("Producto no encontrado.");
    }
  }

  loadProductsFromDB() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
      this.nextId = this.products.reduce((maxId, product) => Math.max(maxId, product.id), 0) + 1;
    } catch (error) {
      this.products = [];
    }
  }

  saveProductsToDB() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
  }
}

const productManager = new ProductManager('products.json');

const product1 = {
  title: "Producto 1",
  description: "Descripción del producto 1",
  price: 10,
  thumbnail: "image1.jpg",
  code: "P1",
  stock: 50,
};

const product2 = {
  title: "Producto 2",
  description: "Descripción del producto 2",
  price: 20,
  thumbnail: "image2.jpg",
  code: "P2",
  stock: 30,
};

productManager.addProduct(product1);
productManager.addProduct(product2);

const allProducts = productManager.getProducts();
console.log("All products:", allProducts);

const productById = productManager.getProductById(1);
console.log("Product by ID:", productById);

try {
  const productNotFound = productManager.getProductById(123);
  console.log("Product by ID (not found):", productNotFound);
} catch (error) {
  console.log(error.message);
}
