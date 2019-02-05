import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import flaresReducer from './reducers/flaresReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  flares: flaresReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store