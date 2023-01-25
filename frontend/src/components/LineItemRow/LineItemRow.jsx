import React from "react";

const LineItemRow = ({ item, itemCount }) => {
  return (
    <tr className="border">
      <td className="border">{itemCount}</td>
      <td className="border" className="text-left">
        <div className="font-bold">{item.name}</div>
        <div className="make">{item.manufacturer}</div>
        <div className="description">{item.description}</div>
      </td>
      <td className="border">{item.qty}</td>
      <td className="border">{item.uom}</td>
      <td className="border">{item.unit_price}</td>
      <td className="border">{item.qty * item.unit_price}</td>
    </tr>
  );
};

export default LineItemRow;
