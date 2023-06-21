import React,{useState, useEffect} from "react";
import Paging from "components/Paging/Paging";
import axios from 'axios';

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function PhotoTable(props) {
  const [tbody, setTbody] = useState([]);
  //페이징 시작
  const [products, setProducts] = useState([tbody]);  // 리스트에 나타낼 아이템들
  const [count, setCount] = useState(props.count); // 아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지. default 값으로 1
  const [postPerPage] = useState(props.postPerPage); // 한 페이지에 보여질 아이템 수 
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들
  
  //변경 일어날때
  useEffect(() => {
    getBoardList(); // 1) 게시글 목록 조회 함수 호출
    // axios
    //   .get("/product-sale-join")
    //   .then((res) => {
    //     setProducts(res.data);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
    // console.log(props.tbody)
    setCount(products.length);
    setIndexOfLastPost(currentPage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(products.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentPage, indexOfLastPost, indexOfFirstPost, products, postPerPage]);

  //전체 게시글 조회
  const getBoardList = async () => {
    const resp = await (await axios.get(`/v1/photoBoard/list?type=`+props.type)).data;
    setTbody(resp.data.content);
    // setPropData({
    //   ...propData,
    //   tbody : resp.data.content
    // })
    const pngn = resp.pagination;
    console.log(pngn);
  };

  const setPage = (error) => {
    setCurrentPage(error);
  };
  //페이징 끝

  const history = useHistory();
  const [mainType, setMainType] = useState("");
  const onClickWriter = () => {
    history.push("/photoniz/photoWriter")
  }
  
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">사진</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      {props.thead.map((prop, key) => {
                        if (key === props.thead.length - 1)
                          return (
                            <th key={key} className="text-right">
                              {prop}
                            </th>
                          );
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {tbody.map((prop, key) => {
                      return (
                        <tr key={key}>
                          <td key={key} className="">
                            {prop.boardId}
                          </td>
                          <td key={key} className="">
                            {prop.nickName}
                          </td>
                          <td key={key} className="">
                            {prop.title}
                          </td>
                          <td key={key} className="">
                            {prop.location}
                          </td>
                          <td key={key} className="">
                            {prop.boardId}
                          </td>
                          <td key={key} className="text-right">
                            {prop.price}
                          </td>
                          
                          {/* {prop.data.map((prop, key) => {
                            if (key === props.thead.length - 1)
                              return (
                                <td key={key} className="text-right">
                                  {prop}
                                </td>
                              );
                            return <td key={key}>{prop}</td>;
                          })} */}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <button type="submit" onClick={onClickWriter} className="btn btn-primary btn-block btn-info">
                  글쓰기 
                </button>
                <Paging page={currentPage} count={count} setPage={setPage}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default PhotoTable;
