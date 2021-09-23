import React from "react";
import CreditCard from "../../shared/components/CreditCard";

function UserCreditCardsList({
  list,
  handlePaymentMethodRemoval,
  selectedPaymentMethod,
  handlePaymentMethodSelection,
}) {
  return (
    <>
      <h3>Select a payment method</h3>
      <div className="d-flex justify-content-between flex-wrap">
        {list?.map((card, i) => (
          <div key={i}>
            <CreditCard
              card={card}
              view="list"
              handlePaymentMethodRemoval={handlePaymentMethodRemoval}
              handlePaymentMethodSelection={handlePaymentMethodSelection}
              isSelected={selectedPaymentMethod}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default UserCreditCardsList;
