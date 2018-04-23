import { combineReducers } from 'redux';
import Category, { CategoryState } from './Category';
import MessageToAdmin, { AdminRippleState } from './MessageToAdmin';

export default combineReducers({
  // hello
  Category,
  MessageToAdmin
});

// 스토어의 상태 타입 정의
export interface StoreState {
  // it will be king
  Category: CategoryState;
  MessageToAdmin: AdminRippleState;
}
