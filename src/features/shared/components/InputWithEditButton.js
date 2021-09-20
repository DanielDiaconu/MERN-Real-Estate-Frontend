import React, { useEffect, useState } from "react";

function InputWithEditButton({ label, name, value, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState("");

  const onSaveButtonClick = () => {
    onSave({
      name,
      value: editedValue,
    });
    setIsEditing(false);
  };

  useEffect(() => {
    setEditedValue(value);
  }, [value]);

  return (
    <>
      <div className="border-bottom pb-3 mb-3">
        <div className="d-flex align-items-center justify-content-between">
          <div className="pe-2">
            <label className="form-label fw-bold"> {label}</label>
            {!isEditing ? (
              <div className="my-2">{value}</div>
            ) : (
              <div className="d-flex align-items-center">
                <input
                  className="form-control"
                  onChange={(e) => setEditedValue(e.target.value)}
                  type="text"
                  value={editedValue}
                />
                <button
                  className="btn btn-primary btn-sm ms-2"
                  onClick={onSaveButtonClick}
                >
                  Save
                </button>
              </div>
            )}
          </div>
          <div className="me-n3" title="" aria-label="Edit">
            <a className="nav-link py-0">
              <i
                className="fi-edit"
                onClick={() => setIsEditing((prev) => !prev)}
              ></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default InputWithEditButton;
