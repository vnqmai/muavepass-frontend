// src/components/Footer.jsx
import React from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";

const Footer = () => {
  return (
    <Box sx={{ px: 3, py: 4, backgroundColor: "background.footer" }}>
      <Box>
        <Typography variant="h6">Muavepass</Typography>
        <Typography variant="body1">Email: vnqmai.hcmue@gmail.com</Typography>
        <Typography variant="body1">Hotline: 0902550773</Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">All rights reserved 2024 &copy; Muavepass</Typography>
      </Box>
    </Box>
  );
};

export default Footer;
