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
import { studentValidationSchema } from "./validation";
import { useFormik } from "formik";

function AddStudent() {
  const history = useHistory();
  const [classes, setClasses] = useState([]);

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

  const formik = useFormik({
    initialValues: {
      name: "",
      adno: "",
      grade: "",
      fname: "",
      mname: "",
      contact: "",
      gender: "Female",
      address: "",
    },
    validationSchema: studentValidationSchema,
    onSubmit: (newStudent) => {
      fetch(`${API}/students`, {
        method: "POST",
        body: JSON.stringify(newStudent),
        headers: { "Content-Type": "application/json" },
      }).then(() => history.push("./listS"));
    },
  });
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
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="Full Name"
                autoFocus
                values={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.name && formik.touched.name}
                helperText={formik.errors.name}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                required
                fullWidth
                id="adno"
                label="Admission Number"
                name="adno"
                values={formik.values.adno}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.adno && formik.touched.adno}
                helperText={formik.errors.adno}
              />
            </Grid>
            <Grid item sm={6}>
              <Autocomplete
                disablePortal
                id="grade"
                name="grade"
                values={formik.values.grade}
                onChange={(e, grade) => {
                  formik.setFieldValue("grade", grade.label);
                }}
                onBlur={formik.handleBlur}
                options={classes}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Grade"
                    error={formik.errors.grade && formik.touched.grade}
                    helperText={formik.errors.grade}
                  />
                )}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                required
                fullWidth
                id="fname"
                label="Father's Name"
                name="fname"
                values={formik.values.fname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.fname && formik.touched.fname}
                helperText={formik.errors.fname}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                required
                fullWidth
                id="mname"
                label="Mother's Name"
                name="mname"
                values={formik.values.mname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.mname && formik.touched.mname}
                helperText={formik.errors.mname}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                values={formik.values.contact}
                error={formik.errors.contact && formik.touched.contact}
                helperText={formik.errors.contact}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Gender
                </FormLabel>
                <RadioGroup
                  id="gender"
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.gender && formik.touched.gender}
                  helpertext={formik.errors.gender}
                >
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    checked={formik.values.gender === "Female"}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    checked={formik.values.gender === "Male"}
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
                values={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.address && formik.touched.address}
                helperText={formik.errors.address}
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
