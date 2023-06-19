import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { registerUser } from '../_actions/user_action.js';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

import PanelHeader from "components/PanelHeader/PanelHeader.js";

function Join(
//   {
//   onSubmit = async (data) => {
//     alert(1111);
//     // await new Promise((r) => setTimeout(r, 1000));
//     // alert("온서브밋");
//     console.log("data임다", JSON.stringify(data));

//     const request = axios.post('/signUp', data)
//     .then(res --> alert(res.data));
//   }
// }
) {

  const dispatch = useDispatch();
  
  const [name, setName] = useState("");
  const [nickName, setNicName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState([]);
  const roleList = [
    {name : '개인',
    value : 1},
    {name : '사진작가',
    value :2}];

  const chgPw = (e) => {
    console.log("패스워드", e);
    setPassword(e.target.value);
  };

  const chgConfirmPw = (e) => {
    setConfirmPassword(e.target.value);
  };

  const chgName = (e) => {
    setName(e.target.value);
  };

  const chgNickName = (e) => {
    setNicName(e.target.value);
  };

  const chgEmail = (e) => {
    setEmail(e.target.value);
  };

  const chgPhone = (e) => {
    setPhone(e.target.value);
  };

  const chgRole = (e) => {
    console.log(e.target.value)
    alert(e.target.value)
    setRole(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(password != confirmPassword){
      return alert("비밀번호가 같지 않습니다.");
    }

    let body = {
      email : email,
      name : name,
      nickName : nickName,
      password : password,
      phone : phone
    }
    const request = axios.post('/v1/user/signUp', body)
    .then(res => {
      console.log(res);
      if(res.status==200){
        alert("회원가입 성공. 다시 로그인 해주세요");
        location.href = "/photoniz/login";
      }else{
        alert("회원가입 예외" + res.status);
      }
    }).catch(err => {
      console.log(err);
      alert(err.response.data.message);
    });

    // dispatch(registerUser(body)).then(response => {
    //   alert("응답");
    //   if(response.payload.success){
    //     alert("성공");

    //   }else{
    //     alert("error");
    //   }
    // })
  }

  // function registerUser(submitData){
  //   const request = axios.post("/api/user/join", submitData)
  //   .then(response => response.data);
  // }

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col className="pr-1" >
            <Card>
              <CardHeader>
                <h5 className="title">회원가입</h5>
              </CardHeader>
              <CardBody>
                <Form onSubmit={onSubmitHandler}>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>이름</label>
                        <Input
                          placeholder="name"
                          type="text"
                          value ={name}
                          onChange={chgName}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>닉네임</label>
                        <Input
                          placeholder="nicName"
                          type="text"
                          value={nickName}
                          onChange={chgNickName}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="8">
                      <FormGroup>
                        {/* <label htmlFor="exampleInputEmail1"> */}
                        <label>
                          Email
                        </label>
                        <Input id="email" placeholder="Email"
                          value={email} onChange={chgEmail}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>비밀번호</label>
                        <Input
                          id="password"
                          placeholder="password"
                          type="password"
                          value={password}
                          onChange={chgPw}      
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>비밀번호 확인</label>
                        <Input
                          placeholder="password"
                          type="password"
                          value={confirmPassword}
                          onChange={chgConfirmPw}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>전화번호</label>
                        <Input
                          placeholder="phoneNumber"
                          type="tel"
                          value={phone}
                          onChange={chgPhone}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="2">
                      <FormGroup>
                        <label></label>
                      <a
                        // href="https://demos.creative-tim.com/now-ui-dashboard-react/#/documentation/tutorial?ref=nudr-fixed-plugin"
                        className="btn btn-block btn-round btn-info"> 
                        번호인증
                      </a>
                        
                      </FormGroup>
                    </Col>
                    
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>주소</label>
                        <Input
                          placeholder="Home Address"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-0" md="2">
                      <FormGroup>
                        <label></label>
                      <a 
                        // href="javascript:alert('구현예정')"
                        className="btn btn-block btn-round btn-info"> 
                        주소찾기
                      </a>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      
                      <FormGroup>
                        <label>역할</label>
                        <div>
                        {/* 라디오 버튼 */}
                        &nbsp;&nbsp;&nbsp;
                        {
                          roleList.map(list =>(
                            <label key={list.name}>
                              <input
                                type="radio"
                                value={list.value}
                                checked={role === `${list.value}`}
                                onChange={chgRole}
                              />
                              &nbsp;
                              {list.name} 
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </label>
                          ))
                        }
                        </div>
                      </FormGroup>
                      
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>약관동의</label>
                        <Input
                          cols="80"
                          defaultValue="약관동의 안하면 가입 못해용"
                          rows="4"
                          disabled
                          type="textarea"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* 중복제출 방지 */}
                <button type="submit" className="btn btn-primary btn-block btn-round">
                  회원가입 
                </button>
                </Form>

              </CardBody>

            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Join;