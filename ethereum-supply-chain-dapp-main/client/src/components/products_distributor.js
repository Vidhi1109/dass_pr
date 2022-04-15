// ReactJS imports
import React, { useState , useEffect } from 'react';

// MaterialUI imports
import axios from "axios";
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
import { Button } from 'bootstrap';
import "./style_f.css"
const useStyles = makeStyles({
  table: {
    minWidth: 1000,
  },
  tableContainer: {
    maxWidth: 1200,
    marginTop: 20,  
    height: 600
  }
});

// function transferOwnership = async() =>
// {
//   alert(hash);
//   props.Auth.methods.test_track().call().then((result) => {
//     alert(result);
//   })
//   props.Auth.methods.transferOwnership('0x7Aa8EbC8A7DDaB5C9e0F0161b6538A57B8946d3E' , '0x39102bc9f108d72818ecce83bb5386d68d2cc359'  , 27883 , 1).call().then((result) => {
//     alert(JSON.stringify(result));
//     })
//   props.Auth.methods.transferOwnership('0x7Aa8EbC8A7DDaB5C9e0F0161b6538A57B8946d3E' , '0x39102bc9f108d72818ecce83bb5386d68d2cc359'  , 27883 , 1).send({from: '0x7Aa8EbC8A7DDaB5C9e0F0161b6538A57B8946d3E' , gasLimit: '210000'}).then((result) => {
//   alert("hieee" + JSON.stringify(result));
//   })
//  }

export default function SimpleProductTable(props) {
  const [count, setCount] = useState([]);
  const [address , setAddress] = useState("");
  const [quantity , setQuantity] = useState(0);
  for (let i=0 ; i<props.rows.length ; i++)
  {
    count.push(0)
  }
  const [count2, setCount2] = useState([]);
  const [users, setUsers] = useState([]);
  const [length, setlength] = useState(props.rows.length);
  const classes = useStyles();
  const shipProduct = async (event, productId) => {

  }
  function onChangeValue(event)
  {
    setAddress(event.target.value);
  }
  useEffect(() => {
    axios
      .get("http://localhost:4000/user")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function change_array(index , count)
  {
    var count2 = []
    for (let i=0 ; i<count.length ; i++)
    {
      count2[i]=0;
      if (i==index)
      {
        count2[index]=1;
      }
    }
    setCount(count2);
  }

  function quantity1(event)
  {
    setQuantity(event.target.value)
  }
  
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <h4 align="left">&nbsp;&nbsp;&nbsp;{props.title} products</h4>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" style={{ 'fontWeight': 'bold' }}>Name</TableCell>
            <TableCell align="right" style={{ 'fontWeight': 'bold' }}>Price</TableCell>
            <TableCell align="right" style={{ 'fontWeight': 'bold' }}>Quantity</TableCell>
            <TableCell align="right" style={{ 'fontWeight': 'bold' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row , index) => (
            <TableRow key={row.paymentAddress} >
              <TableCell component="th" scope="row">
                {row.desc}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">
                <IconButton color="primary" aria-label="add to shopping cart" size="small" onClick={() => change_array(index , count)}>
                  Send product &nbsp;<LocalShippingIcon />
                </IconButton>
                { count[index]==1 && (
    <div class="dropdown">
      <ul>
      <fieldset>
      <div class="some-class" onChange={onChangeValue} >
        {users.map((row) =>(
          <div>
          <input class="radio" type = "radio" name="addresses" value={row.acc_address} id={row.acc_address} />
          <label for = {row.acc_address}>{row.acc_address}</label>
          </div>
        ))}
        </div>
        </fieldset>
        <input type="text" placeholder="Quantity"  onChange={(e) => quantity1(e)}></input>
        <IconButton color="primary" aria-label="add to shopping cart" size="small" onClick={() => props.transferOwnership(quantity , address, row)}>
                  Send
                </IconButton>
      </ul>
    </div>
  )}
 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}