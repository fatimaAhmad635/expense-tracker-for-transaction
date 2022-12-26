import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import Edit from "@mui/icons-material/EditSharp";
import Delete from "@mui/icons-material/DeleteSharp";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";
export default function TransactionsList({ transactions,fetchTransactions,setEditTransaction }) {
  const remove=async(_id)=>{
    if(!window.confirm("Are ou Sure")) return;
    const res=await fetch(`http://localhost:4000/transaction/${_id}`,{
      method:"DELETE"
    });
    if(res.ok){
      fetchTransactions(); // Refresh everytime when transaction is deleted
      window.alert("Deleted Successfully")
    }
  }
  const formatDate=(date)=>{
    return dayjs(date).format("DD/MMM/YYYY")
  }
  
  return (
    <Container>
      <Typography sx={{ marginTop: 10 }} variant="h6">
        List of Transactions
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">DESCRIPTION</TableCell>
              <TableCell align="center">DATE</TableCell>
              <TableCell align="center">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="center" component="th" scope="row">
                  {row.amount}
                </TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{formatDate(row.date)}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" component="label" onClick={()=>setEditTransaction(row)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="warning" component="label" onClick={()=>{remove(row._id)}}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
