import React from "react";

function CreditCard({
  card,
  handlePaymentMethodRemoval,
  view,
  handlePaymentMethodSelection,
  isSelected,
}) {
  const onCreditCardSelect = () => {
    if (view === "list") {
      handlePaymentMethodSelection(card);
    }
  };

  const onCreditCardDelete = (e) => {
    e.stopPropagation();
    handlePaymentMethodRemoval(card._id);
  };

  return (
    <>
      <div
        className={`credit-card-container cursor-pointer ${
          isSelected && isSelected?._id === card?._id ? "selected" : ""
        } mb-3`}
        onClick={onCreditCardSelect}
      >
        {view === "list" && (
          <i
            className="fas fa-times"
            title="Delete Card"
            onClick={onCreditCardDelete}
          ></i>
        )}
        <div className="credit-card-content ">
          <div className="top-section">
            <i>visa</i>
            <span>Funds: {card?.funds}</span>
          </div>
          <div className="mid-section">
            <span className="card-number-label">Card Number</span>
            <span className="card-number-value">{card?.number}</span>
          </div>
          <div className="bottom-section">
            <span className="card-number-label">Holders Name</span>
            <span className="card-number-value">{card?.name}</span>
          </div>
          <div className="end-section">
            <div className="expires">
              <span className="card-number-label">Expires</span>
              <span className="card-number-value">{`${card?.month} / ${card?.year}`}</span>
            </div>
            <div className="cvv">
              <span className="card-number-label">CVV</span>
              <span className="card-number-value">{card?.cvv}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreditCard;
