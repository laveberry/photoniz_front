import React from "react";

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
  Col
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

function Login() {
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
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button variant="info">로그인</Button>
                  <Button variant="info">회원가입</Button>
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
