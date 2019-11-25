import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Link, NavLink, Route, Switch} from 'react-router-dom'
import Pages from './Pages.js'
import Nav from './Nav.js'
import {fetchData} from './utils.js'

class App extends React.Component {

  componentDidMount(){
    fetchData()
  }


  render() {
    return (
      <div>
        <h1 id='head1'>Acme Employee Details</h1>
        <HashRouter>
          <Route path='/:id?' component={ Pages } />
          <Route component={ Nav } />
        </HashRouter>
      </div>
    )
  }
}


const rootEl = document.querySelector('#root');

ReactDOM.render(<App />, rootEl);
export default App;