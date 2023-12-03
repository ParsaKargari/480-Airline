import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Switch
} from "@material-ui/core";
import axios from "axios";

const UserList = () => {
  const [registeredList, setRegisteredList] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await axios.get(
      "http://localhost:8080/api/accounts/users"
    );
    setRegisteredList(data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/accounts/users/${id}`);
    fetchUsers();
  };

  const handleUpdate = async (id, updates) => {
    try {
      await axios.put(`http://localhost:8080/api/accounts/users/${id}/update`, updates);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const userTable = ({ registeredList }) => {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>CC Number</TableCell>
              <TableCell>Free Ticket</TableCell>
              <TableCell>Lounge Discount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registeredList.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.dob}</TableCell>
                <TableCell>{user.creditCard.number}</TableCell>
                <TableCell>
                  <Switch
                    checked={user.freeTicket}
                    onChange={() => handleUpdate(user.id, { freeTicket: !user.freeTicket })}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={user.loungeDiscount}
                    onChange={() => handleUpdate(user.id, { loungeDiscount: !user.loungeDiscount })}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(user.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <>
      <Button onClick={handlePrint} variant="contained" color="primary">
        Print Users
      </Button>
      {userTable({ registeredList })}
    </>
  );
};

export default UserList;
