import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminOrders,
  updateOrderStatus,
} from "../redux/actions/adminActions";
import OrderList from "../components/OrderList";

const ManageOrders = () => {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector(
    (state) => state.adminOrderList
  );

  useEffect(() => {
    dispatch(getAdminOrders()); // Fetch orders when component mounts
  }, [dispatch]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus(orderId, status));
  };

  return (
    <div>
      <h1>Manage Orders</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <OrderList orders={orders} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default ManageOrders;
