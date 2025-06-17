import { useState } from "react";
import { ProductCard, type Product } from "./components/ProductCard";
import { categories, initialProducts } from "./data/data";
import { AddProductDialog } from "./components/AddProductCard";
import { Button, MenuItem, Select, TextField } from "@mui/material";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filter, setFilter] = useState("All");
  const [idCounter, setIdCounter] = useState<number>(
    initialProducts.length + 1
  );
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [nameFilter, setNameFilter] = useState("");

  const handleClearFilters = () => {
    setFilter("All");
    setNameFilter("");
  };

  const handleSave = (updatedProduct: Product) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleAddProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = { ...product, id: idCounter };
    setProducts([...products, newProduct]);
    setIdCounter(idCounter + 1);
  };

  const filteredProducts = products.filter((p) => {
    const categoryMatch = filter === "All" || p.category === filter;
    const nameMatch = p.name.toLowerCase().includes(nameFilter.toLowerCase());
    return categoryMatch && nameMatch;
  });

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>
      <h1>Product Catalog</h1>

      <div style={{ marginBottom: "20px" }}>
        <Button variant="contained" onClick={() => setAddDialogOpen(true)}>
          + Add Product
        </Button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Filter by category: </label>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <MenuItem value="All">All</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Search by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          variant="outlined"
          size="small"
        />
        <Button variant="outlined" onClick={handleClearFilters}>
          Clear Filters
        </Button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredProducts.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <AddProductDialog
        open={addDialogOpen}
        categories={categories}
        onClose={() => setAddDialogOpen(false)}
        onAdd={handleAddProduct}
      />
    </div>
  );
};

export default App;
