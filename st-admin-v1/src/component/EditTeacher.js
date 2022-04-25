import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useHistory, useParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { API } from "./API";
import { useFormik } from "formik";
import { teacherValidationSchema } from "./validation";
function EditTeacher() {
  const { id } = useParams();

  const [teacher, setTeacher] = useState(null);
  function getTInfo() {
    fetch(`${API}/teachers/${id}`)
      .then((data) => data.json())
      .then((tea) => setTeacher(tea));
  }
  useEffect(() => {
    getTInfo();
  }, []);

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
          Edit Teacher
        </Typography>
        {teacher ? <EditInfo teacher={teacher} /> : ""}
      </Box>
    </Container>
  );
}
function EditInfo({ teacher }) {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: teacher.name,
      doj: new Date(teacher.doj),
      gender: teacher.gender,
      contact: teacher.contact,
      address: teacher.address,
    },
    validationSchema: teacherValidationSchema,
    onSubmit: (editT) => {
      fetch(`${API}/teachers/${teacher.id}`, {
        method: "PUT",
        body: JSON.stringify(editT),
        headers: { "Content-Type": "application/json" },
      }).then(() => history.push("/listT"));
    },
  });

  return (
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
            defaultValue={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.name && formik.touched.name}
            helperText={formik.errors.name}
          />
        </Grid>

        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              id="doj"
              name="doj"
              disableFuture
              label="DOJ"
              openTo="year"
              views={["year", "month", "day"]}
              value={formik.values.doj}
              onChange={(doj) => {
                //doj is the variable which contain the selected date
                //You can set it anywhere
                formik.setFieldValue("doj", doj);
              }}
              onBlur={formik.handleBlur}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="DOJ"
                  error={formik.errors.doj && formik.touched.doj}
                  helperText={formik.errors.doj}
                />
              )}
            />
          </LocalizationProvider>
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
            label="Contact Number"
            type="tel"
            id="contact"
            placeholder="xxxxxxxxxx"
            fullWidth
            name="contact"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            defaultValue={formik.values.contact}
            error={formik.errors.contact && formik.touched.contact}
            helperText={formik.errors.contact}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            defaultValue={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.address && formik.touched.address}
            helperText={formik.errors.address}
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Update
      </Button>
    </Box>
  );
}
export default EditTeacher;
