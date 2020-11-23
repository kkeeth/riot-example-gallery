import '@riotjs/hot-reload'
import { component } from 'riot'
import './style.css'
import App from './app.riot'
import registerGlobalComponents from './register-global-components'

// register
registerGlobalComponents()

// mount the root tag
component(App)(document.getElementById('root'))