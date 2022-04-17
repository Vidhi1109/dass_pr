import React from "react";
import loginImg from "./login_img.svg";
import { useNavigate } from "react-router-dom";
import "./style_signup.css"
import axios from "axios";
var Web3 = require("web3");
export default class Signup extends React.Component {
  constructor(props) {  
    super(props);
    this.state = {
        username: "",
        password: "",
        account_address: "",
        private_key: "",
        role: ""
    }
    this.signup = this.signup;
    this.signin = this.signin;
    this.change_username = this.change_username;
    this.change_password = this.change_password;
    this.change_email = this.change_email;
    this.change_role_dist = this.change_role_dist.bind(this);
    this.change_role_ret = this.change_role_ret.bind(this);
    this.signin_user = this.signin_user;
    this.signup_user = this.signup_user;
    this.signin_man = this.signin_man;
  }
  signup(event){
    const container = document.getElementById('container');
    container.classList.add("right-panel-active");
  }

  signin(event){
    const container = document.getElementById('container');
    container.classList.remove("right-panel-active");
  }
  change_password(event){
    var password = event.target.value;
    this.setState((state) =>{
        state.password = password
      });
  }
  change_email(event){
    var email = event.target.value;
    this.setState((state) =>{
        state.email = email
      });
  }
  change_username(event){
      var username = event.target.value;
      this.setState((state) =>{
        state.username = username
      });         
  }
  change_role_dist(event){
      this.setState((state) =>{
        state.role = "D"
      }); 
  }
  change_role_ret(event){  
    this.setState((state) =>{
      state.role = "R"
    }); 
}  
signin_man()
{
  alert("here");
  
  window.location.href = "/manufacturer";
}
  signin_user()
  {
    alert(this.state.email + "\n" + this.state.password);
    const newUser = {
        email: this.state.email,
        password: this.state.password
      };
      axios
        .post("http://localhost:4000/user/login", newUser)
        .then((response) => {
          localStorage.setItem('DASS_USERID', JSON.stringify(response));
          alert(JSON.stringify(response));
          if (response.data.role =="D")
          {
            window.location.href = "/distributor";

          } 
          else if (response.data.role == "U")
          {
            window.location.href = "/user";
          }
          else 
          {
            window.location.href = "/manufacturer";
          }
          console.log(response.data);
        })
        .catch(function (error){
            alert("Incorrect Password");
        });          
  }
  signup_user()
  {
    var web3 = new Web3('http://localhost:8545');
    var account = web3.eth.accounts.create();
    this.state.address = account.address;
    this.state.private_key = account.privateKey; 
    if (this.state.username == "" || this.state.email == "" || this.state.password=="" || (this.menu2.value != "D" && this.menu2.value != "U"))   
    {
        alert("Fields are empty!");
        return;
    }
    const newUser = {
        email: this.state.email,
        name: this.state.username,
        password: this.state.password,
        private_key: this.state.private_key,
        acc_address: this.state.address,
        role: this.menu2.value
      };
      axios
        .post("http://localhost:4000/user/register", newUser)
        .then((response) => { 
          alert("Created\t" + response.data.name);
          console.log(response.data);
        })
        .catch(function (error){
            alert("This Email already exists!");
        });   
  }
  render() {
    return (
        <div>
<div class="container" id="container">
	<div class="form-container sign-up-container">
		<form action="#" >
			<h1>Create Account</h1>
			<span>or use your email for registration</span>
            <input type="email" placeholder="Email" onChange={this.change_email.bind(this)} />
			<input type="text" placeholder="Username" onChange={this.change_username.bind(this)} />
			<input type="password" placeholder="Password" onChange={this.change_password.bind(this)} />
            <div class="form-group">
                <select  class="form-control" ref = {(input)=> this.menu2 = input}>
                    <input type="text" class="form-control" placeholder="Username" onChange={ this.change_username.bind(this)}/>
                    <option class="hidden" >Please select your Category (Ditributor/User)</option>
                    <option value="D">Distributor</option>
                    <option value="U">User</option>
                </select>
            </div>    
            <br></br>         
			<button onClick={()=> this.signup_user()}>Sign Up</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form action="#" >
			<h1>Sign in</h1>
			<span>or use your account</span>
			<input type="text" class="form-control" placeholder="Email" onChange={ this.change_email.bind(this)}/>
			<input type="password" class="form-control" placeholder="Password" onChange={this.change_password.bind(this)}/> 
            <br></br>             
			<button onClick={()=> this.signin_user()}>Sign In</button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button class="ghost" id="signIn" onClick={()=>this.signin()}>Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button class="ghost" id="signUp" onClick={()=>this.signup()}>Sign Up</button>
			</div>
		</div>
	</div>
</div>
</div>
    );
  }
}