import { Component } from "react";
import { Link } from 'react-router-dom';
import "./index.css";

class UserLogin extends Component {
  state = {
    userName: '',
    password: '',
    errorMessage: '',
    showErrormsg: false,
  };

  onSubmitSuccess = () => {
    const { history } = this.props;
    history.push("/home");
  };

  onSubmitfailure = (errorMsg) => {
    this.setState({
      showErrormsg: true,
      errorMessage: errorMsg,
    });
  };

  handleUsernameChange = (event) => {
    this.setState({ userName: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleLogin = async (event) => {
    event.preventDefault();
    const { userName, password } = this.state;

    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          password: password,
        }),
      });

      const data = await response.text();
      console.log(data);

      if (data === "1") {
        this.onSubmitSuccess();
        console.log(data);
      } else {
        this.onSubmitfailure(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  render() {
    const { showErrormsg, errorMessage } = this.state;
    return (
      <div className="container">
        <div className="formDetails">
          <h1 className="login">Login Form</h1>
          <form onSubmit={this.handleLogin} className="form">
            <input
              type="text"
              placeholder="Enter username"
              onChange={this.handleUsernameChange}
              value={this.state.userName} // Corrected 'username' to 'userName'
              className="textbox"
              required
            /><br />
            <input
              type="password"
              placeholder="Enter password"
              onChange={this.handlePasswordChange}
              value={this.state.password}
              className="textbox"
              required
            /><br />
            {showErrormsg && <p className="para">{errorMessage}</p>}
            <button type="submit">Submit</button>
            <Link to="/user/register" className="linkbutton"><br />
              <button type="button">Create New Account</button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default UserLogin;
