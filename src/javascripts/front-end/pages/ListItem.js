import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {format} from 'date-fns'
import { MovieListsContext } from '../App';
import { DeleteModal } from '../forms/DeleteModal';

export default function ListItem({list}){
  const {currentList, setCurrentList} = useContext(MovieListsContext)
  let navigate = useNavigate();
  const selectList = () => {
    setCurrentList({id: list.id, title: list.title})
    navigate(`/movie_lists/${list.id}/movies`)
  }

  let ownerActions = list.editable ? (
      <>
      <Link to={`/movie_lists/${list.id}/edit`} className="btn btn-secondary me-2">Edit list</Link>
      <a className="btn btn-danger me-2" data-bs-toggle="modal" data-bs-target={`#deleteMovieModal_${list.id}`}>Delete</a>
    </>) : ''

  return (
    <div className="d-flex">
      <div className="flex-shrink-0 text-center">
        <h1 className="display-5 text-primary">{list.movies.length}</h1>
        <p className="lead">movies</p>
      </div>
      <div className="flex-grow-1 ms-5">
        <h3 className="card-title">{list.title}</h3>
        <p className="card-text">{list.description }</p>
        <p><strong>Created at</strong>: {format(list.createdAt, "MM/dd/yyyy")}</p>
        <DeleteModal index={list.id} list={list}></DeleteModal>
        <p>
          {ownerActions}
          <button onClick={selectList} className="btn btn-primary me-2">See movies</button>
        </p>
      </div>
    </div>
  )
}
