import axios from "axios";
import { set } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorToast, setSuccessToast } from "../../../slices/toastSlice";
import { selectUser, updateUserFunds } from "../../../slices/userSlice";
import UserAddCreditCard from "./UserAddCreditCard";
import UserCreditCardsList from "./UserCreditCardsList";

function UserWallet() {
  const [creditCards, setCreditCards] = useState([]);
  const [view, setView] = useState("list");
  const [selectedCard, setSelectedCard] = useState(null);
  const [depositAmount, setDepositAmount] = useState(0);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const getCreditCards = async () => {
    let res = await axios.get(
      `https://mern-online-properties.herokuapp.com/credit-cards/${user._id}`
    );
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

  const postPaymentMethod = async (payload) => {
    try {
      let res = await axios.post(
        `https://mern-online-properties.herokuapp.com/credit-cards/${user._id}`,
        payload
      );
      setView("list");
      setCreditCards([...creditCards, res.data]);
    } catch (error) {
      dispatch(setErrorToast(error.message));
    }
  };

  const deletePaymentMethod = async (id) => {
    try {
      let response = await axios.delete(
        `https://mern-online-properties.herokuapp.com/credit-cards/${id}`
      );
      dispatch(setSuccessToast(response.data.message));
      setCreditCards(creditCards.filter((card) => card._id !== id));
      if (selectedCard && selectedCard.id === id) {
        setSelectedCard(null);
      }
    } catch (error) {
      dispatch(setErrorToast(error.message));
    }
  };

  const onFundsDeposit = () => {
    if (depositAmount <= selectedCard.funds) {
      setSelectedCard({
        ...selectedCard,
        funds: selectedCard.funds - depositAmount,
      });
      dispatch(
        updateUserFunds({
          amount: depositAmount,
          id: user._id,
          cardId: selectedCard._id,
        })
      );
      setDepositAmount(0);
    } else {
      dispatch(
        setErrorToast("Not enough funds on your current payment method!")
      );
    }
    setSelectedCard(null);
  };

  const selectPaymentMethod = (card) => {
    if (!selectedCard) {
      setSelectedCard(card);
    } else if (selectedCard._id === card._id) {
      setSelectedCard(null);
    } else {
      setSelectedCard(card);
    }
  };

  useEffect(() => {
    if (user._id) getCreditCards();
  }, [user]);

  return (
    <div className="container">
      <div className="d-flex flex-column mt-5 justify-content-between">
        <div className=" border-bottom pb-3 d-flex mb-2 align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div>
              <input
                className="form-control mt-4"
                name="amount"
                type="number"
                value={depositAmount}
                id="ap-title"
                placeholder="Amount you want to deposit"
                onChange={(e) => setDepositAmount(parseInt(e.target.value))}
                style={{ width: "250px" }}
              />
              <span className="text-muted" style={{ fontSize: "12px" }}>
                Please select a payment method from below!
              </span>
            </div>
            <button
              className="btn btn-primary px-3 px-sm-4"
              type="button"
              disabled={!selectedCard || view === "add" || !depositAmount}
              onClick={onFundsDeposit}
              style={{ marginLeft: "20px" }}
            >
              Deposit
            </button>
          </div>

          <div>
            <i className="fi-wallet opacity-60 me-2 mb-1"></i>
            <span className="ml-5" style={{ fontSize: "22px" }}>
              Wallet: {user.funds}$
            </span>
          </div>
        </div>

        <div>
          <div className="d-flex justify-content-end mb-3">
            {view === "list" && (
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => setView("add")}
              >
                Add payment
              </button>
            )}
            {view === "add" && (
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleViewPayments}
              >
                View payments
              </button>
            )}
          </div>
          {view === "list" && (
            <UserCreditCardsList
              selectedPaymentMethod={selectedCard}
              list={creditCards}
              handlePaymentMethodRemoval={deletePaymentMethod}
              handlePaymentMethodSelection={selectPaymentMethod}
            />
          )}
          {view === "add" && (
            <UserAddCreditCard handleAddPaymentMethod={postPaymentMethod} />
          )}
        </div>
      </div>
    </div>
  );
}

export default UserWallet;
