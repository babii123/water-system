import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/Login';
import LayOut from './pages/Layout';
import NotFound from './pages/NotFound';
// import PrivateRoute from './components/PrivateRoute';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/404" component={NotFound} />
          <Route path="/" component={LayOut} />
          {/* <PrivateRoute path="/" component={Layout} /> */}
          {/* <Redirect to="/"/> */}
        </Switch>
      </BrowserRouter>
    )
  }
}
// {/* 
//         重定向拦截失败
//         */}
// {/* <Route path="/" component={<PrivateRoute requiredRoles={[]} component={<LayOut />} />}>
//           <Route path="/" component={<Message />} />
//         </Route> */}
export default App;