import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import Form from './Form'

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  email: yup.string().email().required().required("Required"),
  message: yup.string().required()
})

export default function ContactForm() {
  const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: ""
    }, 
    validationSchema,
    onSubmit(values){
      fetch('/api/contact', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(values)
      })
      .then(() => {
        toast.success(`Successfully submitted`, {onClose: () => {
          document.location = "/movie_lists"
        }})
      })
      .catch((error) => {
        toast.error(`Failed to submit your message`)
      });
    }
  })

  return <Form title="Contact us" 
              yup={validationSchema} 
              formik={{handleSubmit, handleChange, values, errors, setFieldValue}} 
              onCancel={()=> document.location= "/movie_lists"}
              textareas={{message: 5}}/>
}
