import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import {format} from 'date-fns'
import { DeleteModal } from '../forms/DeleteModal'
import { MovieListsContext } from '../App'
import StarRating, { Breadcrumbs, UnifiedPageHeader } from '../pages/Pages'
import MovieReviews from '../forms/MovieReviews'

export default function Movie(props){
  let { movies, currentList, authenticated} = useContext(MovieListsContext)
  let { mid } = useParams()
  let movie = mid ? movies.find(m => m.id == mid ) : {}
  
  return (
    <div className="mx-5">
      <Breadcrumbs list={currentList} movie={movie}></Breadcrumbs>
      <UnifiedPageHeader title={movie.title} start_sz={9} end_sz={3} extra={ authenticated && movie.editable &&
        <div className="row">
          <div className="col d-grid">
            <Link to={`/movie_lists/${currentList.id}/movies/${movie.id}/edit`} className="btn btn-secondary">Edit</Link>
          </div>
          <div className="col d-grid">
            <DeleteModal index={movie.id} list={currentList} movie={movie} page={movie.title}></DeleteModal>
            <a data-bs-toggle="modal" data-bs-target={`#deleteMovieModal_${movie.id}`} className="btn btn-danger">Delete</a>
          </div>
        </div>
      }/>

      <div className="clearfix mt-4">
        <img src={movie.poster} className="ms-2 w-25 float-end" alt={movie.title }/>
        {/* <h2 className="card-title">{ movie.title}</h2> */}
        <p className="card-text">{ movie.plot }</p>
        <p><strong>Rating</strong>: <StarRating rating={movie.rating}/> { movie.rating }</p>
        <p><strong>Votes</strong>: {movie.votes}</p>
        <p><strong>Rated</strong>: {movie.rated}</p>
        <p><strong>Genre</strong>: {movie.genre}</p>
        <p><strong>Release date</strong>: {format(movie.releaseDate, "MM/dd/yyyy")}</p>
      </div>

      <div>
        <MovieReviews list={currentList} movie={movie}/>
      </div>
    </div>
  )
}
