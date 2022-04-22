import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { API } from "./API";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useHistory } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
function AddStudent() {
  const history = useHistory();
  const [classes, setClasses] = useState([]);
  const [gr, setGr] = useState();
  function fetchData() {
    fetch(`${API}/classes`)
      .then((response) => response.json())
      .then((cls) => {
        setClasses(cls);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newStudent = {
      id: parseInt(Math.floor(Math.random() * 20)),
      name: data.get("fullname"),
      adno: data.get("adNo"),
      grade: gr,
      fname: data.get("fName"),
      mname: data.get("mName"),
      contact: data.get("contact"),
      gender: gender,
      address: data.get("address"),
    };


    fetch(`${API}/students`, {
      method: "POST",
      body: JSON.stringify(newStudent),
      headers: { "Content-Type": "application/json" },
    }).then(() => history.push("./listS"));
  };
  const [gender, setGender] = useState("Female");

  const handleChange = (e) => {
    setGender(e.target.value);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Student
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="fullname"
                required
                fullWidth
                id="full"
                label="Full Name"
                autoFocus
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                required
                fullWidth
                id="adNo"
                label="Admission Number"
                name="adNo"
              />
            </Grid>
            <Grid item sm={6}>
              <Autocomplete
                disablePortal
                id="grade"
                onChange={(e, gr) => {
                  setGr(gr.label);
                }}
                options={classes}
                renderInput={(params) => (
                  <TextField {...params} label="Grade" />
                )}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                required
                fullWidth
                id="fName"
                label="Father's Name"
                name="fName"
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                required
                fullWidth
                id="mName"
                label="Mother's Name"
                name="mName"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                label="Contact Number"
                type="tel"
                id="contact"
                placeholder="xxxxxxxxxx"
                fullWidth
                name="contact"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={gender}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AddStudent;
