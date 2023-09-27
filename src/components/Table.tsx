"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import SearchBar from "./SearchBar";
import axios from "axios";
import TransitionsModal from "./Modal";

interface Users {
  employee_id: string;
  firstname: string;
  mobile_number: number;
  official_email: string;
  joining_date: any;
}

const BasicTable = () => {
  const [record, setRecord] = useState<Users[]>([]);

  const getApiData = async () => {
    const res = await axios.get("http://192.168.1.63:3333/all");
    console.log(res);
    setRecord(res.data as Users[]);
  };
  useEffect(() => {
    getApiData();
  }, []);

  return (
    <>
      <div>
        <h1>Employee List</h1>
      </div>
      <div>
        <SearchBar />
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id </TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Mobile Number</TableCell>
                <TableCell align="left">Official Email</TableCell>
                <TableCell align="left">Joining Date</TableCell>
                <TableCell align="left">Edit</TableCell>
                <TableCell align="left">Delete</TableCell>
                <TableCell align="left">View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {record.map((a, index) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={index}
                >
                  <TableCell component="th" scope="row">
                    {a.employee_id}
                  </TableCell>
                  <TableCell align="left">{a.firstname}</TableCell>
                  <TableCell align="left">{a.mobile_number}</TableCell>
                  <TableCell align="left">{a.official_email}</TableCell>
                  <TableCell align="left">{a.joining_date}</TableCell>
                  <TableCell>
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <TransitionsModal />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default BasicTable;
