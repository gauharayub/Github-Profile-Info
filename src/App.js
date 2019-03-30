import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import UserForm from './components/form'

class App extends Component {
  state = {
    repos:null,
    name:null,
    location:null,
    followers:null,
    message:"Please enter username"
  }
//function to execute on form submission.... 
  getUser = (e) => {
      e.preventDefault()
      const user = e.target.elements.username.value
      if(user){
//api request using axios to get details of github user..
      axios.get(`https://api.github.com/users/${user}`)
      .then((res) => {
              const repos = res.data.public_repos 
              const name = res.data.name
              const location = res.data.location
              const followers = res.data.followers
              this.setState({
                repos:repos,
                name:name,
                location:location,
                followers:followers,
                message:"Please enter username"
              })
        })
//catch error 404 if username is not found ..
        .catch((error) =>{
          if(error.response){
            this.setState({
              repos:null,
              name:null,
              location:null,
              followers:null,
              message:"Please enter correct username"
            })
          }
        })
      }    
      else{ alert('Please enter username!')
            this.setState({
              repos:null,
              name:null,
              location:null,
              followers:null,
              message:"Please enter username"
            })
                                }           
    
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>GITHUB INFO</h1>
        </header>
        <UserForm getUser={this.getUser} />
          <div id = "display">
        {this.state.repos ? <div className="info">
                                      <p>NUMBER OF PUBLIC REPOSITORIES: &nbsp; {this.state.repos} </p>
                                      <p>NAME OF USER: &nbsp; {this.state.name?this.state.name:'UNAVAILABLE'}</p>
                                      <p>LOCATION OF USER: &nbsp; {this.state.location?this.state.location:'UNAVAILABLE'}</p>
                                      <p>NUMBER OF FOLLOWERS: &nbsp; {this.state.followers}</p>
                            </div>
                             : <p>{this.state.message}</p> }
          </div>
      </div>
    );
  }
}

export default App;
