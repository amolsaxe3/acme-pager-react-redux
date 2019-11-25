import React from 'react';
import {HashRouter, Link, NavLink, Route, Switch} from 'react-router-dom'
import {store, fetchData} from './utils.js'

class Nav extends React.Component {
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

  componentDidUpdate(prevProps) {
    const newPage = this.props.location.pathname.slice(1)
    const currentPage = prevProps.location.pathname.slice(1)

    if (newPage !== currentPage) {
      store.dispatch({
        type: 'CURRENT_PAGE',
        page: newPage
      })
      fetchData()
    }
  }

  render() {
    const { empCount } = this.state
    console.log('empCount===>', empCount)
    const totalPages = Math.ceil(empCount / 50)
    const pages = []
    const currentPage = Number(this.props.location.pathname.slice(1))
    const nextPage = currentPage < totalPages - 1 ? currentPage + 1 : totalPages - 1
    const prevPage = currentPage > 0 ? currentPage - 1 : 0

    for (let i = 0; i < totalPages; i++){
      pages.push(i)
    }

    return (
    
        <div id='nav1'>
            <nav>
                <Link to={`/${prevPage}`}>Prev</Link>
                {
                pages.map((page, idx) => <Link id='nav2' to={`/${page}`} key={idx}>{page+1}</Link>)
                }
                <Link to={`/${nextPage}`}>Next</Link>
            </nav>
        </div>

    )
  }
}

export default Nav;