import React,{Component,Fragment} from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {CognitoUserPool, CognitoUserAttribute,CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js'

const poolData = {
        UserPoolId : 'us-west-2_FgQFYJaUL',
        ClientId : "6v24lfb0hutfos6e236nqdb3ga"
};
const userPool = new CognitoUserPool(poolData);

class Login extends Component{
  state = {
    password:'',
    email:''
  }

  onClick = () => {
    const authenticationData = {
      Username : this.state.email,
      Password : this.state.password,
    }
    const authenticationDetails = new AuthenticationDetails(authenticationData)
    const userData = {
      Username : this.state.email,
          Pool : userPool
    };
    const cognitoUser = new CognitoUser(userData)
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess(result){
         const accessToken = result.getAccessToken().getJwtToken();
         console.log(accessToken)
         console.log(result)
         console.log(userPool.getCurrentUser())
      },
      onFailure(err){
        console.log(err)
      }
    })
  }

  onChange = ({target}) => this.setState({[target.name]:target.value})
  render(){
    return(
      <Fragment>
      <Link to='/'>Sign up</Link>
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
        <Button onClick={this.onClick}>Login</Button>
      </Form>
      </Fragment>
    )
  }
}

export default Login
