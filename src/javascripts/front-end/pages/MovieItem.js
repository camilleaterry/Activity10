import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {format} from 'date-fns'
import { MovieListsContext } from '../App';

export default function MovieItem({movie}){ //{ movie, onLike = f => f }) {
  const {currentList} = useContext(MovieListsContext)
  let navigate = useNavigate();
  
  return (
    <div className="d-flex">
      <div className="flex-shrink-0" style={{width: "15%"}}>
        <img src={movie.poster} className="img-fluid img-thumbnail" alt={movie.title}/>
      </div>
      <div className="flex-grow-1 ms-3">
        <h3 className="card-title">{ movie.title}</h3>
        <p className="card-text">{ movie.plot }</p>
        <p><strong>Release date</strong>: {format(movie.releaseDate, "MM/dd/yyyy")}</p>
        <p>
          <Link to={`/movie_lists/${currentList.id}/movies/${movie.id}`} className="btn btn-primary m-2">See movie details</Link>
        </p>
      </div>
    </div>
  )
}
