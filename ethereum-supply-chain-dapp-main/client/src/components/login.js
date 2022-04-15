import React from "react";
import loginImg from "./login_img.svg";
import axios from "axios";
import "./style.css"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import IconButton from '@material-ui/core/IconButton';
export default class Login extends React.Component {
  constructor(props) {
    classes : makeStyles({
      table: {
        
      },
      tableContainer: {
        
      }
    })
    super(props);

  }

  render() {
    return (
      <TableContainer component={Paper} >
      <h4 align="left">&nbsp;&nbsp;&nbsp;My products</h4>
      <Table  size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" style={{ 'fontWeight': 'bold' }}>Name</TableCell>
            <TableCell align="right" style={{ 'fontWeight': 'bold' }}>Price</TableCell>
            <TableCell align="right" style={{ 'fontWeight': 'bold' }}>Quantity</TableCell>
            <TableCell align="right" style={{ 'fontWeight': 'bold' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.rows.map((row) => (
            <TableRow key={row.paymentAddress} onClick={()=>{alert("aa gayaa")}} >
              <TableCell component="th" scope="row">
                {row.desc}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">
                <IconButton color="primary" aria-label="add to shopping cart" size="small" >
                  Send product &nbsp;<LocalShippingIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
  }
}