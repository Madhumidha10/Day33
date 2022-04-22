import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { API } from "./API";
import { useParams } from "react-router-dom";

function TeacherInfo() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState([]);
  function getTinfo() {
    fetch(`${API}/teachers/${id}`, { method: "GET" })
      .then((data) => data.json())
      .then((tea) => setTeacher(tea));
  }
  useEffect(() => {
    getTinfo();
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
        {" "}
        <Card sx={{ m: 2 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {teacher.name}
            </Typography>

            <List sx={{ m: 5 }}>
              <ListItem>
                <ListItemText primary="Doj" secondary={teacher.doj} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Gender" secondary={teacher.gender} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Contact Number"
                  secondary={teacher.contact}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Address" secondary={teacher.address} />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default TeacherInfo;
