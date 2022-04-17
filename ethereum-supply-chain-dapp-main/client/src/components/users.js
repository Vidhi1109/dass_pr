import React from "react";
import loginImg from "./login_img.svg";
import "./style2.css"
import ScriptTag from 'react-script-tag';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@material-ui/core/TextField';
import SimpleTable from './SimpleProductTable';
import SimpleProductTable from "./products_user";
import SimpleProductTable2 from "./myproducts_user";
import AlertDialog from './AlertDialog';
import axios from "axios";
var Web3 = require("web3");
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showMessage: true, showMessage2: false, desc: "", quant: "", cost: "", distributors_array: [[]], products_array: [], transactions_array: [], open: false, details: [] , my_products: []}
    this._showMessage = this._showMessage.bind(this);
    this.change_desc = this.change_desc;
    this.change_cost = this.change_cost;
    this.change_quant = this.change_quant;
    this.createproduct = this.createproduct;
    this.getAll = this.getAll;
    this.getAllProductsFromContract = this.getAllProductsFromContract;
    this.getAllTransactions = this.getAllTransactions;
    this.transferOwnership = this.transferOwnership;
    this.show_transactions = this.show_transactions;
  }
  _showMessage = (bool) => {
    this.setState({
      showMessage: bool,
    });
  }
  change_quant(event) {
    const quant = event.target.value;
    this.setState((state) => {
      state.quant = quant
    });
  }
  change_cost(event) {
    const cost = event.target.value;
    this.setState((state) => {
      state.cost = cost
    });
  }
  change_desc(event) {
    const desc = event.target.value;
    this.setState((state) => {
      state.desc = desc
    });
  }
  show_transactions(product , transactions ){
    var string = product.owners_list;
    var owners_list_array = string.split('\n');
    for (let count = 0 ; count<owners_list_array.length ;  count++)
    {
      owners_list_array[count] = owners_list_array[count].split('#');
      owners_list_array[count][1] = owners_list_array[count][1].split('|'); 
      for (let count2 = 0 ; count2 < owners_list_array[count][1].length ; count2++)
      {
        let response5 = localStorage.getItem('MAP');
        response5 = JSON.parse(response5);
        let transactionHash = response5[owners_list_array[count][1][count2]];
        owners_list_array[count][1][count2] = owners_list_array[count][1][count2].split('$');
        
        if (count2 != 0)
        {
          
        let transaction = {
          from: owners_list_array[count][1][count2-1][0],
          to : owners_list_array[count][1][count2][0],
          transactionHash: transactionHash,
          timestamp: owners_list_array[count][1][count2][1]
        }
        transactions.push(transaction);
      }
      }
    }
    
    
  }
  transferOwnership = async (quantity, product) => {
    let profile = localStorage.getItem('DASS_USERID');
    let userobj = JSON.parse(profile);
    let acc_address = userobj.data.acc_address;
    var amount_total = parseInt(quantity)*parseInt(product.price);
    amount_total = amount_total.toString();
    var web3 = new Web3('http://localhost:8545');
    alert(acc_address);
   await web3.eth.sendTransaction({from: acc_address , to: product.acc_address , value: web3.utils.toWei(amount_total, 'ether')});    
    var response;
    acc_address = product.current_owner;
    alert(product.current_owner);
    let address = userobj.data.acc_address;
    await this.props.Auth.methods.transferOwnership(acc_address, address, product.hash, quantity).call().then((result) => {
      response = result;
    })
    if (response != 696969) {
      var response2 = 0;
      await this.props.Auth.methods.check_existence(address, product.hash).call().then((result) => {
        response2 = result;
      })
      if (response2 == 696969) {
        var timestamp;
        var string = product.owners_list;
        var owners_list_array = string.split('\n');
        let at_array = [];
        for (let count = 0 ; count<owners_list_array.length ; count++)
        {
          owners_list_array[count] = owners_list_array[count].split('#');
          owners_list_array[count][1] = owners_list_array[count][1].split('|');
        }
        var quant = 0;
        let list=""
        for (let count =0 ; count < owners_list_array.length ; count++)
        {
          if (quant + parseInt(owners_list_array[count]) < quantity)
          {
            quant = quant+parseInt(owners_list_array[count][0]);
            list += owners_list_array[count][0] + "#";
            for (let count2 = 0 ; count2 < owners_list_array[count][1].length ; count2++ )
            {
              list += owners_list_array[count][1][count2] + "|";
            }
            timestamp = Date.now();
            list +=  address + "$" + timestamp;
            at_array.push(address + "$" + timestamp);
            owners_list_array[count][0] = 0;
          }
          else // quant + parseInt(owners_list_array[count]) > quantity 
          { 
            owners_list_array[count][0] = parseInt(owners_list_array[count][0]) - (quantity - quant);
            list += (quantity - quant) + "#"  ;  
            for (let count2 = 0 ; count2 < owners_list_array[count][1].length ; count2++ )
            {
              list += owners_list_array[count][1][count2] + "|";
            }       
            timestamp = Date.now();
            list +=  address + "$" + timestamp;
            at_array.push(address + "$" + timestamp);          
            quant = quantity
            break;          
          }
          if(count != owners_list_array.length-1)
          {
            list += "\n";
          }
        }
        alert(list);

        let prev_list = "";
        for (let count = 0 ; count < owners_list_array.length ; count++)
        {
          prev_list += owners_list_array[count][0] + "#" ;
          for (let count2 = 0 ; count2 < owners_list_array[count][1].length ; count2++ )
          {
            if(count2 == owners_list_array[count][1].length-1)
            {
              prev_list += owners_list_array[count][1][count2] ;
              break;
            }
            prev_list += owners_list_array[count][1][count2] + "|";
          }
          if (count != owners_list_array.length - 1)
          {
            prev_list += "\n";
          }
          
        }        
        let owners_list = "";
        owners_list = list;
        let result = await this.props.Auth.methods.manufacturerCreatesProduct2(acc_address, address, response, '0x7Aa8EbC8A7DDaB5C9e0F0161b6538A57B8946d3E', address, product.desc, quantity, product.price, product.hash, product.no_of_transfers + 1, owners_list, prev_list).send({ from: address, gasLimit: "2100000" });
        //alert("babu ko mirchi lagiii");
        let response5 = localStorage.getItem('MAP');
        response5 = JSON.parse(response5);
        for (let p = 0 ; p<at_array.length ; p++)
        {
          response5[at_array[p]] = result.transactionHash;
        }
        localStorage.setItem('MAP', JSON.stringify(response5)); 
      }
      else {
        var response3 = 0;
        await this.props.Auth.methods.check_existence('0x7Aa8EbC8A7DDaB5C9e0F0161b6538A57B8946d3E', product.hash).call().then((result) => {
          response3 = result;
        }) 
        var timestamp;
        let at_array = []
        var string = product.owners_list;
        var owners_list_array = string.split('\n');
        for (let count = 0 ; count<owners_list_array.length ; count++)
        {
          owners_list_array[count] = owners_list_array[count].split('#');
          owners_list_array[count][1] = owners_list_array[count][1].split('|');
        }
        var quant = 0;
        let list=""
        for (let count =0 ; count < owners_list_array.length ; count++)
        {
          if (quant + parseInt(owners_list_array[count]) < quantity)
          {
            quant = quant+parseInt(owners_list_array[count][0]);
            list += owners_list_array[count][0] + "#";
            for (let count2 = 0 ; count2 < owners_list_array[count][1].length ; count2++ )
            {
              list += owners_list_array[count][1][count2] + "|";
            }
            timestamp = Date.now();
            list +=  address + "$" + timestamp ;
            at_array.push(address + "$" + timestamp);
            owners_list_array[count][0] = 0;
          }
          else // quant + parseInt(owners_list_array[count]) > quantity 
          { 
            owners_list_array[count][0] = parseInt(owners_list_array[count][0]) - (quantity - quant);
            list += (quantity - quant) + "#"  ;  
            for (let count2 = 0 ; count2 < owners_list_array[count][1].length ; count2++ )
            {
              list += owners_list_array[count][1][count2] + "|";
            }       
            timestamp = Date.now();
            list +=  address + "$" + timestamp ;
            at_array.push(address + "$" + timestamp);         
            quant = quantity
            break;          
          }
          if(count != owners_list_array.length-1)
          {
            list += "\n";
          }          
        }
        let prev_list = "";
        for (let count = 0 ; count < owners_list_array.length ; count++)
        {
          prev_list += owners_list_array[count][0] + "#" ;
          for (let count2 = 0 ; count2 < owners_list_array[count][1].length ; count2++ )
          {
            if(count2 == owners_list_array[count][1].length-1)
            {
              prev_list += owners_list_array[count][1][count2] ;
              break;
            }
            prev_list += owners_list_array[count][1][count2] + "|";
          }
          if (count != owners_list_array.length - 1)
          {
            prev_list += "\n";
          }
          
        }  
        let owners_list = "";
        await this.props.Auth.methods.return_owners(address, product.hash).call().then((result) => {
          owners_list = result;
        })
        owners_list += "\n" + list;
        alert("Owners list : " + owners_list);
        alert("Prev's list : " + prev_list);
        await this.props.Auth.methods.transfer_when_available(acc_address, address, response3, response2, quantity, owners_list, prev_list).send({ from: address, gasLimit: "210000" }).then((result) => {
          let response5 = localStorage.getItem('MAP');
          response5 = JSON.parse(response5);
          for (let p = 0 ; p<at_array.length ; p++)
          {
            response5[at_array[p]] = result.transactionHash;
          }
          localStorage.setItem('MAP', JSON.stringify(response5)); 
        })
      }
    }
    else {
      alert("Product Limit Exceeded");
    }
  }
  createproduct = async () => {
    var randomNumber = Math.floor((Math.random() * (100000)) + 1);
    var address = "";
    address = this.state.quant + "#0x7Aa8EbC8A7DDaB5C9e0F0161b6538A57B8946d3E";
    let result = await this.props.Auth.methods.manufacturerCreatesProduct('0x7Aa8EbC8A7DDaB5C9e0F0161b6538A57B8946d3E', this.state.desc, address, this.state.quant, this.state.cost, randomNumber).send({ from: '0x7Aa8EbC8A7DDaB5C9e0F0161b6538A57B8946d3E', gasLimit: "2100000" });
    alert("Product Created");
    this.forceUpdate();
  }
  componentDidMount = async () => {
    await this.getAllProductsFromContract();
    this.interval = setInterval(() => this.getAllProductsFromContract(), 1000);
  };
  getAll = async(acc_address, products) => {

  }
  getAllProductsFromContract = async () => {
    axios
      .get("http://localhost:4000/user")
      .then((response) => {
        this.setState({ details: response.data });
        // alert(JSON.stringify(this.state.details[0].acc_address));
      })
      .catch((error) => {
        console.log(error);
      });
      var products = [];
      var products_me = [];
      let profile = localStorage.getItem('DASS_USERID');
      let userobj = JSON.parse(profile);
      let my_address = userobj.data.acc_address;
      var acc_address;
    for (let count = 0; count < this.state.details.length; count++) {
      acc_address = this.state.details[count].acc_address;
      var total_products = 0;
      await this.props.Auth.methods.chain_products_track(acc_address).call().then((result) => {
        total_products = result;
      })
      for (let i = 0; i < total_products; i++) {
        let productdata = {};
        let owners = "";
        var result_final;
        await this.props.Auth.methods.all_products_track(acc_address, i).call().then((result) => {
          result_final = result;
        })
        for (let j = 0; j < result_final.no_of_transfers; j++) {
          await this.props.Auth.methods.give_owners(acc_address, result_final.hash, i).call().then((result) => {
            owners += result;
            owners += "\n";
          })
        }
        productdata = {
          hash: result_final.hash,
          manufacturer: result_final._manufacturer,
          owners: owners,
          current_owner: result_final.current_owner,
          desc: result_final._desc,
          quantity: result_final.quantity,
          price: result_final.price,
          no_of_transfers: result_final.no_of_transfers,
          display: false,
          owners_list: result_final.owners_list
        }
        if(acc_address != my_address)
        {
        products.push(productdata);
        }
        else
        {
          products_me.push(productdata);
        }
      }
    }
    this.setState({products_array: products});

    this.setState({my_products: products_me});
  }
  render() {
    return (
      <div>
        <Container style={{ 'marginTop': '2%', 'width': '80%' }}>
          <Paper elevation={3} >
            <SimpleProductTable rows={this.state.products_array} title={'All'} Auth={this.props.Auth} transferOwnership={this.transferOwnership} tag={'Buy'}
            ></SimpleProductTable>
          </Paper>
        </Container>
        <Container style={{ 'marginTop': '2%', 'width': '80%' }}>
          <Paper elevation={3} >
            <SimpleProductTable2 rows={this.state.my_products} title={'My'} Auth={this.props.Auth} transferOwnership={this.transferOwnership} tag={'Transactions'} show_transactions={this.show_transactions}
            ></SimpleProductTable2>
          </Paper>
        </Container>
      </div>

    );
  }
}