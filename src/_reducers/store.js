import {createStore} from 'redux';
import combineReducer from './combineReducer';

export const store = createStore(combineReducer);

/*
1. 처음에 저희는 데이터를 모두 담는 store를 만들었습니다.
2. 그 다음 리듀서(store 정보들을 바꾸는 역할)들을 한 곳에 모을 combineReducers를 만들었습니다.
3. 액션 타입, 액션 함수, 리듀서를 각각 useData.js에 만들었습니다.
4. actionCreators.js에서 bindActionCreators를 통해 dispatch를 바로 호출합니다.
5. 리듀서는 이전 데이터와 새로운 데이터/타입을 활용해서 새로운 값을 만들어 줍니다.
*/