import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store";

function Detail(props) {
  let [discount, setDiscount] = useState(true);
  let { id } = useParams();
  let item = props.productData.filter((a) => a.id == id)[0];
  let [tabs, setTabs] = useState(0);
  let [fade, setFade] = useState("");
  let dispatch = useDispatch();
  let cart = useSelector((state) => {
    return state.cartData;
  });
  useEffect(() => {
    let a = setTimeout(() => {
      setDiscount(false);
      return () => {
        clearTimeout(a);
        setFade("");
      };
    }, 2000);
    let watched = JSON.parse(localStorage.getItem("watched"));
    let locate = watched.indexOf(id);
    if (locate == -1) {
      watched.unshift(id);
    }
    //있는데 맨 앞에 있는경우
    else if (locate != 0) {
      watched.splice(locate, 1);
      watched.unshift(id);
    }
    //있는데 맨 앞이 아닌경우
    localStorage.setItem("watched", JSON.stringify(watched));
    setFade("fadeAfter");
  });
  return (
    <div className={`container start ${fade}`}>
      {discount ? (
        <div className="alert alert-warning">2초안에 사면 할인</div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src={"https://codingapple1.github.io/shop/shoes" + ++id + ".jpg"}
            width="100%"
          />
        </div>
        <div className="col-md-6 pt-5">
          <h4 className="pt-5">{item.title}</h4>
          <p>{item.content}</p>
          <p>{item.price}원</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              let already;
              cart.forEach((a) => {
                if (a.id == item.id) {
                  return (already = false);
                }
              });

              if (already == false) {
                alert("이미 장바구니에 있어요");
              } else {
                dispatch(add({ id: item.id, name: item.title, count: 1 }));
                alert("장바구니에 담았어요");
              }
            }}
          >
            장바구니에 담기
          </button>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link onClick={() => setTabs(0)}>0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTabs(1)} eventKey="link-1">
            1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTabs(2)} eventKey="link-2">
            2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Tabs tabs={tabs}></Tabs>
    </div>
  );
}

function Tabs({ tabs }) {
  return [<div>0</div>, <div>1</div>, <div>2</div>][tabs];
}

export default Detail;
