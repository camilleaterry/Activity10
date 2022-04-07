import React, { createContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { ToastContainer } from 'react-toastify'
import Movie from './pages/Movie'
import Lists from './pages/Lists'
import ListForm from './forms/ListForm'
import Movies from './pages/Movies'
import MovieForm from './forms/MovieForm'
import { Error401 } from './pages/Pages'
import ListsGetter from './data/ListsGetter'
import MoviesGetter from './data/MoviesGetter'

export const MovieListsContext = createContext()

export default function App(){
  const [lists, setLists] = useState()
  const [movies, setMovies] = useState()
  const [currentList, setCurrentList] = useState()

  return (
    <MovieListsContext.Provider value={{lists, setLists, movies, setMovies, currentList, setCurrentList}}>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route path="/movie_lists" element={<ListsGetter/>}>
            <Route index element={<Lists/>}/>
            <Route path="new" element={<ListForm/>}/>
            <Route path=":lid/edit" element={<ListForm/>}/>
            <Route path=":lid/movies" element={<MoviesGetter/>}>
              <Route index element={<Movies/>}/>
              <Route path="new" element={<MovieForm/>}/>
              <Route path=":mid" element={<Movie/>}/>
              <Route path=":mid/edit" element={<MovieForm/>}/>
            </Route>
          </Route>
          <Route path="*" element={<Error401 />}/>
        </Routes>
      </BrowserRouter>
    </MovieListsContext.Provider>
  )
}