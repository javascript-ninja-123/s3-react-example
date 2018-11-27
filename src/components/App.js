import React,{Component,Fragment} from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {CognitoUserPool, CognitoUserAttribute,CognitoUser} from 'amazon-cognito-identity-js'

const poolData = {
        UserPoolId : 'us-west-2_FgQFYJaUL',
        ClientId : "6v24lfb0hutfos6e236nqdb3ga"
};

const userPool = new CognitoUserPool(poolData);

class App extends Component{
  state = {
    password:'',
    email:'',
    confirmationNumber:'',
    username:''
  }

  onClick = () => {
    console.log('click')
    const attributeList = [];
    const emailAttribute = {
      Name:'email',
      Value:this.state.email
    }
    attributeList.push(new CognitoUserAttribute(emailAttribute))

    userPool.signUp(this.state.email,this.state.password,attributeList, null, (err,result) => {
      if(err){
        console.log(err)
        console.log('err happened')
      }
      else{
        const cognitoUser = result.user;
        this.setState({username:cognitoUser.getUsername()})
      }
    })
  }

  onChange = ({target}) => this.setState({[target.name]:target.value})

  onClickConfirm = () => {
    const userData = {
       Username : this.state.username,
       Pool : userPool
   };
   const cognitoUser = new CognitoUser(userData)
   cognitoUser.confirmRegistration(this.state.confirmationNumber , true, (err,result) => {
     if(err){
       console.log(err)
       return;
     }
     console.log(result)
   })
  }
  render(){
    return(
      <Fragment>
      <Link to='/login'>Login</Link>
      <Link to='/data'>Data</Link>
      <Form>
        <Form.Field>
          <label>Email Address</label>
          <input placeholder='Email Address' type='email' name='email'
          value={this.state.email}
          onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder='Password' type='password' name='password'
          value={this.state.password}
          onChange={this.onChange}
          />
        </Form.Field>
        <Button onClick={this.onClick}>Submit</Button>
      </Form>
      <Form>
          <Form.Field>
            <label>Confirmation number</label>
            <input placeholder='Confirmation Number' type='number'
            name="confirmationNumber"
            value={this.state.confirmationNumber}
            onChange={this.onChange}
            />
          </Form.Field>
          <Button onClick={this.onClickConfirm}>Confirm my account</Button>
      </Form>
      </Fragment>
    )
  }
}

export default App
