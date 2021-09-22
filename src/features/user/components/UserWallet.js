import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorToast, setSuccessToast } from "../../../slices/toastSlice";
import { selectUser } from "../../../slices/userSlice";
import CreditCard from "../../shared/components/CreditCard";
import UserAddCreditCard from "./UserAddCreditCard";
import UserCreditCardsList from "./UserCreditCardsList";

function UserWallet() {
  const [creditCards, setCreditCards] = useState([]);
  const [view, setView] = useState("list");
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const getCreditCards = async () => {
    let res = await axios.get(`http://localhost:8080/credit-cards/${user._id}`);
    setCreditCards(res.data);
  };

  const handleViewPayments = () => {
    const result = window.confirm(
      "You have not completed the process. Are you sure you want to return to the list view?"
    );

    if (result) {
      setView("list");
    }
  };

  const postPaymentMethod = async (data) => {
    try {
      let response = await axios.post(
        `http://localhost:8080/credit-cards/${user._id}`,
        data
      );
      setView("list");
      dispatch(setSuccessToast(response.data.message));
    } catch (error) {
      dispatch(setErrorToast(error.message));
    }
  };

  useEffect(() => {
    if (user._id) getCreditCards();
  }, [user]);

  return (
    <div className="container">
      <div className="d-flex flex-column mt-5 justify-content-between">
        <div className=" border-bottom pb-3 d-flex mb-2 align-items-center justify-content-between">
          <div className="d-flex">
            <input
              class="form-control"
              name="amount"
              type="number"
              min="50"
              max="500"
              step="20"
              id="ap-title"
              placeholder="Amount you want to deposit"
              value={50}
              style={{ width: "250px" }}
            />
            <button
              class="btn btn-primary px-3 px-sm-4"
              type="button"
              // disabled={!selected}
              style={{ marginLeft: "20px" }}
            >
              Deposit
            </button>
          </div>
          <div>
            <i className="fi-wallet opacity-60 me-2"></i>
            <span className="ml-5" style={{ fontSize: "22px" }}>
              Wallet: 50$
            </span>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-end mb-3">
            {view === "list" && (
              <button
                class="btn btn-primary"
                type="button"
                onClick={() => setView("add")}
              >
                Add payment
              </button>
            )}
            {view === "add" && (
              <button
                class="btn btn-primary"
                type="button"
                onClick={handleViewPayments}
              >
                View payments
              </button>
            )}
          </div>
          {view === "list" && <UserCreditCardsList list={creditCards} />}
          {view === "add" && (
            <UserAddCreditCard handleAddPaymentMethod={postPaymentMethod} />
          )}
        </div>
      </div>
    </div>
  );
}

export default UserWallet;
