import React,{useState, useEffect} from "react";
import Paging from "components/Paging/Paging";
import PhotoTable from "components/Table/PhotoTable";

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

import { thead, tbody } from "variables/photo";



function Photo() {

  const [propData, setPropData] = useState({
    type : 'PHOTO',
    // tbody : tbody,
    thead : thead,
    count : 0,
    postPerPage : 10,
    mainType : '',
    workType : ''
  })

  //페이징 시작
  // const [products, setProducts] = useState([tbody]);  // 리스트에 나타낼 아이템들
  // const [count, setCount] = useState(0); // 아이템 총 개수
  // const [currentPage, setCurrentPage] = useState(1); // 현재 페이지. default 값으로 1
  // const [postPerPage] = useState(5); // 한 페이지에 보여질 아이템 수 
  // const [indexOfLastPost, setIndexOfLastPost] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
  // const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
  // const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들

  // useEffect(() => {
  //   // axios
  //   //   .get("/product-sale-join")
  //   //   .then((res) => {
  //   //     setProducts(res.data);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log("error", error);
  //   //   });
  //   setCount(products.length);
  //   setIndexOfLastPost(currentPage * postPerPage);
  //   setIndexOfFirstPost(indexOfLastPost - postPerPage);
  //   setCurrentPosts(products.slice(indexOfFirstPost, indexOfLastPost));
  // }, [currentPage, indexOfLastPost, indexOfFirstPost, products, postPerPage]);

    //props한번에 전달
    // const propData = {
    //   tbody : tbody,
    //   thead : thead,
    //   count : 0,
    //   postPerPage : 10,
    //   mainType : 'PHOTO'
    // }

  const setPage = (error) => {
    setCurrentPage(error);
  };
  //페이징 끝
  
  return (
    // <PhotoTable count={count} tbody={tbody} thead={thead} postPerPage={postPerPage}/>
    <PhotoTable {...propData}/>
  );
}

export default Photo;
