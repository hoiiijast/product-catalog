import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import type { Product } from "./ProductCard";

interface AddProductDialogProps {
  open: boolean;
  categories: string[];
  onClose: () => void;
  onAdd: (product: Omit<Product, "id">) => void;
}

export const AddProductDialog: React.FC<AddProductDialogProps> = ({
  open,
  categories,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [price, setPrice] = useState<number>(0);

  const handleAdd = () => {
    if (!name) return alert("Product name required");
    onAdd({ name, category, price });
    setName("");
    setCategory(categories[0]);
    setPrice(0);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <TextField
          label="Product Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="dense"
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
          label="Price"
          fullWidth
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
