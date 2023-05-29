import React, { useState, useEffect } from "react";
import axios from "axios";

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
import { useNavigate } from "react-router-dom";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

function Login() {

  // const navigate = useNavigate();

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

  const callLogin = () => {
    let body = {email : id, password : pw};
    axios.post("/v1/user/signUp", body)
    .then(res --> alert(res))
    .catch(err --> alert("오류" + err));
  };


  const clickJoin = (e) => {
    window.location.href = "/admin/join"
  }

  // 좋아요 테스트
  let [like, chgLike] = useState(0);
  const clickLike = () => {
    chgLike(like+1);
  }

  //페이지 렌더링 후 가장 처음 호출되는 함수
  useEffect(() => {
    // axios.get()
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
                          type="text"
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
