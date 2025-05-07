import { BsBoxArrowInRight } from "react-icons/bs";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { BiCalendarCheck } from "react-icons/bi";
import { IoBedOutline } from "react-icons/io5";
import React from "react";
import styled from "styled-components";
import KPI from "./../../components/KPI.jsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const DashboardPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        justifyContent: "space-between",
        alignItems: "flex-start", // Alinea arriba
        flexWrap: "wrap",
      }}
    >
      {/* KPI group */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          minWidth: "70%",
        }}
      >
        <KPI value={8461} label="New Booking" icon={<IoBedOutline />} />
        <KPI value={8461} label="Scheduled Room" icon={<BiCalendarCheck />} />
        <KPI value={8461} label="Check In" icon={<BsBoxArrowInLeft />} />
        <KPI value={8461} label="Check Out" icon={<BsBoxArrowInRight />} />
      </div>

      {/* Calendar */}
      <div>
        <StyledCalendar
          tileClassName={({ date, view }) => {
            if (view === "month") {
              const day = date.getDate();
              if ([8, 9].includes(day)) return "dot";
              if (day === 20) return "special-day";
            }
          }}
        />
      </div>
    </div>
  );
};

const StyledCalendar = styled(Calendar)`
  border: none;
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  padding: 1rem;

  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .react-calendar__navigation button {
    background: none;
    border: none;
    color: #333;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
  }

  .react-calendar__navigation button:disabled {
    color: #ccc;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: capitalize;
    font-size: 0.75rem;
    font-weight: 500;
    color: #999;
  }

  .react-calendar__tile {
    height: 48px;
    max-width: 48px;
    text-align: center;
    padding: 0.5rem 0;
    border-radius: 50%;
    font-size: 0.9rem;
    position: relative;
  }

  .react-calendar__tile:hover {
    background-color: #f3f3f3;
  }

  .react-calendar__tile--active {
    background: #004d40;
    color: white;
    border-radius: 50%;
  }

  .react-calendar__tile--range {
    background: #e53935;
    color: white;
    border-radius: 0;
  }

  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd {
    background: #e53935;
    color: white;
    border-radius: 50%;
  }

  /* Punto verde bajo ciertos días */
  .dot::after {
    content: "";
    width: 6px;
    height: 6px;
    background: #4caf50;
    border-radius: 50%;
    display: block;
    margin: 4px auto 0;
  }

  /* Día especial en naranja */
  .special-day {
    background-color: #ffb74d !important;
    color: white !important;
    border-radius: 50%;
  }
`;

export default DashboardPage;
