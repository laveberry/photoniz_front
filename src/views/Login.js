import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { UserDataAction } from "_reducers/actionCreators";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function Login() {
  // redux - 새로고침시 데이터 초기화
  let state = useSelector((state)=>{return state})
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const history = useHistory();

  const [id, setId] = useState('')
  const [pw, setPw] = useState('')


  //input data 변화시 value값 변경하여 useState
  const chgId = (e) => {
    setId(e.target.value)
  }

  const chgPw = (e) => {
    setPw(e.target.value)
  }

  //login버튼 클릭
  const chkValidation = () => {
    //validation체크
    if(id ==="" || pw === "") {
      alert("이메일과 비밀번호를 입력해주세요");
      return;
    }
    // dispatchEvent()
    callLogin();
  };

  // const 꺼내온거 = useSelector((state)=> state);
  // const test = () => {
  //   console.log(꺼내온거)
  //   alert(꺼내온거);
  // }

  const callLogin = () => {
    let body = {email : id, password : pw};
    axios.post("/v1/user/signIn", body)
    .then(res => {
      if(res.status===200){
        console.log("res", res);
        
        // UserDataAction.modifyUserData({
        //   name,
        //   job,
        //   email,
        //   phone
        // })

        UserDataAction.initUserData()
        const result = res.data.data;
        UserDataAction.login({
          token : result.token,
          email : result.email,
          authenticated : result.result
        })

        console.log("userData", userData);

        //로컬스토리지 저장(새로고침 초기화x)
        localStorage.clear()
        localStorage.setItem('email', res.data.data.email)
        localStorage.setItem('token', res.data.data.token)
        // window.location.replace('/')

        alert('로그인 성공');
        // dispatch({type:'SET_TOKEN', token : res.data.data.token, result : true});
      }else{
        alert("성공예외" + res.status);
        console.log(res);
      }
    }).catch(err => {
      alert("로그인실패" + err);
    });
  };

  
  const clickJoin = (e) => {
    history.push("/admin/join")
  }

  // 좋아요 테스트
  let [like, chgLike] = useState(0);
  const clickLike = () => {
    chgLike(like+1);
  }
  const userData = useSelector(store => store.userData)
  //페이지 렌더링 후 가장 처음 호출되는 함수
  useEffect(() => {
    console.log("state ", state.userData);
    //store 데이터 가져오기
    console.log("userData", userData);
    if(localStorage.getItem("token")!=null){
    // if(userData.token!='') {
      // alert("이미 로그인 상태입니다.");
      history.push("/")
    }
  })

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="5">
            <Card>
              <CardHeader>
                <h5 className="title">로그인</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="10">
                      <FormGroup>
                        <Input
                          defaultValue=""
                          placeholder="아이디"
                          type="text"
                          onChange={chgId}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="10">
                      <FormGroup>
                        <Input
                          defaultValue=""
                          placeholder="비밀번호"
                          type="password"
                          onChange={chgPw}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <FormGroup check>
                    <Label check>
                    <span>아이디 저장</span>
                      <Input type="checkbox" />
                      <span className="form-check-sign" />
                    </Label>
                  </FormGroup>

                  <br />
                  {/* 🖤🩷 */}
                  {/* 좋아요 테스트 */}
                  <span onClick={clickLike}>🖤</span> {like}  <br />
                  
                  <Button variant="info" onClick={chkValidation} >로그인</Button>
                  <Button variant="info" onClick={clickJoin}>회원가입</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Login;
