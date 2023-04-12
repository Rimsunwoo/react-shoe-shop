import "./App.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import data from "./data.js";
import Detail from "./Components/Detail";
import Cart from "./Components/Cart";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Route,
  Routes,
  Link,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";

function App() {
  let [productData, setProductData] = useState(data);
  let [moreData, setMoreData] = useState(2);
  let navigate = useNavigate();
  useEffect(() => {
    let watched = localStorage.getItem("watched");
    if (watched == null) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);
  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand style={{ fontWeight: "bold" }}>SHOE SHOP</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>

            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>

            <Nav.Link
              onClick={() => {
                navigate("/event");
              }}
            >
              Event
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <Main
              productData={productData}
              setProductData={setProductData}
              moreData={[moreData, setMoreData]}
            ></Main>
          }
        />
        <Route
          path="/detail/:id"
          element={<Detail productData={productData}></Detail>}
        />
        <Route path="/event" element={<Event></Event>}>
          <Route path="one" element={<h3>첫 주문시 양배추즙 서비스</h3>} />
          <Route path="two" element={<h3>생일기념 쿠폰받기</h3>} />
        </Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
      </Routes>
    </div>
  );
}

function Card(props) {
  let navigate = useNavigate();
  return (
    <Col className="col-md-4">
      <img
        src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"}
        width="50%"
        onClick={() => {
          navigate(`/detail/${props.productData.id}`);
        }}
      />
      <h4>{props.productData.title}</h4>
      <p>${props.productData.price}</p>
    </Col>
  );
}

function Main(props) {
  return (
    <>
      <div className="main-bg"></div>
      <Row>
        {props.productData.map(function (a, i) {
          return (
            <Card productData={props.productData[i]} i={i + 1} key={i}></Card>
          );
        })}
      </Row>
      <button
        onClick={() => {
          axios
            .get(
              `https://codingapple1.github.io/shop/data${props.moreData[0]}.json`
            )
            .then((res) => {
              let atp = [...props.productData];
              let arr = atp.concat(res.data);
              props.setProductData(arr);
              props.moreData[1](props.moreData[0] + 1);
            })
            .catch((err) => {
              alert("oops");
            });
        }}
      >
        더보기
      </button>
    </>
  );
}

function Event(props) {
  return (
    <div>
      <h1>오늘의 이벤트</h1>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
