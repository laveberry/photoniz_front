import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

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
} from "reactstrap";

import PanelHeader from "components/PanelHeader/PanelHeader.js";
import axios from "axios";

function PhotoDetail(props) {
    const history = useHistory();
    const {idx} = useParams();
    // const [writer, setWriter] = useState("");

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
        writer: '',
        title: '',
        content: '',
        mainType : '',
        workType : '',
    });

    const { writer, title, content,  mainType, workType } = board; //비구조화 할당

    useEffect(() => {
        getBoardDetail();
    },[]);


    const getBoardDetail = async () => {
        await (await axios.get(`/v1/board/detail/${idx}`)
        .then(res =>{
            console.log(res);    
            const data = res.data.data;        
            setBoard({
                ...res.data.data,
                mainType : setMainDrop(res.data.data.mainType),
                workType : setWorkDrop(res.data.data.workType),
                writer : res.data.data.user.nickName
            });
            // setWriter(res.data.data.user.nickName);
        }).catch(err=>{
            alert(err);
        }));
    }

      const setMainDrop = (data) => {
        for(let i=0 ; i< mainDropData.length ; i++){
          if(mainDropData[i].val == data){
            return mainDropData[i].name;
          }
        }
      }
      
      const setWorkDrop = (data) => {
        for(let i=0 ; i< workDropData.length ; i++){
          if(workDropData[i].val == data){
            return workDropData[i].name;
          }
        }
      }

      const backToList = () => {
        // navigate('/board');
        history.push('/photoniz/photo')
      };

      const goRegister = () => {
        alert("신청");
      };

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h5 className="title">상세보기</h5>
              </CardHeader>
              <CardBody>
                <Form>
                <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>글쓴이</label><br/>
                        <div>{writer}</div>
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>카테고리</label>
                        <div>{mainType}</div>
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          작업유형
                        </label>
                        <div>{workType}</div>
                      </FormGroup>
                    </Col>
                  </Row>
                <Row>
                    <Col>
                      <FormGroup>
                        <label>제목</label>
                        <div>{title}</div>
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
                        />
                        {/* <div>{content}</div> */}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                    </Col>
                    <Col className="px-1" md="2">
                      <FormGroup>
                        <button type="button" className="btn btn-warning btn-block btn-round" onClick={backToList}>이전</button>
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="2">
                      <FormGroup>
                        <button type="button" className="btn btn-block btn-round btn-info" onClick={goRegister}>신청하기</button>
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

export default PhotoDetail;