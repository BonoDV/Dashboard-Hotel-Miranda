import { BsBoxArrowInRight } from "react-icons/bs";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { BiCalendarCheck } from "react-icons/bi";
import { IoBedOutline } from "react-icons/io5";
import React from "react";
import styled from "styled-components";
import KPI from "./../../components/KPI.jsx";
const DashboardPage = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      <KPI value={8461} label="New Booking" icon={<IoBedOutline />} />
      <KPI value={8461} label="Scheduled Room" icon={<BiCalendarCheck />} />
      <KPI value={8461} label="Check In" icon={<BsBoxArrowInLeft />} />
      <KPI value={8461} label="Check Out" icon={<BsBoxArrowInRight />} />
      <Calendar
    </div>
  );
};

export default DashboardPage;
