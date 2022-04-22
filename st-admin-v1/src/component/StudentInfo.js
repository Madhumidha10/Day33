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
function StudentInfo() {
  const [student, setStudent] = useState([]);
  const { id } = useParams();
  function getSinfo() {
    fetch(`${API}/students/${id}`, { method: "GET" })
      .then((data) => data.json())
      .then((stu) => setStudent(stu));
  }
  useEffect(() => {
    getSinfo();
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
              {student.name}
            </Typography>

            <List sx={{ m: 5 }}>
              <ListItem>
                <ListItemText
                  primary="Class-Section"
                  secondary={student.grade}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Admission Number"
                  secondary={student.adno}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Father's Name"
                  secondary={student.fname}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Mother's Name"
                  secondary={student.mname}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Contact No"
                  secondary={student.contact}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Address" secondary={student.address} />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default StudentInfo;
