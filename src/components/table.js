import React from "react";

const Table = ({ data }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Fx Rate</th>
          <th scope="col">Override</th>
          <th scope="col">Intial</th>
          <th scope="col">Converted</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, key) => (
          <tr key={key}>
            <th scope="row">{item.fx}</th>
            <td>{item.override ? "true" : "false"}</td>
            <td>{item.intial}</td>
            <td>{item.Converted}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
