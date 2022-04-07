import React, { useEffect, useContext } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { MovieListsContext } from '../App'

export default function MoviesGetter() {
  const {movies, setMovies, currentList, setCurrentList} = useContext(MovieListsContext)
  let {lid} = useParams()
  useEffect(() => {
    fetch(`./top10-movies.dat`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json'          
        },
        credentials: 'same-origin'
      })
      .then(response => response.text())
      .then(data => {
        let results = JSON.parse(data, (key, value) => {
          const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*Z$/
          if (typeof value === "string" && dateFormat.test(value)) {
            return new Date(value)
          }

          return value
        })
        
        setMovies(results)
        setCurrentList({ "id": 100100, "title": "Top 10 IMDB Movies" }) // To be changed later.
      }).catch(console.error)
  }, [])

  if(!movies || !currentList)
    return <p>Loading...</p>

  return <Outlet/>
}