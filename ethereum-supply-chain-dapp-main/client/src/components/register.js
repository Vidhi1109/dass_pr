import React from "react";
import axios from "axios";
import AuthContract from "../contracts/Auth.json"
import "./style.css"

var Web3 = require("web3");
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      address: "",
      privateKey:"",
      role:"",
      btn_selected: false,
      class_name1 : "btn",
      class_name2: "btn",
      class_name3: "btn",
  };
  this.CreateAccount = this.CreateAccount.bind(this);
  this.SelectCategory = this.SelectCategory.bind(this);
  this.updateUsername = this.updateUsername;
  this.updateEmail = this.updateEmail;
  this.updatePassword = this.updatePassword;
  this.print = this.print.bind(this);
  }

  CreateAccount = async (event) => {
    var web3 = new Web3('http://localhost:8545');
    var account = web3.eth.accounts.create();
    var Auth;
    var private_key;
    this.state.address = account.address;
    this.state.privateKey = account.privateKey;
    this.forceUpdate();
    const newUser = {
      name: this.state.username,
      password: this.state.password,
      private_key: this.state.privateKey,
      acc_address: this.state.address
    };
  
    axios
      .post("http://localhost:4000/user/register", newUser)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      });
      alert(this.state.privateKey)
      web3.eth.personal.unlockAccount(this.state.address, this.state.privateKey, 600).then(alert("Account unlocked!"));
      web3.eth.personal.unlockAccount("0xf6d4fb5828a481c34f242b98f8b67fb99c6f36b8", "2d1e72e5e4ec35b451cb45cc63db1d806bbf205c82bf3848f8abb5bfc268bbce", 600).then(alert("Account unlocked!"));
      web3.eth.personal.sendTransaction({
        from: "0xf6d4fb5828a481c34f242b98f8b67fb99c6f36b8",
        gasPrice: "20000000000",
        gas: "21000",
        to: this.state.address,
        value: "10",
        data: ""
    }, '2d1e72e5e4ec35b451cb45cc63db1d806bbf205c82bf3848f8abb5bfc268bbce').then(alert("holssss"));
    // const abi = await this.props.Auth.methods.testing(4).encodeABI()
    // const sign_trans = await web3.eth.accounts.signTransaction({
    //     from:'0x69B0c1a9eaaaa63b5A639ADF1B9f9Ec70369B911',
    //     to: '0x6b6F8b439F5e9aC08c3AAEA9d9b56ed73AA8aCce',
    //     data: abi,
    //     gas: 300000000000000,
    //     gasPrice: 30000000000000
    // }, '0x75b08b58e3d634f41f3d369d2d93268fc7fb16ec238a72cd50e1939548fdd1de');
    // alert(sign_trans);
    // //web3.eth.generate_gas_price()
    // await web3.eth.sendSignedTransaction(sign_trans.rawTransaction);
    // alert("pp");
    /*
  var address = '0xe63c282dae9fcbdca7561e30a3eea446d4e497bd'
  const tx = this.props.Auth.methods.testing(3);
  
  const gas = await tx.estimateGas({from: address});
  alert("hii");
  const gasPrice = await web3.eth.getGasPrice();
  alert("hii");
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(address);
  alert("hii");
  const txData = {
    from: address,
    to: '0x6b6F8b439F5e9aC08c3AAEA9d9b56ed73AA8aCce',
    data: data,
    gas,
    gasPrice,
    nonce
  };
  alert(this.props.Auth.address);
  const receipt = await web3.eth.sendTransaction(txData);
  alert("hiii");
    */
    /*
    let result = await this.props.productManager.methods.createProduct(this.state.itemName, this.state.itemPrice).send({ from: this.props.account});
    await this.props.Auth.methods.testing().call().then((result) => {
      alert(result);
    });  
    alert("hello");
    */
   /*
    await this.props.Auth.methods.testing(5).send({from:'0xC0730242e7a12a6206338d10F10476Fd48F8E268'}).then((result) => {
      alert(result);
    })
    */
      /*
    await this.props.Auth.methods.user_num().call().then((result) => {
      alert(result);
    });
    await this.props.Auth.methods.testing().sendTransaction({from: '0x557d4bfb21dc8d9dd7bb746e0ba06ab0ea51f6f2'},'20d5665993d8ed861f28682534bed9fd216e17fe1fdb7d9b1f038585fad4b5d4');
    */
  }

  SelectCategory (a)
{
      this.setState((state) =>{
        if(a==1)
        {
          state.class_name1 = "btn2";
          state.class_name2 = "btn";
          state.class_name3 = "btn";
          state.role = "Manufacturer";
        }
        if(a==2)
        {
          state.class_name1 = "btn";
          state.class_name2 = "btn2";
          state.class_name3 = "btn";
          state.role = "Distributor";
        }
        if(a==3)
        {
          state.class_name1 = "btn";
          state.class_name2 = "btn";
          state.class_name3 = "btn2";
          state.role = "Retailer";
        }        
        state.btn_selected = true;  
        this.forceUpdate()
      });        
}
  updateUsername(event)
  {
    var username = event.target.value
    this.setState((state) =>{
      state.username = username
    });
  }
  updateEmail(event)
  {
    var email = event.target.value
    this.setState((state) =>{
      state.email = email
    });
  }  
  updatePassword(event)
  {
    var password = event.target.value
    this.setState((state) =>{
      state.password = password
    });
  }
  print()
  {

  }
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" onChange={this.updateUsername.bind(this)}/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" onChange={this.updateEmail.bind(this)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="text" name="password" placeholder="password" onChange={this.updatePassword.bind(this)}/>
            </div>
          </div>
        </div>
        <div className="rowC" >
              <button id='class' type="button" className={this.state.class_name1} onClick={()=>this.SelectCategory(1)}>
              Manufacturer
              </button>
              <button id='class' type="button" className={this.state.class_name2} onClick={()=>this.SelectCategory(2)}>
              Distributor
              </button>
              <button id='class' type="button" className={this.state.class_name3} onClick={()=>this.SelectCategory(3)}>
              Retailer
              </button>                                      
            </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.CreateAccount}>
            Register
          </button>
        </div>
      </div>
    );
  }
}