import { Component } from 'react';

import './index.css'
import { Link } from 'react-router-dom';
class UserRegisterForm extends Component {
  state = { Name: "", Number: "", Username: "", password: "" ,register:''};
  onRegister=(data)=>
    {
    this.setState({register:data})
    }
  ChangeName = (event) => {
    this.setState({ Name: event.target.value });
  };

  ChangePhoneNumber = (event) => {
    this.setState({ Number: event.target.value });
  };
  ChangeUserName = (event) => {
    this.setState({ Username: event.target.value });
  };

  ChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  formSubmit = async (event) => {
    event.preventDefault();
    const { Name, Number, Username, password , } = this.state;

    const UserDetailsList = {
      name: Name,
      phoneNumber: Number,
      userName: Username, // Ensure the key matches what your API expec
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UserDetailsList),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.text();
    this.onRegister(data);
    } catch (error) {
      console.error('Error:', error); 
    }
  };

  render() {
    const {register}=this.state
    return (
      <div className='mainpage'>
      <div className='formDetails'>
        <form onSubmit={this.formSubmit}>
          <label>
            <input
              type="text"
              placeholder='Name'
              onChange={this.ChangeName}
              value={this.state.Name}
              className='textbox'
              required
            />
          </label><br />
          <input
            type="text"
            placeholder='Phone Number'
            onChange={this.ChangePhoneNumber}
            value={this.state.Number}
             className='textbox'
             required
          /><br />
          <input
            type="text"
            placeholder='Username'
            onChange={this.ChangeUserName}
            value={this.state.Username}
             className='textbox'
             required
          /><br />
          <input
            type="password"
            placeholder='Password'
            onChange={this.ChangePassword}
            value={this.state.password}
             className='textbox'
             required
          /><br />
          <p className='para'>{register}</p>
          <button type="submit">Submit</button>
          <Link to="/">
          <button type="button">Login now</button>
          </Link>
        </form>
      </div>
      </div>
    );
  }
}

export default UserRegisterForm;