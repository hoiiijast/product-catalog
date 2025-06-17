import React, { useState } from "react";
import { categories } from "../data/data";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

export const ProductCard: React.FC<{
  product: Product;
  onSave: (product: Product) => void;
  onDelete: (id: number) => void;
}> = ({ product, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(product.name);
  const [editedCategory, setEditedCategory] = useState(product.category);
  const [editedPrice, setEditedPrice] = useState(product.price);

  const handleSave = () => {
    onSave({
      ...product,
      name: editedName,
      category: editedCategory,
      price: editedPrice,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(product.name);
    setEditedCategory(product.category);
    setEditedPrice(product.price);
    setIsEditing(false);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        width: "200px",
        margin: "10px",
      }}
    >
      {isEditing ? (
        <>
          <TextField
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            label="Name"
            fullWidth
            margin="dense"
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
              label="Category"
            >
              {categories.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            type="number"
            value={editedPrice}
            onChange={(e) => setEditedPrice(Number(e.target.value))}
            label="Price"
            fullWidth
            margin="dense"
          />
          <div style={{ marginTop: "8px" }}>
            <Button
              variant="contained"
              onClick={handleSave}
              style={{ marginRight: "8px" }}
            >
              Save
            </Button>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <h3>{product.name}</h3>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Price:</strong> ${product.price.toFixed(2)}
          </p>
          <Button
            variant="contained"
            size="small"
            onClick={() => setIsEditing(true)}
            style={{ marginRight: "8px" }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onDelete(product.id)}
          >
            Delete
          </Button>
        </>
      )}
    </div>
  );
};
