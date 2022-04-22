import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { API } from "./API";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useHistory } from "react-router-dom";
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

function ListStudent() {
  const history = useHistory();
  const [studentList, setStudentList] = useState([]);
  function getStudents() {
    fetch(`${API}/students`, { method: "GET" })
      .then((data) => data.json())
      .then((stu) => setStudentList(stu));
  }
  useEffect(() => {
    getStudents();
  }, []);
  const deleteStudent = (id) => {
    fetch(`${API}/students/${id}`, { method: "DELETE" }).then(() =>
      getStudents()
    );
  };

  return (
    <TableContainer component={Paper} sx={{ m: 15 }}>
      <Typography variant="h6" component="div" sx={{ m: 5 }}>
        Students
      </Typography>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="center">Admission No</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Grade</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {student.id}
              </StyledTableCell>
              <StyledTableCell align="center">{student.adno}</StyledTableCell>
              <StyledTableCell align="center">{student.name}</StyledTableCell>
              <StyledTableCell align="center">{student.grade}</StyledTableCell>

              <StyledTableCell align="center">
                <IconButton
                  aria-label="profile-view"
                  color="info"
                  onClick={(e) => {
                    history.push(`/sInfo/${student.id}`);
                  }}
                >
                  <AccountCircleIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={(e) => {
                    deleteStudent(student.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  aria-label="edit"
                  color="warning"
                  onClick={(e) => {
                    history.push(`/editS/${student.id}`);
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

export default ListStudent;
