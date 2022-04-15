import React, { Component } from 'react';

// MaterialUI compoments
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Table from './SimpleProductTable';
import AlertDialog from './AlertDialog'

class NewItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemName: "",
            itemPrice: "",
            paymentAddress: "",
            quantity: "",
            showAlert: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.createNewItem = this.createNewItem.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.name === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    createNewItem = async (event) => {
      alert(this.state.itemName + " " + this.state.itemPrice + " " + this.state.quantity);
        var randomNumber = Math.floor((Math.random() * (10000)) + 1);
        let result = await this.props.Auth.methods.manufacturerCreatesProduct('0x7aa8ebc8a7ddab5c9e0f0161b6538a57b8946d3e',this.state.itemName, this.state.quantity ,this.state.itemPrice ,  100).send({ from: '0x7aa8ebc8a7ddab5c9e0f0161b6538a57b8946d3e' , gasLimit: '210000'});
        alert("here");
        this.setState({
            showAlert: true,
            paymentAddress: result.events.ProductStateChanged.returnValues.productPaymentAddress
        });
    }

    toggleAlert() {
        this.setState(state => ({
            showAlert: !state.showAlert
        }));
     }

    render() {
        return (
          <div>
          <Container style={{ 'marginTop': '2%', 'width': '50%' }}>
          <Paper elevation={3} >
              <Grid container spacing={3}>
                  <Grid item xs={12}>
                      <h2>Add items to the inventory:</h2>
                  </Grid>
                  <Grid item xs={12}>
                  <TextField required label='Product name' variant='outlined' name="itemName" value={this.state.itemName} onChange={this.handleInputChange} />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField required label='Product price' variant='outlined' name="itemPrice" value={this.state.itemPrice} onChange={this.handleInputChange} />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField required label='Product quantity' variant='outlined' name="quantity" value={this.state.quantity} onChange={this.handleInputChange} />
                  </Grid>
                  <Grid item xs={12}>
                      <Button variant="outlined" color="primary" onClick={this.createNewItem}>
                          Create new product
                      </Button>
                  </Grid>                  
              </Grid>
          </Paper>
          <AlertDialog show={this.state.showAlert} price={this.state.itemPrice} paymentAddress={this.state.paymentAddress} closeAlertDialog={this.toggleAlert}/>
      </Container>
      <Table></Table>
      </div>
        );
    }
}


export default NewItem;
