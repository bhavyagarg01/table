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
import axios from "axios";
import TransitionsModal from "./Modal";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

interface Users {
  _id: any;
  employee_id: string;
  firstname: string;
  mobile_number: number;
  official_email: string;
  joining_date: any;
}

const BasicTable = () => {
  const [record, setRecord] = useState<Users[]>([]);
  const [search, setSearch] = useState("");
  const [filterRecord, setFilterRecord] = useState<Users[]>([]);

  const getApiData = async () => {
    const res = await axios.get("http://192.168.1.63:3333/all");
    console.log(res);
    setRecord(res.data as Users[]);
    setFilterRecord(res.data as Users[]);
  };

  useEffect(() => {
    getApiData();
  }, []);

  useEffect(() => {
    const result = record.filter((user) => {
      return user.firstname.toLowerCase().match(search.toLowerCase());
    });
    setFilterRecord(result);
  }, [search]);

  return (
    <>
      <div>
        <h1>Employee List</h1>
      </div>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Search>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Button variant="contained">Add User</Button>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}></Box>
            </Toolbar>
          </AppBar>
        </Box>
      </div>

      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell> Id </TableCell>
                <TableCell align="left">Employee Id</TableCell>
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
              {filterRecord.map((a, index) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={index}
                >
                  <TableCell component="th" scope="row">
                    {a._id}
                  </TableCell>
                  <TableCell align="left">{a.employee_id}</TableCell>
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
