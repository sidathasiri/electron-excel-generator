import React, { useState } from "react";
import {
  TextField,
  TextareaAutosize,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const Form = () => {
  const [formData, setFormData] = useState({
    customerId: "",
    description: "",
    date: null,
  });

  console.log("form data:", formData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newDate) => {
    if (newDate && dayjs(newDate).isValid()) {
      setFormData((prev) => ({
        ...prev,
        date: dayjs(newDate).format("MM/DD/YYYY"),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        date: "",
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted:", formData);
    // Add your submit logic here
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" textAlign="center">
        Data Entry Form
      </Typography>
      <TextField
        label="Customer ID"
        name="customerId"
        value={formData.customerId}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextareaAutosize
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        minRows={4}
        style={{
          width: "100%",
          padding: "8px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField label="Date" onChange={handleDateChange} />
      </LocalizationProvider>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
      >
        Submit
      </Button>
    </Box>
  );
};

export default Form;
