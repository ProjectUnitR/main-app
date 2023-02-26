import React from "react";

const SelectInput = ({ state = -1, title, options, reference = null, handler = null, submitted = false }) => {
  return (
    <select disabled={submitted} ref={reference} className="form-control rounded" aria-label="Default select example" value={reference ? null : state} onChange={handler}>
      <option value={-1} hidden disabled>
        Select {title}
      </option>
      {options.map((option) => (
        <option key={option._id} value={option._id}>
          {option.title}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
