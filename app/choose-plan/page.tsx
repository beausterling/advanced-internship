"use client";

import Image from "next/image";
import { useState } from "react";
import { AiFillFileText } from "react-icons/ai";
import { FaHandshake } from "react-icons/fa";
import { RiPlantFill } from "react-icons/ri";
import pricingTop from "@/assets/pricing-top.png";
import Accordion from "@/components/Accordion";

export default function ChoosePlan() {
  const [selectedPlan, setSelectedPlan] = useState<"yearly" | "monthly">(
    "yearly",
  );

  return (
    <div className="plan">
      <div className="plan__header--wrapper">
        <div className="plan__header">
          <div className="plan__title">
            Get unlimited access to many amazing books to read
          </div>
          <div className="plan__sub--title">
            Turn ordinary moments into amazing learning opportunities
          </div>
          <figure className="plan__img--mask">
            <Image src={pricingTop} alt="pricing" />
          </figure>
        </div>
      </div>
      <div className="row">
        <div className="container">
          <div className="plan__features--wrapper">
            <div className="plan__features">
              <figure className="plan__features--icon">
                <AiFillFileText />
              </figure>
              <div className="plan__features--text">
                <b>Key ideas in few min</b> with many books to read
              </div>
            </div>
            <div className="plan__features">
              <figure className="plan__features--icon">
                <RiPlantFill />
              </figure>
              <div className="plan__features--text">
                <b>3 million</b> people growing with Summarist everyday
              </div>
            </div>
            <div className="plan__features">
              <figure className="plan__features--icon">
                <FaHandshake />
              </figure>
              <div className="plan__features--text">
                <b>Precise recommendations</b> collections curated by experts
              </div>
            </div>
          </div>
          <div className="plan__card--title-main">
            Choose the plan that fits you
          </div>
          <div
            className={`plan__card ${
              selectedPlan === "yearly" ? "plan__card--active" : ""
            }`}
            onClick={() => setSelectedPlan("yearly")}
          >
            <div className="plan__card--circle">
              {selectedPlan === "yearly" && (
                <div className="plan__card--dot"></div>
              )}
            </div>
            <div>
              <div className="plan__card--title">Premium Plus Yearly</div>
              <div className="plan__card--price">$99.99/year</div>
              <div className="plan__card--text">7-day free trial included</div>
            </div>
          </div>
          <div className="plan__card--separator">or</div>
          <div
            className={`plan__card ${
              selectedPlan === "monthly" ? "plan__card--active" : ""
            }`}
            onClick={() => setSelectedPlan("monthly")}
          >
            <div className="plan__card--circle">
              {selectedPlan === "monthly" && (
                <div className="plan__card--dot"></div>
              )}
            </div>
            <div>
              <div className="plan__card--title">Premium Monthly</div>
              <div className="plan__card--price">$9.99/month</div>
              <div className="plan__card--text">No trial included</div>
            </div>
          </div>
          <div className="plan__card--cta">
            <button className="btn plan__btn">
              {selectedPlan === "yearly"
                ? "Start your free 7-day trial"
                : "Start your first month"}
            </button>
            <div className="plan__disclaimer">
              {selectedPlan === "yearly"
                ? "Cancel your trial at any time before it ends, and you won’t be charged."
                : "30-day money back guarantee, no questions asked."}
            </div>
          </div>
          <Accordion />
        </div>
      </div>
    </div>
  );
}
