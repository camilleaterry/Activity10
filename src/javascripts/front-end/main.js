// Required by Webpack - do not touch
require('../../favicon.ico')
require.context('../..', true, /\.(txt|dat)$/i)
require.context('../../fonts/', true, /\.(eot|ttf|woff|woff2)$/i)
require.context('../../images/', true, /\.(png|jpg|jpeg|gif|svg)$/i)
require.context('../../stylesheets/', true, /\.(css|scss)$/i)

// TODO
import 'bootstrap'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { toast } from 'react-toastify'

toast.configure()

ReactDOM.render(<React.StrictMode><App/></React.StrictMode>, document.querySelector('#main'))

