import React, { useState, useContext } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { MovieListsContext } from '../App'
import ListItem from './ListItem'
import { UnifiedPageHeader } from '../pages/Pages'
import { APP_SETTINGS } from '../config/settings'

export default function Lists(props) {
  let [page, setPage] = useState(0)
  const {lists} = useContext(MovieListsContext)
  const changePage =  (p) => setPage(p)

  return (
    <div className="mx-5">
      <UnifiedPageHeader title="Movie lists" start_sz={9} end_sz={3} extra={
        <Link to="/movie_lists/new" className="btn btn-primary"><FaPlus/> Add new list</Link>
      }/>

      <div className="with-border-inbetween">
        {
          lists.map((l, i) => {
            if(Math.floor(i / APP_SETTINGS.items_per_page) == page){
              return (
                <ListItem key={i} list={l} index={i} />
              )
            }
          })
        }
      </div>
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {
            Array.from(Array(Math.ceil(lists.length / APP_SETTINGS.items_per_page)).keys()).map(p => {
              return (
                <li key={p} className={p == page ? "page-item active" : "page-item"}>
                  <a className="page-link" onClick={ (e) => changePage(p) }>{p + 1}</a>
                </li>
              )
            })
          }
        </ul>
      </nav>
    </div>
  )
}