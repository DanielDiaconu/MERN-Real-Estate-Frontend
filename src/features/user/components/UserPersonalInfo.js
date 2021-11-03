import { isEqual } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser, updateUser } from "../../../slices/userSlice";
import DropzoneWithPreview from "../../shared/components/DropzoneWithPreview";
import InputWithEditButton from "../../shared/components/InputWithEditButton";

const initObject = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  bio: "",
  avatar: "",
};

function UserPersonalInfo() {
  const user = useSelector(selectUser);
  const [info, setInfo] = useState(initObject);
  const [progress, setProgress] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();

  const onPersonalInfoChange = ({ name, value }) => {
    setInfo({ ...info, [name]: value });
  };

  const onAvatarChange = (file) => {
    setInfo({ ...info, avatar: file[0] });
  };

  const onUserUpdate = () => {
    const data = new FormData();

    for (const [key, value] of Object.entries(info)) {
      if (key !== "_id") {
        data.append(key, value);
      }
    }
    dispatch(updateUser({ id: user._id, data }));
  };

  const calculateProgress = () => {
    let sum = 0;
    for (let value of Object.values(info)) {
      if (value) {
        sum += 16.66;
      }
    }
    setProgress(sum);
  };

  const isSaveButtonDisabled = () => {
    return (
      info.fullName === user.fullName &&
      info.email === user.email &&
      info.phone === user.phone &&
      info.address === user.address &&
      info.bio === user.bio &&
      info.avatar === user.avatar
    );
  };

  useEffect(() => {
    if (user._id) {
      setInfo({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        bio: user.bio,
        avatar: user.avatar,
      });
    }
  }, [user]);

  useEffect(() => {
    calculateProgress();
  }, [info]);

  if (!user._id) {
    history.push("/");
  }

  return (
    <>
      <h1 className="h2">Personal Info</h1>

      <div className="progress mb-3">
        <div
          className={`progress-bar progress-bar-striped ${
            progress > 99 ? "bg-success" : "bg-warning"
          } progress-bar-animated`}
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <label className="form-label pt-2" htmlFor="account-bio">
        Short bio
      </label>
      <div className="row pb-2">
        <div className="col-12  mb-4">
          <textarea
            className="form-control"
            name="bio"
            onChange={(e) => setInfo({ ...info, bio: e.target.value })}
            value={info.bio}
            id="account-bio"
            rows="6"
            placeholder="Write your bio here. It will be displayed on your public profile."
          ></textarea>
        </div>
        <div className="col-12  mb-4">
          <DropzoneWithPreview
            title="Avatar"
            multiple={false}
            maxFiles={1}
            onFilesDrop={onAvatarChange}
          />
        </div>
      </div>
      <div className="border rounded-3 p-3 mb-4" id="personal-info">
        <InputWithEditButton
          label="Full Name"
          value={info.fullName}
          name="fullName"
          onSave={onPersonalInfoChange}
        />
        <InputWithEditButton
          label="Email"
          value={info.email}
          name="email"
          onSave={onPersonalInfoChange}
        />
        <InputWithEditButton
          label="Phone"
          value={info.phone}
          name="phone"
          onSave={onPersonalInfoChange}
        />
        <InputWithEditButton
          label="Address"
          value={info.address}
          name="address"
          onSave={onPersonalInfoChange}
        />
      </div>
      <div className="d-flex align-items-center justify-content-between border-top mt-4 pt-4 pb-1">
        <button
          className="btn btn-primary px-3 px-sm-4"
          type="button"
          onClick={onUserUpdate}
          disabled={isSaveButtonDisabled()}
          title={"Complete all the fields above for time!"}
        >
          Save changes
        </button>
      </div>
    </>
  );
}

export default UserPersonalInfo;
