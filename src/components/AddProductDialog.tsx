import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, category: string, price: number) => void;
  categories: string[];
}

const AddProductDialog: React.FC<Props> = ({
  open,
  onClose,
  onAdd,
  categories,
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number>(0);

  const isValid = () => name !== "" && category !== "" && price !== 0;

  const resetFields = () => {
    setName("");
    setCategory("");
    setPrice(0);
  };

  const handleSubmit = () => {
    if (!name || !category || price === 0) return;
    onAdd(name, category, Number(price));
    onClose();
    resetFields();
  };

  const onDialogClose = () => {
    onClose();
    resetFields();
  };

  return (
    <Dialog open={open} onClose={onDialogClose}>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <TextField
          error={name === "" ? true : false}
          required
          fullWidth
          margin="dense"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          helperText={name === "" ? "This field is required." : null}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Category</InputLabel>
          <Select
            error={category === "" && true}
            required
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
          error={price === 0 ? true : false}
          margin="dense"
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          helperText={price === 0 ? "Price cannot be 0." : null}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogClose}>Cancel</Button>
        <Button
          disabled={!isValid()}
          onClick={handleSubmit}
          variant="contained"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;
