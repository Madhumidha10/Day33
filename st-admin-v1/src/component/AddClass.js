import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { useHistory } from "react-router-dom";
import { API } from "./API";
import { useFormik } from "formik";
import * as yup from "yup";

const classValidationSchema = yup.object({
  gr: yup.string().required("Grade must be selected in"),
  se: yup.string().required("Section must be selected in"),
  ct: yup.string().required("Class Teacher must be selected in"),
});

function AddClass() {
  const history = useHistory();
  const grade = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const sec = ["A", "B", "C", "D", "E"];

  const [teacherList, setTeacherList] = useState([]);
  const [classes, setClasses] = useState([]);

  function fetchData() {
    fetch(`${API}/teachers`)
      .then((response) => response.json())
      .then((tea) => {
        setTeacherList(tea);
      });
    fetch(`${API}/classes`)
      .then((response) => response.json())
      .then((cls) => {
        setClasses(cls);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const tL = [];
  {
    teacherList.map((t) => tL.push(t.name));
  }

  const formik = useFormik({
    initialValues: { gr: "", se: "", ct: "" },
    validationSchema: classValidationSchema,
    onSubmit: (values) => {
      const newClass = {
        label: `Grade${values.gr}-${values.se}`,
        ct: values.ct,
      };

      {
        classes.map((el) => el.label).includes(newClass.label)
          ? alert("class Already Exists")
          : fetch(`${API}/classes`, {
              method: "POST",
              body: JSON.stringify(newClass),
              headers: {
                "Content-Type": "application/json",
              },
            }).then(() => history.push("/listC"));
      }
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
          mt: 20,
        }}
      >
        <Typography component="h1" variant="h5">
          Add New Class
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Autocomplete
                disablePortal
                id="gr"
                name="gr"
                values={formik.values.gr}
                onChange={(e, gr) => {
                  formik.setFieldValue("gr", gr);
                }}
                onBlur={formik.handleBlur}
                options={grade}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Grade"
                    error={formik.errors.gr && formik.touched.gr}
                    helperText={formik.errors.gr}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                disablePortal
                id="se"
                name="se"
                values={formik.values.se}
                onChange={(e, se) => {
                  formik.setFieldValue("se", se);
                }}
                onBlur={formik.handleBlur}
                options={sec}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Section"
                    error={formik.errors.se && formik.touched.se}
                    helperText={formik.errors.se}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                disablePortal
                id="ct"
                name="ct"
                values={formik.values.ct}
                onChange={(e, ct) => {
                  formik.setFieldValue("ct", ct);
                }}
                onBlur={formik.handleBlur}
                options={tL}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Class Teacher"
                    error={formik.errors.ct && formik.touched.ct}
                    helperText={formik.errors.ct}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AddClass;
