import React from "react";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>

                {order.isPaid ? (
                  <td className="text-success">
                    {order.paidAt.substring(0, 10)}
                  </td>
                ) : (
                  <td className="text-danger">Not Paid</td>
                )}

                {order.isDelivered ? (
                  <td className="text-success">
                    {order.deliveredAt.substring(0, 10)}
                  </td>
                ) : (
                  <td className="text-danger">Not Delivered</td>
                )}

                <td>
                  <Button
                    as={Link}
                    to={`/order/${order._id}`}
                    className="btn-sm"
                    variant="light"
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
