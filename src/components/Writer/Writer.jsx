import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DropDown from "components/Dropdown/Dropdown";

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

function writer(props) {
    const history = useHistory();
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
    
    const [mainData, setMainData] = useState("사진");

    let mainDropData = [
      {val : 'PHOTO', name : '사진'},
      {val : 'MODEL', name : '모델'},
      {val : 'EDIT', name : '편집'},
      {val : 'PAINTING', name : '그림'}
    ];

    let workDropData = [
      {val : 'WEDDOING', name : '셀프웨딩'},
      {val : 'BODY', name : '바디프로필'},
      {val : 'PERSONAL', name : '개인촬영'}
    ];


    const [board, setBoard] = useState({
        title: '',
        createdBy: '',
        content: '',
        mainType : '',
        workType : '',
    });

    const { title, createdBy, content, mainType, workType } = board; //비구조화 할당

    //데이터 변화시 확인
    useEffect(() => {
      if(localStorage.getItem("token")==null){
        alert("로그인 해주세요.")
        history.push("/admin/login")
      }
      console.log("board" , board); // 변경된 board 값 확인
    }, [board]);

    const onChange = (e) => {
        const {value, title} = e.target;
        setBoard({ //...은 카피
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

      const dropdownToggle = (e, type) => {
        if(type == 'main') {
          setDropdownOpen(!dropdownOpen);
        }else{
          setWorkDropdownOpen(!workDropdownOpen);
        }
        
      };

      const setMainDrop = (data) => {
        for(let i=0 ; i< mainDropData.length ; i++){
          if(mainDropData[i].val == data){
            setMainData(mainDropData[i].name);
            //prevBoard : 이전의 board 값
            //데이터 변경 바로확인을 위해 콜백함수 안에 넣어줌
            setBoard(prevBoard => ({
              ...prevBoard,
              mainType: data
            }));
          }
        }
      }


      


      const [isDropdownView, setDropdownView] = useState(false)

      const handleClickContainer = () => {
        setDropdownView(!isDropdownView)
      }
    
      const handleBlurContainer = () => {
        setTimeout(() => {
          setDropdownView(false)
        }, 200);
      }


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
                        <label>글쓴이</label><br/>
                        {/* <label>{localStorage.getItem("nickName")}</label> */}
                        <Input disabled placeholder={localStorage.getItem("nickName")} type="text" />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>카테고리</label>

                        <UncontrolledDropdown>
                        <Dropdown
                        isOpen={dropdownOpen}
                        toggle={(e) => dropdownToggle(e, 'main')}
                        >
                        <DropdownToggle caret nav>
                        <label>{mainData}</label>
                        </DropdownToggle>
                        <DropdownMenu>
                            {mainDropData.map((data)=>{
                              return (
                                // 콜백함수 적용으로 data.val 한개만 넘어가게함
                                // key를 인덱스 사용시 변경될 수 있으니 고유값 세팅
                                <DropdownItem onClick={() => setMainDrop(data.val)} key={data.val} tag="a">{data.name}</DropdownItem>
                              )
                            })}
                        </DropdownMenu>
                        </Dropdown>
                        </UncontrolledDropdown>
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          작업유형
                        </label>
                        <UncontrolledDropdown>
                        <Dropdown
                        isOpen={workDropdownOpen}
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
