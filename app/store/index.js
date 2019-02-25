import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers/weather'

const middleware = [thunkMiddleware]

if (process.env.NODE_ENV === 'development') {
  const loggerMiddleware = createLogger()
  middleware.push(loggerMiddleware)
}

const initialState = {}

const store = (state = initialState) => createStore(
  reducers,
  state,
  composeWithDevTools(applyMiddleware(...middleware)),
)

export default store    