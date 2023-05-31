import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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

function Join() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

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

  const clickJoin = () => {
    alert('가입');
    // const request = axios.post('/signUp', data)
    // .then(res --> alert(res.data));
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await new Promise((r) => setTimeout(r, 1000));
        alert(JSON.stringify(data));
      })}
    >
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col className="pr-1" >
            <Card>
              <CardHeader>
                <h5 className="title">회원가입</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>이름</label>
                        <Input
                          defaultValue=""
                          placeholder="name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="8">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email
                        </label>
                        <Input placeholder="Email" type="email" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>비밀번호</label>
                        <Input
                          defaultValue=""
                          placeholder="password"
                          type="password"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>비밀번호 확인</label>
                        <Input
                          defaultValue=""
                          placeholder="password"
                          type="password"
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
                          type="password"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="2">
                      <FormGroup>
                        <label></label>
                      <a
                        // href="javascript:alert('구현예정')"
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
                        href="javascript:alert('구현예정')"
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
                </Form>
                {/* <Button variant="info" onClick={clickJoin}>회원가입</Button> */}
                <button type="submit"  className="btn btn-primary btn-block btn-round">
                  회원가입 
                </button>
              </CardBody>
              
            </Card>
          </Col>
         
          
        </Row>
        
      </div>

    </form>
  );
}

export default Join;