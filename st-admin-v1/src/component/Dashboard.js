import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { API } from "./API";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
  const history = useHistory();

  const [classes, setClasses] = useState([]);
  function fetchData() {
    fetch(`${API}/classes`)
      .then((response) => response.json())
      .then((cls) => {
        //  console.log(cls);
        setClasses(cls);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "navy" : "#01579b",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "white",
  }));
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, m: 5 }}>
      <Typography variant="h6" component="div" sx={{ m: 5 }}>
        Classes
      </Typography>

      <Grid container spacing={2}>
        {classes.map((cl, index) => (
          <Grid
            item
            sm={4}
            key={index}
            onClick={() => history.push(`/cInfo/${cl.id}`)}
          >
            <Item>
              <Typography variant="body1" component="span">
                {cl.label}
              </Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
