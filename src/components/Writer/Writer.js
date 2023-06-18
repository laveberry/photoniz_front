import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

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
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

function writer() {
    const history = useHistory();
    const [dropdownOpen, setDropdownOpen] = React.useState(false);


    const [board, setBoard] = useState({
        title: '',
        createdBy: '',
        content: '',
    });

    const { title, createdBy, content } = board; //비구조화 할당

    const onChange = (e) => {
        const {value, title} = e.target;
        setBoard({
            ...board,
            [title]: value
        });
    }
    const saveBoard = async () => {
        await axios.post(`//localhost:8080/board`, board).then((res) => {
          alert('등록되었습니다.');
          navigate('/board');
        });
      };
    
      const backToList = () => {
        navigate('/board');
      };

      const dropdownToggle = (e) => {
        console.log(e);
        setDropdownOpen(!dropdownOpen);
      };


  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h5 className="title">글쓰기</h5>
              </CardHeader>
              <CardBody>
                <Form>
                <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>글쓴이</label>
                        <Input disabled placeholder="Email" type="text" />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>메인종류</label>

                        <UncontrolledDropdown>
                        <Dropdown
                        isOpen={dropdownOpen}
                        toggle={(e) => dropdownToggle(e)}
                        >
                        <DropdownToggle caret nav>
                        <label>셀프웨딩</label>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem tag="a" value="PHOTO">사진</DropdownItem>
                            <DropdownItem tag="a" value="PAINT">그림</DropdownItem>
                            <DropdownItem tag="a">마이페이지</DropdownItem>
                            <DropdownItem tag="a">기타</DropdownItem>
                        </DropdownMenu>
                        </Dropdown>
                        </UncontrolledDropdown>

                        
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          작업종류
                        </label>
                        <UncontrolledDropdown>
                        <Dropdown
                        isOpen={dropdownOpen}
                        toggle={(e) => dropdownToggle(e)}
                        >
                        <DropdownToggle caret nav>
                        <label>셀프웨딩</label>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem tag="a" value="PHOTO">사진</DropdownItem>
                            <DropdownItem tag="a" value="PAINT">그림</DropdownItem>
                            <DropdownItem tag="a">마이페이지</DropdownItem>
                            <DropdownItem tag="a">기타</DropdownItem>
                        </DropdownMenu>
                        </Dropdown>
                        </UncontrolledDropdown>
                      </FormGroup>
                    </Col>
                  </Row>
                <Row>
                    <Col>
                      <FormGroup>
                        <label>제목</label>
                        <Input
                          placeholder="제목을 입력하세요."
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label>내용</label>
                        <Input
                          cols="80"
                          placeholder="내용을 입력하세요."
                          rows="10"
                          type="textarea"
                          value={content}
                          onChange={onChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>파일 업로드</label>
                        <Input
                          defaultValue="Mike"
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          defaultValue="Andrew"
                          placeholder="Last Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="4">
                    </Col>
                    <Col className="px-1" md="2">
                      <FormGroup>
                        <button className="btn btn-warning btn-block btn-round" onClick={backToList}>취소</button>
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="2">
                      <FormGroup>
                        <button className="btn btn-block btn-round btn-info" onClick={saveBoard}>저장</button>
                      </FormGroup>
                    </Col>
                  </Row>

                </Form>
                
              </CardBody>
            </Card>

          </Col>
        </Row>
      </div>
    </>
  );
}

export default writer;
