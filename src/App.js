import UserRegisterForm from './components/UserRegisterForm';
import Home from './components/Home';
import UserLogin from './components/UserLogin'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import './App.css';

const App=()=>{
  return(
<BrowserRouter>
  <Switch>
    <Route exact path="/" component={UserLogin}/>
    <Route exact path="/user/register" component={UserRegisterForm}/>
    <Route exact path='/home' component={Home}/>
  </Switch>
  </BrowserRouter>
  )
}
export default App
