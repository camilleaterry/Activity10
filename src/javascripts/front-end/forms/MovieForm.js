import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { MovieListsContext } from '../App'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import Form from './Form'
import { Breadcrumbs } from '../pages/Pages'
import AddableMoviesForm from './AddableMoviesForm'

const validationSchema = yup.object({
  year: yup.number().required().min(1900).max(new Date().getFullYear()),
  title: yup.string().required(),
  poster: yup.string().url().required(),
  plot: yup.string().required(),
  releaseDate: yup.date().required(),
  genre: yup.string().oneOf([
    "Action", "Adventure", "Fantasy", "Drama", "Comedy", 
    "Family", "Science Fiction", "Romance", "Animation", "History",
    "Thriller", "Western" , "Horror", "Musical", "Documentary", 
    "Biography", "Mystery"]).required(),
  rated: yup.string().oneOf(["G", "PG", "PG-13", "R", "NR"]).required(),
  rating: yup.number().min(0.0).max(10.0).required(),
  votes: yup.number().min(0)
})

export default function MovieForm() {
  let { movies, currentList , authenticated, setAuthenticated} = useContext(MovieListsContext)

  let { mid, lid } = useParams()
  let movie = mid ? movies.find(m => m.id == mid ) : {}
  let is_new = mid === undefined
  const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    initialValues: is_new ? {
      year: new Date().getFullYear(),
      title: "",
      poster: "",
      plot: "",
      releaseDate: "",
      review: "",
      votes: 0,
      rating: 0.0
    } : {...movie}, 
    validationSchema,
    onSubmit(values){
      toast.success(`Successfully ${is_new ? 'created' : 'updated'}`, {onClose: () => {
        document.location = is_new ? `/movie_lists/${currentList.id}/movies` : `/movie_lists/${currentList.id}/movies/${movie.id}`
      }})
    }
  })

  return(
    <>
      <Form title={is_new ? 'Adding a new movie' : `Editing ${values.title}`}
            nav={is_new ? <Breadcrumbs list={currentList} page="new"/> : <Breadcrumbs list={currentList} movie={movie} page="edit"/>}
            yup={validationSchema} 
            formik={{handleSubmit, handleChange, values, errors, setFieldValue}} 
            textareas={{plot: 5}}
            onCancel={()=> document.location= is_new ? `/movie_lists/${currentList.id}/movies` : `/movie_lists/${currentList.id}/movies/${movie.id}`}/>

      {/* { is_new && <AddableMoviesForm lid={lid}/> } */}
    </>
  )
}
