import React, { useState } from "react";

const EditableCell = ({ value, onCellEdit, onCellSplit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSplitClick = () => {
    onCellSplit();
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    onCellEdit(newValue);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setNewValue(e.target.value);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input type="text" value={newValue} onChange={handleInputChange} />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
          <button onClick={handleSplitClick}>Split</button>
        </>
      ) : (
        <>
          <span>{value}</span>
          <button onClick={handleEditClick}>Edit</button>
        </>
      )}
    </div>
  );
};

export default EditableCell;
