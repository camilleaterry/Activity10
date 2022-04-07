import React from 'react'
import DatePicker from 'react-datepicker'
import { UnifiedPageHeader } from '../pages/Pages'

function VHelp({message}){
  return <div className="invalid-feedback">{message}</div>
}

function FieldLabel({name, required}){
  let title = ''
  for(let i = 0; i < name.length; i++){
    if(i === 0) title += name[i].toUpperCase()
    else if(name[i] === name[i].toUpperCase()) title += ' ' + name[i].toLowerCase()
    else if(name[i] === '_') title += ' '
    else title += name[i]
  }

  return (
    <label htmlFor={name} className="form-label col-sm-2 text-end">
      <strong>{title}<span className='text-danger'>{ required ? '*' : '' }</span></strong>
    </label>
  )
}

function TextField({name, value, required, handleChange, error, type, options = {}}){
  if(type === undefined) type = name === "password" ? "password" : "text"
  return (
    <div className="mb-3 row">
      <FieldLabel name={name} required={required} />
      <div className="has-validation col-sm-9">
        <input className={`form-control ${error ? 'is-invalid' : ''}`} type={type} id={name} value={value} onChange={handleChange} {...options}/>
        <VHelp message={error}/>
      </div>
    </div>
  )
}

function TextareaField({name, value, required, handleChange, error, rows}){
  return (
    <div className="mb-3 row">
      <FieldLabel name={name} required={required} />
      <div className="has-validation col-sm-9">
        <textarea className={`form-control ${error ? 'is-invalid' : ''}`} id={name} value={value} rows={rows} onChange={handleChange}></textarea>
        <VHelp message={error}/>
      </div>
    </div>
  )
}

function CheckboxField({name, value, required, setFieldValue, error}){
  return (
    <div className="mb-3 row">
      <FieldLabel name={name}  required={required} />
      <div className="has-validation col-sm-9">
        <input className="form-check-input" id="done" name="done" type="checkbox" checked={value} onChange={v => { setFieldValue(name, v.target.checked)}}/>
      </div>
    </div>
  )
}

function SelectField({name, list, value, required, handleChange, error}){
  return (
    <div className="mb-3 row">
      <FieldLabel name={name} required={required} />
      <div className="has-validation col-sm-9">
        <select className={`form-select ${error ? 'is-invalid' : ''}`} id={name} value={value} onChange={handleChange}>
          <option key={0} value="">Not selected</option>
          {
            list.map((item, i) => <option key={i + 1} value={item}>{item}</option> )
          }
        </select>
        <VHelp message={error}/>
      </div>
    </div>
  )
}

function DateField({name, value, required, setFieldValue, error}){
  return (
    <div className="mb-3 row">
      <FieldLabel name={name} required={required} />
      <div className="has-validation col-sm-9">
        <div className={error ? 'is-invalid' : ''}>
          <DatePicker className={`form-control ${error ? 'is-invalid' : ''}`} id={name} selected={value} onChange={date => setFieldValue(name, date)}/>
        </div>        
        <VHelp message={error}/>
      </div>
    </div>
  )
}

export default function Form({title, nav, yup, formik, onCancel, textareas}) {
  let fields = []
  let count = 0
  for (const [name, schema] of Object.entries(yup.fields)) {
    let value = formik.values[name]
    let error = formik.errors[name]
    let schema_desc = schema.describe()

    switch(schema.type){
      case "number":
        let [ minTest, ] = schema_desc.tests.filter(t => t.name === 'min')
        let [ maxTest, ] = schema_desc.tests.filter(t => t.name === 'max')
        let options = {min: minTest?.params['min'], max: maxTest?.params['max'], step: "0.1"}

        fields.push(<TextField key={count} 
                               name={name} type="number" 
                               required={schema.exclusiveTests?.required} 
                               value={value} 
                               options={options}
                               error={error} 
                               handleChange={formik.handleChange}/>)
        break;
      case "date":
        fields.push(<DateField key={count} 
                               name={name}
                               required={schema.exclusiveTests?.required}
                               value={value} 
                               error={error} 
                               setFieldValue={formik.setFieldValue}/>)
        break;
        case "boolean":
          fields.push(<CheckboxField key={count} 
                                     name={name} 
                                     value={value} 
                                     required={schema.exclusiveTests?.required}
                                     error={error} 
                                     setFieldValue={formik.setFieldValue}/>)
          break;
      default:
        if(textareas && textareas[name]){
          fields.push(<TextareaField key={count} 
                                     name={name} 
                                     value={value} 
                                     required={schema.exclusiveTests?.required}
                                     error={error} 
                                     rows={textareas[name]}
                                     handleChange={formik.handleChange}/>)
        } else if(schema_desc.oneOf?.length > 0){
          fields.push(<SelectField key={count} 
                                   name={name} 
                                   list={schema_desc.oneOf}
                                   value={value} 
                                   required={schema.exclusiveTests?.required}
                                   error={error} 
                                   handleChange={formik.handleChange}/>)
        } else {
          fields.push(<TextField key={count} 
                                 name={name} 
                                 value={value} 
                                 required={schema.exclusiveTests?.required}
                                 error={error} 
                                 handleChange={formik.handleChange}/>)
        }
    }

    count++
  }

  return (
    <div className="mx-5">
      <UnifiedPageHeader title={title} start_sz={6} end_sz={6} extra={nav} extra_cls={'breadcrumb-end'} />
      <form onSubmit={formik.handleSubmit}>
        { fields }

        <div className="mb-3 row">
          <div className="col-sm-9 offset-sm-2">
            <button type="submit" className="btn btn-primary me-2">Submit</button>
            { onCancel && <button type="button" className="btn btn-danger me-2" onClick={onCancel}>Cancel</button> }
          </div>
        </div>
      </form >
    </div>
  )
}
