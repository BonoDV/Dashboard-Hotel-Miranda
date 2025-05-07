import { BsBoxArrowInRight, BsBoxArrowInLeft } from "react-icons/bs";
import { BiCalendarCheck } from "react-icons/bi";
import { IoBedOutline } from "react-icons/io5";
import React from "react";
import styled from "styled-components";
import KPI from "./../../components/KPI.jsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DashboardPage = () => {
  return (
    <Container>
      {/* KPI group */}
      <KPIGroup>
        <KPI value={8461} label="New Booking" icon={<IoBedOutline />} />
        <KPI value={8461} label="Scheduled Room" icon={<BiCalendarCheck />} />
        <KPI value={8461} label="Check In" icon={<BsBoxArrowInLeft />} />
        <KPI value={8461} label="Check Out" icon={<BsBoxArrowInRight />} />
      </KPIGroup>

      {/* Calendar */}
      <StyledCalendar />

      {/* Recent bookings - estático */}
      <RecentBookings>
        <ItemContainer>
          <ImagePlaceholder />
          <BookingInfo>
            <RoomName>Queen Bed A–12324</RoomName>
            <GuestInfo>
              <GuestAvatar />
              <GuestDetails>
                <GuestName>James Sukardi</GuestName>
                <TimeAgo>8-5 ... 10-5</TimeAgo>
              </GuestDetails>
            </GuestInfo>
          </BookingInfo>
          <DateBadge style={{ backgroundColor: "#004d40" }}>3</DateBadge>
        </ItemContainer>

        <ItemContainer>
          <ImagePlaceholder />
          <BookingInfo>
            <RoomName>Deluxe Room B–1324</RoomName>
            <GuestInfo>
              <GuestAvatar />
              <GuestDetails>
                <GuestName>Angela Moss</GuestName>
                <TimeAgo>8-5 ... 10-5</TimeAgo>
              </GuestDetails>
            </GuestInfo>
          </BookingInfo>
          <DateBadge style={{ backgroundColor: "#e53935" }}>
            16, 17, 18
          </DateBadge>
        </ItemContainer>

        <ItemContainer>
          <ImagePlaceholder />
          <BookingInfo>
            <RoomName>King Big C–2445</RoomName>
            <GuestInfo>
              <GuestAvatar />
              <GuestDetails>
                <GuestName>Geovanny</GuestName>
                <TimeAgo>8-5 ... 10-5</TimeAgo>
              </GuestDetails>
            </GuestInfo>
          </BookingInfo>
          <DateBadge style={{ backgroundColor: "#ff9800" }}>20</DateBadge>
        </ItemContainer>

        <ViewMore>View More</ViewMore>
      </RecentBookings>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: flex-start;
`;

const KPIGroup = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  min-width: 70%;
`;

const StyledCalendar = styled(Calendar)`
  border: none;
  border-radius: 12px;
  width: 40%;
  font-family: "Inter", sans-serif;
  padding: 1rem;
`;

const RecentBookings = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  gap: 20px;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const ImagePlaceholder = styled.div`
  width: 60px;
  height: 60px;
  background: #ccc;
  border-radius: 8px;
`;

const BookingInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const RoomName = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
`;

const GuestInfo = styled.div`
  display: flex;
  align-items: center;
`;

const GuestAvatar = styled.div`
  width: 20px;
  height: 20px;
  background: #ddd;
  border-radius: 50%;
  margin-right: 8px;
`;

const GuestDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const GuestName = styled.div`
  font-size: 13px;
  color: #444;
`;

const TimeAgo = styled.div`
  font-size: 12px;
  color: #aaa;
`;

const DateBadge = styled.div`
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
  color: white;
`;

const ViewMore = styled.div`
  text-align: center;
  color: #007a5a;
  font-weight: 500;
  cursor: pointer;
  margin-top: 8px;
`;

export default DashboardPage;
