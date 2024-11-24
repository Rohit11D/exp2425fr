/* global Razorpay */

import React, { useState, useEffect } from "react";
import './Donation.css';
import { useNavigate } from "react-router-dom";

// const dotenv = require("dotenv");
const Api_URL = "https://zqrxpn-5000.csb.app";
const MY_KEY = process.env.REACT_APP_MY_KEY;
console.log(MY_KEY);
const Donation = () => {
    const navigate = useNavigate();
    const [donationAmount, setDonationAmount] = useState(0);
    const [donationData, setDonationData] = useState({
        donorInfo: {
            name: "",
            email: "",
            address: "",
            city: "",
            state: "",
            country: "",
            pinCode: ""
        },
        amount: donationAmount
    });

    useEffect(() => {
        if (!window.Razorpay) {
            const script = document.createElement('script');
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            document.body.appendChild(script);
            script.onload = () => {
                console.log("Razorpay script loaded");
            };
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "amount") {
            setDonationAmount(value);
            setDonationData({ ...donationData, amount: value });
        } else {
            setDonationData(currentData => ({
                ...currentData,
                donorInfo: {
                    ...currentData.donorInfo,
                    [name]: value
                }
            }));
        }
    };

    const handleDonate = async () => {
        const token = localStorage.getItem('auth-token');
        try {
            const response = await fetch(`${Api_URL}/donate`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify(donationData),
            });

            const data = await response.json();
            if (response.ok && data) {
                initiatePayment(donationAmount, data.donationId);
            } else {
                alert("Failed to create donation: " + (data?.message || "Unknown error"));
            }
        } catch (error) {
            console.error('Error submitting donation:', error);
            alert("Error submitting donation");
        }
    };

    const initiatePayment = async (amount, donationId) => {
        const token = localStorage.getItem('auth-token');
        try {
            const response = await fetch(`${Api_URL}/checkout`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify({ amount: amount })
            });

            const data = await response.json();
            const razOrder = data.razorpayorder;

            const options = {
                key:MY_KEY,  // Use your Razorpay key here
                amount: razOrder.amount,
                currency: "INR",
                name: "Charity Organization",
                description: "Donation",
                order_id: razOrder.id,
                handler: function (response) {
                    handlePaymentSuccess(response, donationId);
                },
                prefill: {
                    name: donationData.donorInfo.name,
                    email: donationData.donorInfo.email
                },
                theme: {
                    "color": "#121212"
                }
            };
            const razor = new Razorpay(options);
            razor.open();
        } catch (error) {
            console.error('Error initiating payment:', error);
            alert("Error initiating payment");
        }
    };

    const handlePaymentSuccess = async (response, donationId) => {
        try {
            const token = localStorage.getItem('auth-token');
            const result = await fetch(`${Api_URL}/verify-donation-payment`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify({
                    razorpayOrderId: response.razorpay_order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpaySignature: response.razorpay_signature,
                    donationId: donationId
                })
            });

            const data = await result.json();
            if (data.success) {
                alert("Donation verified successfully. Thank you for your contribution.");
                navigate("/");
            } else {
                alert("Payment verification failed: " + data.message);
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            alert("An error occurred while verifying the payment.");
        }
    };

    return (
        <div className="firstdiv">
        <div className="donation-page">
        <h2>Make a Donation</h2>
        <div className="donation-info">
          <input
            name="name"
            value={donationData.donorInfo.name}
            onChange={handleChange}
            placeholder="Your Name"
          />
          <input
            name="email"
            value={donationData.donorInfo.email}
            onChange={handleChange}
            placeholder="Your Email"
          />
          {/* <input
            name="address"
            value={donationData.donorInfo.address}
            onChange={handleChange}
            placeholder="Address"
          />
          <input
            name="city"
            value={donationData.donorInfo.city}
            onChange={handleChange}
            placeholder="City"
          />
          <input
            name="state"
            value={donationData.donorInfo.state}
            onChange={handleChange}
            placeholder="State"
          /> */}
          <input
            name="country"
            value={donationData.donorInfo.country}
            onChange={handleChange}
            placeholder="Country"
          />
          {/* <input
            name="pinCode"
            value={donationData.donorInfo.pinCode}
            onChange={handleChange}
            placeholder="Pin Code"
          /> */}
          <input
            name="amount"
            type="number"
            value={donationAmount}
            onChange={handleChange}
            placeholder="0"
          />
        </div>
        <div className="submitOrder">
          <button onClick={handleDonate} className="submit-order-btn">
            Donate Now
          </button>
        </div>
      </div>
      </div>
    );
};

export default Donation;
