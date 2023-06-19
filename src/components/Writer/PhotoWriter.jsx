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
import axios from "axios";

function PhotoWriter(props) {
    const history = useHistory();
    let errData = "";
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
    
    const [mainData, setMainData] = useState("선택해주세요.");
    const [workData, setWorkData] = useState("선택해주세요.");

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
        ...localStorage,
        title: '',
        content: '',
        mainType : '',
        workType : '',
    });

    const { title, content, mainType, workType } = board; //비구조화 할당

    //데이터 변화시 확인
    useEffect(() => {
      if(localStorage.getItem("token")==null){
        alert("로그인 해주세요.")
        history.push("/photoniz/login")
      }
      console.log("board" , board); // 변경된 board 값 확인
    }, [board]);

    // 타이틀, 내용 변경시
    const onChange = (e) => {
        const {name, value} = e.target;
        setBoard({ //...은 카피
            ...board,
            [name]: value
        });
    }

    const backToList = () => {
      // navigate('/board');
      history.push('/photoniz/photo')
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
      
      const setWorkDrop = (data) => {
        for(let i=0 ; i< workDropData.length ; i++){
          if(workDropData[i].val == data){
            setWorkData(workDropData[i].name);
            setBoard(prevBoard => ({
              ...prevBoard,
              workType: data
            }));
          }
        }
      }

      //유효성 체크
      const chkValidation = () => {
        if(board.mainType==''){
          errData = '카테고리를 선택해주세요.';
          return false;
        }else if(board.workType==''){
          errData = '작업유형을 선택해주세요';
          return false;
        }else if(board.title == '') {
          errData = '제목을 입력해주세요.';
          return false;
        }else if(board.content == ''){
          errData = '내용을 입력해주세요.';
          return false;
        }
        return true;
      }
      // const [isDropdownView, setDropdownView] = useState(false)

      // const handleClickContainer = () => {
      //   setDropdownView(!isDropdownView)
      // }
    
      // const handleBlurContainer = () => {
      //   setTimeout(() => {
      //     setDropdownView(false)
      //   }, 200);
      // }

    //저장
    const saveBoard = async () => {

      if(chkValidation()==false){
        alert(errData);
        return;
      }

      await axios(`/v1/photoBoard`, {
        method : 'POST',
        data : board,
        // headers : new Headers()
        headers : {
          // "Content-Type" : "application/json",
          Authorization: localStorage.getItem("token")
        }
      }).then((res)=>{
        console.log("저장 성공결과", res);
        if(res.request.status == 200){
          alert("저장 성공");
          history.push("/photoniz/photo")
        }
      }).catch((err)=>{
        if(err.response.request.status == 401){
          //TODO : 토큰시간만료로 권한오류일때 업뎃 진행
        }
        console.log("err", err);

      })
      // await axios.post(`/v1/photoBoard`, board).then((res) => {
      //   console.log(res);
      //   alert('등록되었습니다.');
      //   history.push("/photoniz/photo")
      // });

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
                                // <DropdownItem onClick={onChange} key={data.val} tag="a" name="mainType" value={data.val}>{data.name}</DropdownItem>
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
                        <label>{workData}</label>
                        </DropdownToggle>
                        <DropdownMenu>
                            {workDropData.map((data)=>{
                              return (
                                <DropdownItem onClick={() => setWorkDrop(data.val)} key={data.val} tag="a">{data.name}</DropdownItem>
                                // <DropdownItem onClick={onChange} key={data.val} tag="a" name="workType" value={data.val}>{data.name}</DropdownItem>
                              )
                            })}
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
                          name="title"
                          onChange={onChange}
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
                          name="content"
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
                        <button type="button" className="btn btn-warning btn-block btn-round" onClick={backToList}>취소</button>
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="2">
                      <FormGroup>
                        <button type="button" className="btn btn-block btn-round btn-info" onClick={saveBoard}>저장</button>
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

export default PhotoWriter;
