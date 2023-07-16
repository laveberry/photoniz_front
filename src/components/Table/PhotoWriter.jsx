import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import DropDown from "components/Dropdown/Dropdown";
import "./table.css";

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
      {val : 'AUTHOR', name : '사진작가'},
      {val : 'MODEL', name : '모델'},
      {val : 'EDIT', name : '편집'},
      {val : 'PAINTING', name : '그림'}
    ];

    let workDropData = [
      {val : 'WEDDOING', name : '셀프웨딩'},
      {val : 'BODY', name : '바디프로필'},
      {val : 'PERSONAL', name : '개인촬영'}
    ];

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [popupImageUrl, setPopupImageUrl] = useState('');
    const popupRef = useRef();
  
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
      // console.log("board" , board); // 변경된 board 값 확인
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

      const handleFileChange = (event) => {
        const files = event.target.files;
        const fileArray = Array.from(files);
    
        setSelectedFiles([...selectedFiles, ...fileArray]);
    
        const fileUrls = fileArray.map((file) => URL.createObjectURL(file));
        setPreviewUrls([...previewUrls, ...fileUrls]);
      };
    
      const handleUpload = () => {
        // 업로드 로직을 추가예정
        // 선택된 파일(selectedFiles)을 서버로 업로드
    
        // 업로드 후 업로드된 파일을 기존 파일 배열에 추가합니다.
        setUploadedFiles([...uploadedFiles, ...selectedFiles]);
    
        // 선택된 파일 배열과 미리보기 URL 배열을 초기화합니다.
        setSelectedFiles([]);
        setPreviewUrls([]);
      };
    
      const openPopup = (url) => {
        setPopupImageUrl(url);
      };
    
      const closePopup = () => {
        setPopupImageUrl('');
      };
    
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (popupRef.current && !popupRef.current.contains(event.target)) {
            closePopup();
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

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
        }else if(selectedFiles.length == 0){
          errData = '최소 1장 이상의 사진을 업로드 해주세요.';
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

      const formData = new FormData();
      const frmData = {
        "title" : title,
        "content" : content,
        "mainType" : mainType,
        "workType" : workType
      }

      // formData.append("multipartFiles", selectedFiles);

      selectedFiles.forEach(image => {
        formData.append('multipartFiles', image);
      });

      formData.append("data", new Blob([JSON.stringify(frmData)], {
        type: "application/json"
      }));

    console.log("frmData!!!!" , formData.get("data"));

      await axios.post(`/v1/board`, formData, {
        // headers : new Headers()
        headers : {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem("token"),
          charset: 'utf-8'
        }
      }).then((res)=>{
        console.log("저장 성공결과", res);
        if(res.request.status == 200){
          alert("저장 성공");
          history.push("/photoniz/photo")
        }
      }).catch((err)=>{
        if(err.response.request.status == 401){
          alert("토큰 권한 오류")
          //TODO : 토큰시간만료로 권한오류일때 업뎃 진행
        }else{
          alert('기타오류' + err);
        }
        console.log("err", err);

      })
      // await axios.post(`/v1/board`, board).then((res) => {
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
                          placeholder="내용을 작성하세요."
                          rows="5"
                          type="textarea"
                          name="content"
                          value={content}
                          onChange={onChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <div>
                      <input type="file" name="file" multiple accept="image/*" onChange={handleFileChange}  />

                      {previewUrls.length > 0 && (
                        <div>
                          {/* <h3>선택된 파일:</h3>
                          <ul>
                            {selectedFiles.map((file, index) => (
                              <li key={index}>{file.name}</li>
                            ))}
                          </ul> */}

                          {/* 미리보기 */}
                          <div className="preview-container">
                            {previewUrls.map((url, index) => (
                              <img
                                key={index}
                                src={url}
                                alt={`Preview ${index}`}
                                onClick={() => openPopup(url)}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {uploadedFiles.length > 0 && (
                        <div>
                          <h3>업로드된 파일:</h3>
                          <ul>
                            {uploadedFiles.map((file, index) => (
                              <li key={index}>{file.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {popupImageUrl && (
                        <div className="popup-container">
                          <div className="popup-content" ref={popupRef}>
                            <img src={popupImageUrl} alt="Popup" />
                            <button className="popup-close" onClick={closePopup}>
                              X
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
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
