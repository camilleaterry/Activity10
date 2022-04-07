import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { UnifiedPageHeader } from '../pages/Pages'

export default function AddableMoviesForm ({lid}) {
  const [addables, setAddables] = useState()
  useEffect(() => {
    fetch(`/api/movie_lists/${lid}/addable_movies`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json'          
        },
        credentials: 'same-origin'
      })
      .then(response => response.json())
      .then(data => setAddables(data))
      .catch(console.error)
  }, [])

  let selectedMovies = []
  const addMovies = (e) => {
    e.preventDefault()
    fetch(`/api/movie_lists/${lid}/movies/add`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({movies: selectedMovies})
    })
    .then(() => {
      toast.success(`Successfully submitted`, {onClose: () => {
        document.location = `/movie_lists/${lid}/movies`
      }})
    })
    .catch((error) => {
      toast.error(`Failed to submit your message`)
    });
  }

  const selectMovie = (e) => {
    if(e.target.checked){
      selectedMovies.push(e.target.value)
    } else {
      selectedMovies.splice(selectedMovies.indexOf(e.target.value), 1)
    }
  }

  if(!addables)
    return <p>Loading...</p>

  return (
    <form id="addable-movies">
      <div className="mx-5 mb-3 row">
        <UnifiedPageHeader title={"Or add existing movies"} start_sz={11} end_sz={1}/>
        <table className="table align-middle">
          <tbody>
            {
              addables.movies.map((movie, i) => {
                return (
                  <tr key={i}>
                    <td><img src={movie.poster} alt={movie.title} className="img-fluid" width="40"/></td>
                    <td>{movie.title}</td>
                    <td><input type="checkbox" name="movie" value={movie.id} className="form-check-input" onChange={selectMovie}/></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={addMovies}>Add selected movies</button>
      </div>
    </form>
  )
}
