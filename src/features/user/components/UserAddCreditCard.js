import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorToast, setSuccessToast } from "../../../slices/toastSlice";
import { selectUser } from "../../../slices/userSlice";
import CreditCard from "../../shared/components/CreditCard";

const initObject = {
  name: "",
  number: "",
  cvv: "",
  month: "",
  year: "",
  funds: "",
};
function UserAddCreditCard({ handleAddPaymentMethod }) {
  const [card, setCard] = useState(initObject);

  const onInputChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section class="card card-body border-0 shadow-sm p-4 mb-4" id="location">
        <h2 class="h4 mb-4">Add payment method</h2>
        <div className="d-flex justify-content-center">
          <CreditCard card={card} />
        </div>
        <form>
          <div class="mb-3 col-12">
            <label class="form-label">
              Card Number <span class="text-danger">*</span>
            </label>
            <input
              name="number"
              class="form-control"
              type="text"
              name="number"
              maxLength="16"
              value={card.number}
              onChange={onInputChange}
            />
          </div>
          <div className="row">
            <div class="mb-3 col-8">
              <label class="form-label" for="ap-address">
                Card Name <span class="text-danger">*</span>
              </label>
              <input
                name="address"
                class="form-control"
                type="text"
                id="ap-address"
                value={card.name}
                name="name"
                onChange={onInputChange}
              />
            </div>
            <div class="mb-3 col-4">
              <label class="form-label" for="ap-address">
                Funds <span class="text-danger">*</span>
              </label>
              <input
                name="address"
                class="form-control"
                type="number"
                id="ap-address"
                value={card.funds}
                name="funds"
                onChange={onInputChange}
              />
            </div>
          </div>
          <div className="row">
            <div class="mb-3 col-4">
              <label class="form-label" for="ap-address">
                Month <span class="text-danger">*</span>
              </label>
              <select
                class="form-select"
                id="ap-type"
                value={card.month}
                name="month"
                onChange={onInputChange}
              >
                <option value="">Choose month</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
            <div class="mb-3 col-4">
              <label class="form-label" for="ap-address">
                Year <span class="text-danger">*</span>
              </label>
              <select
                class="form-select"
                id="ap-type"
                value={card.year}
                name="year"
                onChange={onInputChange}
              >
                <option value="">Choose year</option>
                <option value="1980">1980</option>
                <option value="1981">1981</option>
                <option value="1982">1982</option>
                <option value="1983">1983</option>
                <option value="1984">1984</option>
                <option value="1985">1985</option>
                <option value="1986">1986</option>
                <option value="1987">1987</option>
                <option value="1988">1988</option>
                <option value="1989">1989</option>
                <option value="1990">1990</option>
                <option value="1991">1991</option>
                <option value="1992">1992</option>
                <option value="1993">1993</option>
                <option value="1994">1994</option>
                <option value="1995">1995</option>
                <option value="1996">1996</option>
                <option value="1997">1997</option>
                <option value="1998">1998</option>
                <option value="1999">1999</option>
                <option value="2000">2000</option>
                <option value="2001">2001</option>
                <option value="2002">2002</option>
                <option value="2003">2003</option>
                <option value="2004">2004</option>
                <option value="2005">2005</option>
                <option value="2006">2006</option>
                <option value="2007">2007</option>
                <option value="2008">2008</option>
                <option value="2009">2009</option>
                <option value="2010">2010</option>
                <option value="2011">2011</option>
                <option value="2012">2012</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
              </select>
            </div>
            <div class="mb-3 col-4">
              <label class="form-label" for="ap-address">
                CVV <span class="text-danger">*</span>
              </label>
              <input
                name="address"
                class="form-control"
                type="text"
                maxLength="3"
                id="ap-address"
                value={card.cvv}
                name="cvv"
                onChange={onInputChange}
              />
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button
              onClick={() => handleAddPaymentMethod(card)}
              class="btn btn-primary px-3 px-sm-4"
              type="submit"
              disabled={
                !card.name ||
                !card.number ||
                !card.month ||
                !card.year ||
                !card.cvv ||
                !card.funds
              }
            >
              Add Payment Method
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default UserAddCreditCard;
