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
  const [name, setName] = useState(teacher.name);
  const [dt, setDt] = useState(new Date(teacher.doj));
  const [gender, setGender] = useState(teacher.gender);
  const [contact, setContact] = useState(teacher.contact);
  const [address, setAddress] = useState(teacher.address);
  const handleSubmit = (event) => {
    const editT = {
      name: name,
      doj: dt,
      gender: gender,
      contact: contact,
      address: address,
    };
    fetch(`${API}/teachers/${teacher.id}`, {
      method: "PUT",
      body: JSON.stringify(editT),
      headers: { "Content-Type": "application/json" },
    }).then(() => history.push("/listT"));

    event.preventDefault();
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="fullname"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            id="full"
            label="Full Name"
          />
        </Grid>

        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disableFuture
              label="DOJ"
              openTo="year"
              views={["year", "month", "day"]}
              value={dt}
              onChange={(ndt) => {
                setDt(ndt);
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth label="DOJ" />
              )}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12}>
          {/* <FormControl fullWidth> */}
          <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            defaultValue={gender}
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
            label="Contact Number"
            defaultValue={contact}
            type="tel"
            id="contact"
            placeholder="xxxxxxxxxx"
            fullWidth
            name="contact"
            onChange={(e) => setContact(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            defaultValue={address}
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
export default EditTeacher;
