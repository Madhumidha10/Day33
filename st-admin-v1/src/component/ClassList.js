import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router-dom";
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
function ClassList() {
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
  const deleteClass = (id) => {
    fetch(`${API}/classes/${id}`, { method: "DELETE" }).then(() => fetchData());
  };

  return (
    <TableContainer component={Paper} sx={{ m: 15 }}>
      <Typography variant="h6" component="div" sx={{ m: 5 }}>
        Classes
      </Typography>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="center">Class-Section</StyledTableCell>
            <StyledTableCell align="center">Class Teacher</StyledTableCell>

            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {classes.map((clas, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {clas.id}
              </StyledTableCell>
              <StyledTableCell align="center">{clas.label}</StyledTableCell>
              <StyledTableCell align="center">{clas.ct}</StyledTableCell>

              <StyledTableCell align="center">
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={(e) => {
                    deleteClass(clas.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ClassList;
