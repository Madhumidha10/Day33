import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
function Copyright() {
  return (
    <Box sx={{ ml: 30, marginTop: "auto" }}>
      <Typography variant="body2" color="text.primary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="#">
          St. Joseph Academy
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}

export default Copyright;
