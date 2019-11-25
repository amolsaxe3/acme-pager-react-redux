import {createStore} from 'redux'
import axios from 'axios'

const initialState = {
  employees: [],
  empCount: 0,
  currentPage: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EMPLOYEE_COUNT': {
      return Object.assign({}, state, {empCount: action.count})
    }
    case 'SET_PAGE_DATA': {
      return Object.assign({}, state, {employees: action.employees})
    }
    case 'CURRENT_PAGE': {
      return Object.assign({}, state, {currentPage: action.page})
    }
    default:
      return state
  }
}

const store = createStore(reducer)

const fetchData = async () => {
    const idx = store.getState().currentPage
    await axios.get(`/api/employees/${idx}`)
      .then(res => {
        store.dispatch({
          type: 'SET_PAGE_DATA',
          employees: res.data.rows
        }),
        store.dispatch({
          type: 'EMPLOYEE_COUNT',
          count: res.data.count
        })
      })
  }

export {
  store,
  fetchData
}