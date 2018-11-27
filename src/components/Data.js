import React,{Component,Fragment} from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {CognitoUserPool, CognitoUserAttribute,CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js'

const poolData = {
        UserPoolId : 'us-west-2_FgQFYJaUL',
        ClientId : "6v24lfb0hutfos6e236nqdb3ga"
};
const userPool = new CognitoUserPool(poolData);

class Data extends Component{
  state = {
    name:'',
    age:''
  }


  getData = () => {
    var cognitoUser = userPool.getCurrentUser();
    cognitoUser.getSession((err,session) => {
      if(err) return console.log(err)
      const params = `?accessToken=${session.getAccessToken().getJwtToken()}`
      fetch(`https://zs1sfm2xyg.execute-api.us-west-2.amazonaws.com/dev/compare-yourself/man${params}`,{
        headers:{
          "Authorization":session.getIdToken().getJwtToken()
        }
      })
      .then(data => data.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
    })
  }


  onChange = ({target}) => this.setState({[target.name]:target.value})
  onClick = () => {

    var cognitoUser = userPool.getCurrentUser().getSession((err,session) => {
      if(err){
        console.log(err)
        return;
      }
      else{
        fetch('https://zs1sfm2xyg.execute-api.us-west-2.amazonaws.com/dev/compare-yourself',{
          method:"POST",
          headers:{
            "Authorization":session.getIdToken().getJwtToken()
          },
          body:JSON.stringify({
            name:this.state.name,
            age:this.state.age,
            userId:session.getIdToken().getJwtToken()
          })
        }).then(data => console.log('posted'))
        .catch(err => console.log(err))
      }
    });
  }

  render(){
    return(
      <Fragment>
      <Link to='/login'>Post data</Link>
      <Form>
        <Form.Field>
          <label>Name</label>
          <input placeholder='Email Address' type='text' name='name'
          value={this.state.name}
          onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Age</label>
          <input placeholder='Password' type='text' name='age'
          value={this.state.age}
          onChange={this.onChange}
          />
        </Form.Field>
        <Button onClick={this.onClick}>Submit</Button>
      </Form>

      <Form>
        <Button onClick={this.getData}>Get my Data</Button>
      </Form>
      </Fragment>
    )
  }
}

export default Data
