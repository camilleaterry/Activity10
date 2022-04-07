import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { MovieListsContext } from '../App'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import Form from './Form'
import { Breadcrumbs } from '../pages/Pages'

const validationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  public: yup.boolean()
})

export default function ListForm() {
  let { lists, authenticated } = useContext(MovieListsContext)

  let { lid } = useParams()
  let list = lid ? lists.find(l => l.id == lid ) : {}
  let is_new = lid === undefined
  const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    initialValues: is_new ? {
      title: "",
      description: "",
      public: false
    } : {...list}, 
    validationSchema,
    onSubmit(values){
      toast.success(`Successfully ${is_new ? 'created' : 'updated'}`, {onClose: () => {
        document.location = "/movie_lists"
      }})
    }
  })
  return <Form title={is_new ? 'Adding a new movie list' : `Editing an existing movie list`}
               nav={!is_new ? <Breadcrumbs list={list} page="edit"/> : ''}
               yup={validationSchema} 
               formik={{handleSubmit, handleChange, values, errors, setFieldValue}} 
               onCancel={()=> document.location= "/movie_lists"}
               textareas={{description: 5}} />
}
