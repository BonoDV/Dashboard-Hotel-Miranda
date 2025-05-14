import { BsBoxArrowInRight, BsBoxArrowInLeft } from "react-icons/bs";
import { BiCalendarCheck } from "react-icons/bi";
import { IoBedOutline } from "react-icons/io5";
import React from "react";
import styled from "styled-components";
import KPI from "./../../components/KPI.tsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaArrowRight } from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Monday", check_in: 50, check_out: 35 },
  { name: "Tuesday", check_in: 70, check_out: 45 },
  { name: "Wednesday", check_in: 40, check_out: 27 },
  { name: "Thursday", check_in: 58, check_out: 45 },
  { name: "Friday", check_in: 24, check_out: 11 },
  { name: "Saturday", check_in: 76, check_out: 44 },
  { name: "Sunday", check_in: 87, check_out: 45 },
];

const DashboardPage = () => {
  return (
    <Container>
      <KPIGroup>
        <KPI value={8461} label="New Booking" icon={<IoBedOutline />} />
        <KPI value={8461} label="Scheduled Room" icon={<BiCalendarCheck />} />
        <KPI value={8461} label="Check In" icon={<BsBoxArrowInLeft />} />
        <KPI value={8461} label="Check Out" icon={<BsBoxArrowInRight />} />
      </KPIGroup>

      <div style={{ display: "flex", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "40%",
            backgroundColor: "#ffffff",
          }}
        >
          <StyledCalendar />
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
        </div>

        <div
          style={{
            width: "60%",
            height: 650,
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "1rem",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="check_in" fill="#135846" name={"Check in"} />
              <Bar dataKey="check_out" fill="#e23428" name={"Check out"} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ReviewSection>
        <ReviewHeader>
          <SectionTitle>Latest Review by Customers</SectionTitle>
          <NextButton>
            <FaArrowRight />
          </NextButton>
        </ReviewHeader>

        <ReviewCardsContainer>
          <ReviewCard>
            <ReviewText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </ReviewText>
            <ReviewerInfo>
              <ReviewerAvatar />
              <ReviewerDetails>
                <ReviewerName>Kusnaidi Anderson</ReviewerName>
                <ReviewTime>4m ago</ReviewTime>
              </ReviewerDetails>
              <ActionButtons>
                <ActionIcon approved />
                <ActionIcon />
              </ActionButtons>
            </ReviewerInfo>
          </ReviewCard>

          <ReviewCard>
            <ReviewText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </ReviewText>
            <ReviewerInfo>
              <ReviewerAvatar />
              <ReviewerDetails>
                <ReviewerName>Bella Saphira</ReviewerName>
                <ReviewTime>4m ago</ReviewTime>
              </ReviewerDetails>
              <ActionButtons>
                <ActionIcon approved />
                <ActionIcon />
              </ActionButtons>
            </ReviewerInfo>
          </ReviewCard>

          <ReviewCard>
            <ReviewText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </ReviewText>
            <ReviewerInfo>
              <ReviewerAvatar />
              <ReviewerDetails>
                <ReviewerName>Thomas Al–Ghazali</ReviewerName>
                <ReviewTime>4m ago</ReviewTime>
              </ReviewerDetails>
              <ActionButtons>
                <ActionIcon approved />
                <ActionIcon />
              </ActionButtons>
            </ReviewerInfo>
          </ReviewCard>
        </ReviewCardsContainer>
      </ReviewSection>
    </Container>
  );
};

// Styled Components

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
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
  width: 100%;
  font-family: "Inter", sans-serif;
  padding: 1rem;
`;

const RecentBookings = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  gap: 20px;
  margin-left: 1.25rem;
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

const ReviewSection = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

const ReviewCardsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const ReviewCard = styled.div`
  flex: 1;
  min-width: 280px;
  max-width: 32%;
  background: #f9f9f9;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

const ReviewText = styled.p`
  font-size: 14px;
  color: #333;
  flex: 1;
`;

const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  gap: 12px;
`;

const ReviewerAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: #ccc;
  border-radius: 8px;
`;

const ReviewerDetails = styled.div`
  flex-grow: 1;
`;

const ReviewerName = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const ReviewTime = styled.div`
  font-size: 12px;
  color: #aaa;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionIcon = styled.div`
  width: 20px;
  height: 20px;
  background: ${(props) => (props.approved ? "#00c853" : "#e53935")};
  border-radius: 50%;
`;

const NextButton = styled.button`
  background-color: #135846;
  color: white;
  border: none;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default DashboardPage;
