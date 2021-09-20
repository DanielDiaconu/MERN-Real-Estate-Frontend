import React, { useEffect, useState } from "react";

function AddPropertyPets({ onPetsChange }) {
  const [pets, setPets] = useState({
    catsAllowed: false,
    dogsAllowed: false,
  });

  const onPetSelect = (e) => {
    setPets({ ...pets, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    onPetsChange(pets);
  }, [pets]);

  return (
    <>
      <div className="mb-4">
        <label className="form-label d-block fw-bold mb-2 pb-1">Pets</label>
        <div className="row">
          <div className="col-sm-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="allow-cats"
                name="catsAllowed"
                value={pets.catsAllowed}
                onChange={onPetSelect}
              />
              <label className="form-check-label" htmlFor="allow-cats">
                Cats allowed
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="allow-dogs"
                name="dogsAllowed"
                value={pets.dogsAllowed}
                onChange={onPetSelect}
              />
              <label className="form-check-label" htmlFor="allow-dogs">
                Dogs allowed
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPropertyPets;
