import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { useDispatch } from "react-redux";
import { increase, decrease, remove } from "../store";

function Cart() {
  let dispatch = useDispatch();
  let cartData = useSelector((state) => state.cartData);
  return (
    <div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>수량</th>
            <th>Username</th>
          </tr>
        </thead>
        {cartData.map(function (a, i) {
          return (
            <tbody key={i}>
              <tr>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>
                  <button
                    style={{ marginRight: "10px" }}
                    onClick={() => dispatch(decrease(i))}
                  >
                    -
                  </button>
                  {a.count}
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => dispatch(increase(i))}
                  >
                    +
                  </button>
                </td>
                <td>
                  <button onClick={() => dispatch(remove(i))}>delete</button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
}

export default Cart;
