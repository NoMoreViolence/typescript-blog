import { combineReducers } from 'redux'
import Login, { LoginState } from './Login'
import Category, { CategoryState } from './Category'
import Post, { PostState } from './Post'
import Ripple, { RippleState } from './Ripple'

export default combineReducers({
  Login,
  Category,
  Post,
  Ripple
})

// store state
export interface StoreState {
  Login: LoginState
  Category: CategoryState
  Post: PostState
  Ripple: RippleState
}
