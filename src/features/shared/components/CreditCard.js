import axios from "axios";
import React from "react";

function CreditCard({ card }) {
  return (
    <>
      <div class="credit-card-container mb-3">
        <i
          class="fas fa-times"
          title="Delete Card"
          onClick={deleteCreditCard}
        ></i>
        <div class="credit-card-content ">
          <div class="top-section">
            <i>visa</i>
            <span>Funds: {card?.funds}</span>
          </div>
          <div class="mid-section">
            <span class="card-number-label">Card Number</span>
            <span class="card-number-value">{card.number}</span>
          </div>
          <div class="bottom-section">
            <span class="card-number-label">Holders Name</span>
            <span class="card-number-value">{card?.name}</span>
          </div>
          <div class="end-section">
            <div class="expires">
              <span class="card-number-label">Expires</span>
              <span class="card-number-value">{`${card?.month} / ${card?.year}`}</span>
            </div>
            <div class="cvv">
              <span class="card-number-label">CVV</span>
              <span class="card-number-value">{card.cvv}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreditCard;
