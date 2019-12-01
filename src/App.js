import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Header, Home, About, Contact, Users, SignIn, SignUp, NestedUser, Todo, TodoMongoose} from './components/js'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/about" exact={true}>
            <About />
          </Route>
          <Route path="/contact" exact={true}>
            <Contact />
          </Route>
          <Route path="/users" exact={true}>
            <Users />
          </Route>
          <Route path="/users/:name" >
            <NestedUser />
          </Route>
          <Route path="/signin" exact={true}>
            <SignIn />
          </Route>
          <Route path="/signup" exact={true}>
            <SignUp />
          </Route>
          <Route path="/todo" exact={true}>
            <Todo />
          </Route>
          <Route path="/todo-mongoose" exact={true}>
            <TodoMongoose />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
