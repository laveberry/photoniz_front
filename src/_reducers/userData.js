//액션타입 정의
const MODIFY_USERDATA = 'userData/MODIFY_USERDATA';
const INIT_USERDATA = 'userData/INIT_USERDATA';
const LOGIN = 'userData/LOGIN';

//액션 생성함수
export const modifyUserData = (data) => ({data:data , type : MODIFY_USERDATA});
export const initUserData = () => ({type : INIT_USERDATA});
export const login = (data) => ({data : data, type : LOGIN});

//초기값
const initialState = {
    name : '',
    job: '',
    email : '',
    phone : '',
    token : '',
    authenticated : false
}

//리듀서 선언
export default function userData(state = initialState, action){
    switch (action.type){
        case MODIFY_USERDATA :
            return {...action.data};
        case INIT_USERDATA :
            return initialState;
        case LOGIN :
            console.log("로그인 정보 담기", action);
            return {...state, token: action.data.token, email : action.data.email, authenticated : action.data.authenticated};
        default :
        return state;
    }
}