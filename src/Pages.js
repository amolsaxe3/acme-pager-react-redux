import React from 'react';
import {store, fetchData} from './utils.js'
import axios from 'axios';

class Pages extends React.Component {
  constructor() {
    super()
    this.state = store.getState()
  }

  componentWillUnmount(){
    this.unsubscribe();
  }
  componentDidMount(){
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.empCount !== this.state.empCount) {
      const pageNumber = store.getState().currentPage
      axios.get(`/api/employees/${pageNumber}`)
      .then(res => {
        store.dispatch({
          type: 'SET_PAGE_DATA',
          employees: res.data.rows
        })
      })
    }
  }

  render() {

    const {employees} = this.state
    return (

      <div>
        <table id='table1'>
          <thead id='header'>
            <th>First Name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Title</th>
          </thead>
          <tbody>
            {employees.map((emp) => {
              return (
                <tr key={emp.id}>
                  <td>{emp.firstName}</td>
                  <td>{emp.lastName}</td>
                  <td>{emp.email}</td>
                  <td>{emp.title}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    )
  }
}
export default Pages;