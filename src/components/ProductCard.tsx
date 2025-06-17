import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Select,
  MenuItem,
  CardActions,
  Button,
  FormControl,
  InputLabel,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import type { Product } from "../data/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { productCardStyles } from "../styles/cardStyles";

interface ProductCardProps {
  product: Product;
  categories: string[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, name: string, category: string, price: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  categories,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(product.price);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleSave = () => {
    onUpdate(product.id, name, category, price);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price);
  };

  return (
    <Card sx={productCardStyles.card}>
      <CardContent>
        {isEditing ? (
          <>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="dense"
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              margin="dense"
            />
          </>
        ) : (
          <>
            <Typography sx={productCardStyles.productName}>
              {product.name}
            </Typography>
            <Typography color="text.secondary">{product.category}</Typography>
            <Typography sx={productCardStyles.price}>
              ${product.price}
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        {isEditing ? (
          <>
            <Button onClick={handleSave} size="small">
              Save
            </Button>
            <Button onClick={handleCancel} size="small">
              Cancel
            </Button>
          </>
        ) : (
          <>
            <IconButton onClick={() => setIsEditing(true)} size="small">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => setDeleteDialogOpen(true)} size="small">
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </CardActions>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            color="error"
            onClick={() => {
              onDelete(product.id);
              setDeleteDialogOpen(false);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ProductCard;
