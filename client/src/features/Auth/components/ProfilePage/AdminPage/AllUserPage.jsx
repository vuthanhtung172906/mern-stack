import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserApi from "../../../../../api/userApi";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
AllUserPage.propTypes = {};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function AllUserPage(props) {
  const [allusers, setAllusers] = useState(null);
  const token = useSelector((state) => state.token.accesstoken);
  useEffect(() => {
    try {
      const getAllUsers = async (token) => {
        if (token) {
          const res = await UserApi.getAllUsers(token);
          setAllusers(res);
        }
      };
      getAllUsers(token);
    } catch (error) {
      throw error;
    }
  }, [token]);
  const classes = useStyles();
  if (allusers) {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allusers.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row._id}</TableCell>
                <TableCell align="left">{row.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return <div>Loading....</div>;
}

export default AllUserPage;
