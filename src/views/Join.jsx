import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
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

function Join(props
  // {
  // onSubmit = async (data) => {
  //   alert(1111);
  //   await new Promise((r) => setTimeout(r, 1000));
  //   // alert("온서브밋");
  //   console.log(JSON.stringify(data));

  //   // const request = axios.post('/signUp', data)
  //   // .then(res --> alert(res.data));
  // }
// }
) {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ mode: "onChange" });

  const [role, setRole] = useState([]);
  const roleList = [
    {name : '개인',
    value : 1},
    {name : '사진작가',
    value :2}];

  const chgRole = (e) => {
    console.log(e.target.value)
    alert(e.target.value)
    setRole(e.target.value);
  }

  const onSubmit = async (data) => {
    // alert(1111);
    // alert(data.password);
    // await new Promise((r) => setTimeout(r, 1000));
    // // alert("온서브밋");
    // console.log(JSON.stringify(data));

    // const request = axios.post('/signUp', data)
    // .then(res --> alert(res.data));

    try {
      alert(data.password);
      await new Promise((r) => setTimeout(r, 1000));
      console.log(JSON.stringify(data));

      // await axios.post('/signUp', data);
      alert('회원가입이 성공적으로 완료되었습니다.');
    } catch (error) {
      console.error(error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  }

  const onChgPw = (e) => {
    console.log("1111", e);
    watch(e);
  }


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
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>이름</label>
                        <Input
                          defaultValue=""
                          placeholder="name"
                          type="text"
                          // {...register('nickname', {    
                          //   required: '닉네임을 입력해주세요.',
                          //   // required: true,
                          //   // boolean값도 가능하지만 문자열 값을 주면, input의 value가 없을 때 해당 문자열이 errors 객체로 반환되어 에러 메세지로 표시할 수 있다.
                          //   minLength: { // value의 최소 길이
                          //     value: 3,
                          //     message: '3글자 이상 입력해주세요.', // 에러 메세지
                          //   },
                          //   pattern: { // input의 정규식 패턴
                          //     value: /^[A-za-z0-9가-힣]{3,10}$/,
                          //     message: '가능한 문자: 영문 대소문자, 글자 단위 한글, 숫자', // 에러 메세지
                          //   },
                          // })}
                        />
                        {errors?.nickname?.message}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="8">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email
                        </label>
                        <Input id="email" placeholder="Email" type="email"
                          {...register("email")}
                        />
                        {errors.email && <small role="alert">{errors.email.message}</small>}
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
                          {...register("password", {required: true})}
                          onChange={onChgPw()}
                          
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>비밀번호 확인</label>
                        <Input
                          placeholder="password"
                          type="password"
                          {...register("pwConfirm", {required: true})}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>전화번호</label>
                        <Input
                          defaultValue=""
                          placeholder="phoneNumber"
                          type="tel"
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
                          defaultValue=""
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
                <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-block btn-round">
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