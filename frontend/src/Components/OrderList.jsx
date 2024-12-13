import React from "react";

const OrderList = ({ orders, onStatusChange, loading, error }) => {
  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error fetching orders: {error.message}</p>;

  const handleStatusChange = (orderId, newStatus) => {
    if (
      window.confirm(
        `Are you sure you want to change the status to ${newStatus}?`
      )
    ) {
      onStatusChange(orderId, newStatus);
    }
  };
  return (
    <div>
      <h2>Order List</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user.name}</td>
              <td>{order.status}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
