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
import { API } from "./API";
import FormLabel from "@mui/material/FormLabel";

import { useHistory, useParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
function EditStudent() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [classes, setClasses] = useState([]);

  function fetchData() {
    fetch(`${API}/students/${id}`, { method: "GET" })
      .then((data) => data.json())
      .then((stu) => setStudent(stu));

    fetch(`${API}/classes/`, { method: "GET" })
      .then((data) => data.json())
      .then((cls) => setClasses(cls));
  }
  useEffect(() => {
    fetchData();
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
          Edit Student
        </Typography>
        {student ? <EditInfo student={student} classes={classes} /> : ""}
      </Box>
    </Container>
  );
}
function EditInfo({ student, classes }) {
  const history = useHistory();
  const [name, setName] = useState(student.name);
  const [adno, setAdno] = useState(student.adno);
  const [gr, setGr] = useState(student.grade);
  const [fname, setFname] = useState(student.fname);
  const [gender, setGender] = useState(student.gender);
  const [mname, setMname] = useState(student.mname);
  const [contact, setContact] = useState(student.contact);
  const [address, setAddress] = useState(student.address);
  const handleSubmit = (event) => {
    const editS = {
      name: name,
      adno: adno,
      grade: gr,
      fname: fname,
      mname: mname,
      contact: contact,
      gender: gender,
      address: address,
    };
    fetch(`${API}/students/${student.id}`, {
      method: "PUT",
      body: JSON.stringify(editS),
      headers: { "Content-Type": "application/json" },
    }).then(() => history.push("/listS"));

    event.preventDefault();
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="fullname"
            defaultValue={name}
            required
            fullWidth
            id="full"
            label="Full Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            required
            fullWidth
            defaultValue={adno}
            id="adNo"
            label="Admission Number"
            name="adNo"
            onChange={(e) => setAdno(e.target.value)}
          />
        </Grid>
        <Grid item sm={6}>
          <Autocomplete
            disablePortal
            id="grade"
            options={classes}
            onChange={(e, gra) => {
              setGr(gra.label);
            }}
            value={gr}
            isOptionEqualToValue={(option, value) => option.label === value}
            renderInput={(params) => <TextField {...params} label="Grade" />}
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            required
            fullWidth
            defaultValue={fname}
            id="fName"
            label="Father's Name"
            name="fName"
            onChange={(e) => setFname(e.target.value)}
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            required
            fullWidth
            defaultValue={mname}
            id="mName"
            label="Mother's Name"
            name="mName"
            onChange={(e) => setMname(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            defaultValue={contact}
            label="Contact Number"
            type="tel"
            id="contact"
            placeholder="xxxxxxxxxx"
            fullWidth
            name="contact"
            onChange={(e) => setContact(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <FormControl fullWidth> */}
          <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            defaultValue={gender}
            name="controlled-radio-buttons-group"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
          </RadioGroup>
          {/* </FormControl> */}
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            defaultValue={address}
            id="address"
            label="Address"
            name="address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Update
      </Button>
    </Box>
  );
}

export default EditStudent;
