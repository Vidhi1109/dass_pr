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
import SimpleProductTable from "./products_distributor";
import AlertDialog from './AlertDialog';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showMessage: true , showMessage2: false , desc: "", quant: "", cost: "" , distributors_array: [[]] , products_array:[] , transactions_array:[] ,open: false}
    this._showMessage = this._showMessage.bind(this);
    this.change_desc = this.change_desc;
    this.change_cost = this.change_cost;
    this.change_quant = this.change_quant;
    this.createproduct = this.createproduct;   
    this.getAllProductsFromContract = this.getAllProductsFromContract; 
    this.getAllTransactions = this.getAllTransactions;
    this.transferOwnership = this.transferOwnership;
  }
  _showMessage = (bool) => {
    this.setState({
      showMessage: bool,
    });
  } 
  change_quant(event)
  {
      const quant = event.target.value;
      this.setState((state) =>{
        state.quant = quant
      });
  }  
  change_cost(event)
  {
      const cost = event.target.value;
      this.setState((state) =>{
        state.cost = cost
      });
  }
  change_desc(event)
  {
      const desc = event.target.value;
      this.setState((state) =>{
        state.desc = desc
      });
  }
   transferOwnership = async(quantity , address , product ) =>
{
  let profile = localStorage.getItem('DASS_USERID');
  let userobj = JSON.parse(profile);
  let acc_address = userobj.data.acc_address; 
  // alert(typeofhash  + " " + JSON.stringify(product));
  var response;
  // alert(hash);
  this.props.Auth.methods.test_track().call().then((result) => {
    alert(result);
  })
  await this.props.Auth.methods.transferOwnership(acc_address , address  , product.hash , quantity).call().then((result) => {
    response = result;
    })
    if (response != 696969 && response != 696970)
    {
      let result = await this.props.Auth.methods.manufacturerCreatesProduct2(acc_address ,address , response, '0x7Aa8EbC8A7DDaB5C9e0F0161b6538A57B8946d3E', address, product.desc , quantity , product.price , product.hash , product.no_of_transfers+1).send({ from: acc_address , gasLimit: "2100000"});
    }
  // await this.props.Auth.methods.transferOwnership('0x7Aa8EbC8A7DDaB5C9e0F0161b6538A57B8946d3E' , '0x39102bc9f108d72818ecce83bb5386d68d2cc359'  , 17597 , 1).send({from: '0x7Aa8EbC8A7DDaB5C9e0F0161b6538A57B8946d3E' , gasLimit: '210000'}).then((result) => {
  // alert("hieee" + JSON.stringify(result));
  // })
}
  createproduct = async() =>
  {
      
    //   alert(this.state.desc);
    // await this.props.Auth.methods.product_num().call().then((result) => {
    //     alert(result);
    //   });
    // await this.props.Auth.methods.all_products(0).call().then((result)=>{
    //     alert(result);
    // })  
    //let result = await this.props.Auth.methods.manufacturerCreatesProduct('0x7aa8ebc8a7ddab5c9e0f0161b6538a57b8946d3e', this.state.desc , this.state.quant , this.state.cost).send({ from: '0x7aa8ebc8a7ddab5c9e0f0161b6538a57b8946d3e'});
    var randomNumber = Math.floor((Math.random() * (100000)) + 1);
    let result = await this.props.Auth.methods.manufacturerCreatesProduct('0x7Aa8EbC8A7DDaB5C9e0F0161b6538A57B8946d3E' , this.state.desc, this.state.quant , this.state.cost , randomNumber).send({ from: '0x7Aa8EbC8A7DDaB5C9e0F0161b6538A57B8946d3E' , gasLimit: "2100000"});
    alert("Product Created");
    this.forceUpdate();
    // result = await this.props.Auth.methods.ownerToDistributor('0x7Aa8EbC8A7DDaB5C9e0F0161b6538A57B8946d3E' , '0x1fe8f0b72d34380ae964821fa55a12d2293b916b' , [0] , this.state.cost).send({ from: '0x7Aa8EbC8A7DDaB5C9e0F0161b6538A57B8946d3E' , gasLimit: "2100000"});
    // alert("jbk");    
    // await this.props.Auth.methods.giveDistributor('0','0').call().then((result)=>{
    //    alert(result); 
    // })
    /*
    this.setState({
        showAlert: true,
        paymentAddress: result.events.ProductStateChanged.returnValues.productPaymentAddress
      });   */ 
      /* 
      await this.props.Auth.methods.product_num().call().then((result) => {
        alert(result);
      });  
       var a = 0
      var b = 0
      await this.props.Auth.methods.giveDistributor(a,b).call().then((result) => {
        alert(result);
      }); */          
  }
  componentDidMount = async () => {
       await this.getAllProductsFromContract();

      // await this.getAllTransactions();   
      // // Setting update interval every 5 seconds
      this.interval = setInterval(() => this.getAllProductsFromContract(), 5000);

  };
  getAllProductsFromContract = async() =>{

    // var product_num;
    // var products = [];
    // var distributors = [];
    //  await this.props.Auth.methods.product_num().call().then((result) => {
    //   product_num = result;
    //   });  
    // for (let i=0 ; i<product_num ; i++)
    // {
        
    //     let productdata = {}
    // await this.props.Auth.methods.all_products(i).call().then((result)=>{
    //     var status;
    //     if (result._owner== result._manufacturer)
    //     {
    //         status = "NOT SOLD"
    //     }
    //     else
    //     {
    //         status = "SOLD"   

    //     }
    //     productdata = {
    //         manufacturer: result._manufacturer,
    //         distributor: result.distributors,
    //         retailer: result._retailer,
    //         owner: result._owner,
    //         desc:  result._desc,
    //         pr: result.pr,
    //         price: result.price,
    //         distributors: result.no_of_distributor,   
    //         status: status       
    //     }

    //     products.push(productdata);
        
    // }) 

    // var distributorr=[]
    // let distributor = ""
    // for(let j=0 ; j<products[i].distributors ; j++)
    // {
 
    //     await this.props.Auth.methods.giveDistributor(i,j).call().then((result) => {
 
    //         distributor += result;

    //       });     
    // }
    // distributors.push(distributorr);
    // } 
    
    // this.setState({products_array : products})
    // this.setState({distributors_array : distributors})  
    let profile = localStorage.getItem('DASS_USERID');
    let userobj = JSON.parse(profile);
    let acc_address = userobj.data.acc_address;  
    var total_products=0;
    var products = [];
    await this.props.Auth.methods.chain_products_track(acc_address).call().then((result) =>{
      total_products = result;
    })
    for (let i=0 ; i<total_products ; i++)
    {
      let productdata = {};
      let owners = "";
      var result_final;
      await this.props.Auth.methods.all_products_track( acc_address , i).call().then((result) => {
        result_final = result;
      })
      for (let j=0 ; j<result_final.no_of_transfers ;j++)
      {
        await this.props.Auth.methods.give_owners(acc_address , result_final.hash, i).call().then((result) => {
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
        price:  result_final.price,
        no_of_transfers: result_final.no_of_transfers,
        display: false
      }
      products.push(productdata);
    }
      this.setState({products_array: products});
  }
  render() {
    return (
      
<div>

      <Container style={{ 'marginTop': '2%', 'width': '80%' }}>
      <Paper elevation={3} >
      <SimpleProductTable rows={this.state.products_array} title={'My'} Auth={this.props.Auth} transferOwnership={this.transferOwnership}
></SimpleProductTable>
</Paper>
</Container>

      </div>

    );
  }
}

