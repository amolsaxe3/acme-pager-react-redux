
    import React from 'react';
    import {createStore, combineReducers} from 'redux';
    import { HashRouter, Switch, Route, Link, Redirect } from "react-router-dom";

      const reducer = combineReducers({
        events: (state = [], action)=> {
          if(action.type === 'GET_PAGE_DATA'){
              console.log('inside GET_PAGE')
            state = action.pageData;
          }
          if(action.type === 'ADD_EVENT'){
            state = [...state, action.event ];
          }
          if(action.type === 'DELETE_EVENT'){
            state = state.filter(event => event.id !== action.event.id); 
          }
          return state;
        }
      });

      const store = createStore(reducer);


      const fetchPageData = async(number)=> store.dispatch({ type: 'GET_PAGE_DATA', pageData: (await axios.get(`/api/employees/${number}`)).data})
      const createEvent = async()=> store.dispatch({ type: 'ADD_EVENT', event: (await axios.post('/api/events')).data})
      const deleteEvent = async(event)=> {
        await axios.delete(`/api/events/${event.id}`);
        store.dispatch({ type: 'DELETE_EVENT', event });
      };

      const connect = (Component)=> {
        class Connected extends React.Component{
          constructor(){
            super();
            this.state = store.getState();
          }
          componentWillUnmount(){
            this.unsubscribe();
          }
          componentDidMount(){
            this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
          }
          render(){
            return (
              <Component {...this.state } {...this.props }/>
            );
          }
        }
        return Connected;
      }

  const Nav = connect(({ events, location: { pathname } })=> {
    return (
      <nav>
        <Link to='/1'>Pages</Link>
        {/* <Link to='/1'>Events ({ events.length })</Link> */}
      </nav>
    );
  })

//   const Events = connect(({ events })=> {
//     return (
//       <div>
//         <button onClick={ createEvent }>Create</button>
//         <ul>
//           {
//             events.map( _event => <li key={ _event.id } onClick={ ()=> deleteEvent(_event)}>{ _event.name } { moment(_event.date).format('MM/DD/YYYY') }</li>)
//           }
//         </ul>
//       </div>
//     );
//   })

  const Pages = connect(({ pageData })=> <div> { pageData }</div>);


  class App extends React.Component{
    // componentDidMount(){
    //   fetchPageData(1);
    // // const [people, places, things] = await Promise.all(
    // //   urls.map( url => axios.get(url).then( response => response.data))
    // // );
    // // this.setState({ people, places, things });
    // }
    render(){
      return (
        <HashRouter>
          <div id="headline"><h1>Acme Pager</h1></div>
          <Route component={ Nav } />
          <Switch>
          <Route path="/:id" component={Pages}/>
          <Redirect to="/0"/>
          </Switch>
        </HashRouter>
      );
    }
  }

  ReactDOM.render(<App />, document.querySelector('#root'));