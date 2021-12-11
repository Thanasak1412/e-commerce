import { useEffect, useState } from "react";

import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
import { format } from "timeago.js";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/orders");

        if (res.status === 200) {
          const { orders } = res.data;
          setOrders(orders);
        }
      } catch {}
    };
    getOrders();
  }, []);

  const Button = ({ type }) => {
    return <button className={`widgetLgButton ${type}`}>{type}</button>;
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
        </thead>
        {orders.map(({ _id, user, createdAt, total, status }) => (
          <tbody key={_id}>
            <tr className="widgetLgTr">
              <td className="widgetLgUser">
                <span className="widgetLgName">{user}</span>
              </td>
              <td className="widgetLgDate">{format(createdAt)}</td>
              <td className="widgetLgAmount">${total}</td>
              <td className="widgetLgStatus">
                <Button type={status} />
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
