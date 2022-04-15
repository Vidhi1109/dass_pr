import React from "react";
import loginImg from "./login_img.svg";
import "./style2.css"
import ScriptTag from 'react-script-tag';
import 'bootstrap/dist/css/bootstrap.min.css';



export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showMessage: true , showMessage2: false , desc: "", quant: "", cost: "" }
    this._showMessage = this._showMessage.bind(this);
    this.change_desc = this.change_desc;
    this.change_cost = this.change_cost;
    this.change_quant = this.change_quant;
    this.createproduct = this.createproduct;    
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
    // let result = await this.props.Auth.methods.manufacturerCreatesProduct('0x7Aa8EbC8A7DDaB5C9e0F0161b6538A57B8946d3E' , this.state.desc, this.state.quant , this.state.cost).send({ from: '0x7Aa8EbC8A7DDaB5C9e0F0161b6538A57B8946d3E' , gasLimit: "2100000"});
    // alert("jbk");
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
      await this.props.Auth.methods.product_num().call().then((result) => {
        alert(result);
      });  
       var a = 0
      var b = 0
      await this.props.Auth.methods.giveDistributor(a,b).call().then((result) => {
        alert(result);
      });           
  }
  render() {
    return (

          <div class="register">
                <div class="row">
                    <div class="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                        <h3>Welcome</h3>
                        <p>You are 30 seconds away from earning your own money!</p>
                        <input type="submit" name="" value="Login"/><br/>
                    </div>
                    <div class="col-md-9 register-right">
                        <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true" onClick={this._showMessage.bind(null, true)}>Employee</a>                                
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false" onClick={this._showMessage.bind(null, false)}>Hirer</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            {(this.state.showMessage == true) && (<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="register-heading">CREATE A PRODUCT</h3>
                                <div class="row register-form">
                                    
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Description"  onChange={this.change_desc.bind(this)} />
                                        </div>
                                        <br></br>
                                        <br></br>
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Quantity" onChange={this.change_quant.bind(this)} />
                                        </div>
                                        <br></br>
                                        <br></br>
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Cost"  onChange={this.change_cost.bind(this)} />
                                        </div>
                                        <br></br>
                                        <br></br>
                                        <input type="submit" class="btnRegister"  value="CREATE" onClick={()=>this.createproduct()}/>
                                 
                                </div>
                            </div>)}
                            {(this.state.showMessage == false) && (<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="register-heading">Apply as a Hirer</h3>
                                <div class="row register-form">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="First Name *" value="" />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Last Name *" value="" />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control" placeholder="Password *" value="" />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control"  placeholder="Confirm Password *" value="" />
                                        </div>
                                        <div class="form-group">
                                            <div class="maxl">
                                                <label class="radio inline"> 
                                                    <input type="radio" name="gender" value="male" checked />
                                                    <span> Male </span> 
                                                </label>
                                                <label class="radio inline"> 
                                                    <input type="radio" name="gender" value="female" />
                                                    <span>Female </span> 
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="email" class="form-control" placeholder="Your Email *" value="" />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" minlength="10" maxlength="10" name="txtEmpPhone" class="form-control" placeholder="Your Phone *" value="" />
                                        </div>
                                        <div class="form-group">
                                            <select class="form-control">
                                                <option class="hidden"  selected disabled>Please select your Sequrity Question</option>
                                                <option>What is your Birthdate?</option>
                                                <option>What is Your old Phone Number</option>
                                                <option>What is your Pet Name?</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Enter Your Answer *" value="" />
                                        </div>
                                        <input type="submit" class="btnRegister"  value="Register"/>
                                    </div>
                                </div>
                            </div>)}

                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-3 ">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                        <h3>Welcome</h3>
                        <p>You are 30 seconds away from earning your own money!</p>
                        <input type="submit" name="" value="Login"/><br/>
                    </div>
                    <div class="col-md-9 ">
                        <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true" onClick={this._showMessage.bind(null, true)}>Employee</a>                                
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false" onClick={this._showMessage.bind(null, false)}>Hirer</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            {(this.state.showMessage == true) && (<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="register-heading">CREATE A PRODUCT</h3>
                                <div class="row register-form">
                                    
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Description"  onChange={this.change_desc.bind(this)} />
                                        </div>
                                        <br></br>
                                        <br></br>
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Quantity" onChange={this.change_quant.bind(this)} />
                                        </div>
                                        <br></br>
                                        <br></br>
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Cost"  onChange={this.change_cost.bind(this)} />
                                        </div>
                                        <br></br>
                                        <br></br>
                                        <input type="submit" class="btnRegister"  value="CREATE" onClick={()=>this.createproduct()}/>
                                 
                                </div>
                            </div>)}
                            {(this.state.showMessage == false) && (<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="register-heading">Apply as a Hirer</h3>
                                <div class="row register-form">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="First Name *" value="" />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Last Name *" value="" />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control" placeholder="Password *" value="" />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control"  placeholder="Confirm Password *" value="" />
                                        </div>
                                        <div class="form-group">
                                            <div class="maxl">
                                                <label class="radio inline"> 
                                                    <input type="radio" name="gender" value="male" checked />
                                                    <span> Male </span> 
                                                </label>
                                                <label class="radio inline"> 
                                                    <input type="radio" name="gender" value="female" />
                                                    <span>Female </span> 
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="email" class="form-control" placeholder="Your Email *" value="" />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" minlength="10" maxlength="10" name="txtEmpPhone" class="form-control" placeholder="Your Phone *" value="" />
                                        </div>
                                        <div class="form-group">
                                            <select class="form-control">
                                                <option class="hidden"  selected disabled>Please select your Sequrity Question</option>
                                                <option>What is your Birthdate?</option>
                                                <option>What is Your old Phone Number</option>
                                                <option>What is your Pet Name?</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Enter Your Answer *" value="" />
                                        </div>
                                        <input type="submit" class="btnRegister"  value="Register"/>
                                    </div>
                                </div>
                            </div>)}

                        </div>
                    </div>
                </div>


            </div>

    );
  }
}