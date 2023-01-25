import React from "react";
import LineItemRow from "../LineItemRow";

const QuotationTable = ({ lineItems }) => {
  const itemRow = lineItems.map((item, index) => (
    <LineItemRow key={index} item={item} itemCount={index++} />
  ));
  return (
    <table className="table-auto border border-black border-collapse">
      <thead className="border">
        <th className="border">SN</th>
        <th className="border">Description</th>
        <th className="border">Qty</th>
        <th className="border">UOM</th>
        <th className="border">Unit Price</th>
        <th className="border">Total Amount</th>
      </thead>
      <tbody className="border">{itemRow}</tbody>
    </table>
  );
};

export default QuotationTable;
