import React from 'react'
import { toast } from 'react-toastify'

export function DeleteModal({index, movie, list}){
  let deleteListOrMovie = () => {
    toast.success(`Successfully deleted`, {onClose: () => {
      document.location = movie ? `/movie_lists/${list.id}/movies` : "/movie_lists"
    }})
  }

  return (
    <div className="modal fade" id={`deleteMovieModal_${index}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Are you sure about this?</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete <strong>{movie ? movie.title : list.title}</strong>?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-danger" onClick={ deleteListOrMovie }>Confirm delete</button>
          </div>
        </div>
      </div>  
    </div> 
  )
}