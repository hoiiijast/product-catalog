import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import type { Product } from "../data/types";
import api from "../api/axiosConfig";
import Header from "./Header";
import ProductCard from "./ProductCard";
import AddProductDialog from "./AddProductDialog";
import { categories } from "../data/data";
import { productsViewStyles } from "../styles/productViewStyles";

const ProductView: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterName, setFilterName] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (
    name: string,
    category: string,
    price: number
  ) => {
    await api.post("/products", { name, category, price });
    fetchProducts();
    setDialogOpen(false);
  };

  const handleDeleteProduct = async (id: number) => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  const handleUpdateProduct = async (
    id: number,
    name: string,
    category: string,
    price: number
  ) => {
    await api.put(`/products/${id}`, { name, category, price });
    fetchProducts();
  };

  const clearFilters = () => {
    setFilterName("");
    setFilterCategory("");
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(filterName.toLowerCase()) &&
      (filterCategory ? p.category === filterCategory : true)
  );

  return (
    <>
      <Header />
      <Box sx={productsViewStyles.mainContainer}>
        <TextField
          label="Search by name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <FormControl>
          <InputLabel>Category</InputLabel>
          <Select
            sx={{ width: 200 }}
            value={filterCategory}
            label="Category"
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="outlined" onClick={clearFilters}>
          Clear Filters
        </Button>
        <Button variant="contained" onClick={() => setDialogOpen(true)}>
          + Add Product
        </Button>
      </Box>

      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            categories={categories}
            onDelete={handleDeleteProduct}
            onUpdate={handleUpdateProduct}
          />
        ))}
      </Grid>

      <AddProductDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAdd={handleAddProduct}
        categories={categories}
      />
    </>
  );
};

export default ProductView;
