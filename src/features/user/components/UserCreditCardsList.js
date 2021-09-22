import React from "react";
import CreditCard from "../../shared/components/CreditCard";

function UserCreditCardsList({ list }) {
  return (
    <>
      <h3>Select a payment method</h3>
      <div className="d-flex justify-content-between flex-wrap">
        {list?.map((card, i) => (
          <div>
            <CreditCard card={card} key={i} />
          </div>
        ))}
      </div>
    </>
  );
}

export default UserCreditCardsList;
