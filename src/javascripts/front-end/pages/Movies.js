import React, { useContext, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { MovieListsContext } from '../App'
import MovieItem from './MovieItem'
import { Breadcrumbs, UnifiedPageHeader } from '../pages/Pages'
import { APP_SETTINGS } from '../config/settings'

export default function Movies() {
  let [page, setPage] = useState(0)
  const {movies, setMovies, currentList} = useContext(MovieListsContext)
  const changePage =  (p) => setPage(p)
  
  const sortBy = (field) => {
    if(field === "releaseDate"){ // Date descendingly
      // Either
      // movies.sort((a, b) => b[field].toISOString().localeCompare(a[field].toISOString()))

      // or
      movies.sort((a, b) => b[field].getTime() - a[field].getTime())
    } else if(field === "rating"){ // Number
      movies.sort((a, b) => b[field] - a[field])
    } else if(field === "title"){ // String
      movies.sort((a, b) => a[field].localeCompare(b[field]))
    }
    setPage(0)
    setMovies([...movies])
  }

  if(!movies || !currentList)
    return <p>Loading...</p>

  return (
    <div className="mx-5">
      <Breadcrumbs list={currentList}></Breadcrumbs>
      <UnifiedPageHeader title="Movies" start_sz={7} end_sz={5} extra={
        <div className="row">
          <div className="col d-grid">
            <select className="form-select" onChange={(e) => sortBy(e.target.value)}>
              <option defaultValue="">Sort movies by:</option>
              <option value="title">Title</option>
              <option value="releaseDate">Release date</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <div className="col d-grid">
            <Link to={`/movie_lists/${currentList.id}/movies/new`} className="btn btn-primary"><FaPlus/> Add new movie</Link>
          </div>
        </div>
      }/>

      <div className="with-border-inbetween">
        {
          movies.map((m, i) => {
            if(Math.floor(i / APP_SETTINGS.items_per_page) == page){
              return (
                <MovieItem key={m.id} movie={m} index={i} onLike={() => {
                  movies[i].likes = movies[i].likes ? movies[i].likes + 1 : 1

                  setMovies(movies.map(m => m))
                }} />
              )
            }
          })
        }
      </div>
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          { movies.length > 0 ?
            Array.from(Array(Math.ceil(movies.length / APP_SETTINGS.items_per_page)).keys()).map(p => {
              return (
                <li key={p} className={p == page ? "page-item active" : "page-item"}>
                  <a className="page-link" onClick={ (e) => changePage(p) }>{p + 1}</a>
                </li>
              )
            }) : <p className="text-center">Nothing to display</p>
          }
        </ul>
      </nav>
    </div>
  )
}