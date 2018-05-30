import { combineReducers } from 'redux'
import Category, { CategoryState } from './Category'
import Login, { LoginState } from './Login'
import Post, { PostState } from './Post'

export default combineReducers({
  // hello
  Category,
  Login,
  Post
})

// 스토어의 상태 타입 정의
export interface StoreState {
  // it will be king
  Category: CategoryState
  Login: LoginState
  Post: PostState
}
