import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { API } from "./API";
import Typography from "@mui/material/Typography";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#A7A7A7",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ListTeacher() {
  const history = useHistory();

  const [teacherList, setTeacherList] = useState([]);
  function getTeachers() {
    fetch(`${API}/teachers`, { method: "GET" })
      .then((data) => data.json())
      .then((tea) => setTeacherList(tea));
  }
  useEffect(() => {
    getTeachers();
  }, []);
  const deleteTeacher = (id) => {
    fetch(`${API}/teachers/${id}`, { method: "DELETE" }).then(() =>
      getTeachers()
    );
  };
  return (
    <TableContainer component={Paper} sx={{ m: 15 }}>
      <Typography variant="h6" component="div" sx={{ m: 5 }}>
        Teachers
      </Typography>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Gender</StyledTableCell>
            <StyledTableCell align="center">Contact</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teacherList.map((teacher, index) => (
            <StyledTableRow key={teacher.id}>
              <StyledTableCell component="th" scope="row">
                {teacher.id}
              </StyledTableCell>
              <StyledTableCell align="center">{teacher.name}</StyledTableCell>
              <StyledTableCell align="center">{teacher.gender}</StyledTableCell>
              <StyledTableCell align="center">
                {teacher.contact}
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton
                  aria-label="profile-view"
                  color="info"
                  onClick={(e) => {
                    history.push(`/tInfo/${teacher.id}`);
                  }}
                >
                  <AccountCircleIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={(e) => {
                    deleteTeacher(teacher.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  aria-label="edit"
                  color="warning"
                  onClick={(e) => {
                    history.push(`/editT/${teacher.id}`);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListTeacher;
