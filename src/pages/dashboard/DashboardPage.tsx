import { BsBoxArrowInRight, BsBoxArrowInLeft } from "react-icons/bs";
import { BiCalendarCheck } from "react-icons/bi";
import { IoBedOutline } from "react-icons/io5";
import React, { useEffect } from "react";
import styled from "styled-components";
import KPI from "../../components/KPI.tsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
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
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import {
  fetchContactNonActioned,
  fetchContacts,
  updateContact,
} from "../../redux/features/contact/contactSlice.ts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { ContactStatus } from "../../type/Contact";

const DashboardPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { contacts, loading, error } = useSelector(
    (state: RootState) => state.contact
  );
  const nonActionedContacts = useSelector((state: RootState) =>
    state.contact.contacts.filter((c) => c.status === "Non Actioned")
  );

  useEffect(() => {
    dispatch(fetchContacts() as any);
    dispatch(fetchContactNonActioned() as any);
  }, [dispatch]);

  const data = [
    { name: t("monday"), check_in: 8, check_out: 7 },
    { name: t("tuesday"), check_in: 3, check_out: 5 },
    { name: t("wednesday"), check_in: 2, check_out: 1 },
    { name: t("thursday"), check_in: 4, check_out: 2 },
    { name: t("friday"), check_in: 9, check_out: 3 },
    { name: t("saturday"), check_in: 16, check_out: 4 },
    { name: t("sunday"), check_in: 2, check_out: 10 },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta
          name="description"
          content="Dashboard page for Hotel Management System"
        />
      </Helmet>
      <Container>
        <KPIGroup>
          <KPI value={13} label="kpi_new_booking" icon={<IoBedOutline />} />
          <KPI
            value={24}
            label="kpi_scheduled_room"
            icon={<BiCalendarCheck />}
          />
          <KPI value={12} label="kpi_check_in" icon={<BsBoxArrowInLeft />} />
          <KPI value={16} label="kpi_check_out" icon={<BsBoxArrowInRight />} />
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
                <Bar
                  dataKey="check_in"
                  fill="#135846"
                  name={t("kpi_check_in")}
                />
                <Bar
                  dataKey="check_out"
                  fill="#e23428"
                  name={t("kpi_check_out")}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <ReviewCardsContainer>
          {nonActionedContacts.slice(0, 3).map((nonActionedContacts) => (
            <ReviewCard key={nonActionedContacts.id}>
              <ReviewText>{nonActionedContacts.message}</ReviewText>
              <ReviewerInfo>
                <ReviewerDetails>
                  <ReviewerName>
                    {nonActionedContacts.firstNameCustomer}{" "}
                    {nonActionedContacts.lastNameCustomer}
                  </ReviewerName>
                  <ReviewTime>{nonActionedContacts.contactDate}</ReviewTime>
                </ReviewerDetails>
                <ActionButtons>
                  <ActionIcon
                    approved={true}
                    onClick={async () => {
                      await dispatch(
                        updateContact({
                          ...nonActionedContacts,
                          status: ContactStatus.PUBLISHED,
                        })
                      );
                      dispatch(fetchContacts());
                      dispatch(fetchContactNonActioned());
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  <ActionIcon
                    approved={false}
                    onClick={async () => {
                      await dispatch(
                        updateContact({
                          ...nonActionedContacts,
                          status: ContactStatus.ARCHIVED,
                        })
                      );
                      dispatch(fetchContacts());
                      dispatch(fetchContactNonActioned());
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </ActionButtons>
              </ReviewerInfo>
            </ReviewCard>
          ))}
        </ReviewCardsContainer>
      </Container>
    </>
  );
};

interface ActionIconProps {
  approved?: boolean;
}

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
  display: grid;
  grid-template-columns: repeat(3, 320px);
  gap: 120px;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  box-sizing: border-box;
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(260px, 1fr));
    justify-content: center;
  }

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 320px);
    justify-content: space-evenly;
    gap: 28px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    justify-content: center;
    gap: 20px;
    padding: 16px;
  }
`;

const ReviewCard = styled.div`
  width: 100%;
  max-width: 320px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.7),
    rgba(250, 250, 250, 0.6)
  );
  padding: 18px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 6px 18px rgba(16, 24, 40, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(19, 88, 70, 0.06);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 18px 40px rgba(16, 24, 40, 0.12);
  }

  @media (max-width: 980px) {
    max-width: 320px;
  }

  @media (max-width: 640px) {
    max-width: 100%;
  }
`;

const ReviewText = styled.p`
  font-size: 14px;
  color: #1f2937;
  flex: 1;
  line-height: 1.45;
  margin: 0 0 12px 0;
  word-break: break-word;
`;

const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
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
  min-width: 0;
`;

const ReviewerName = styled.div`
  font-weight: 700;
  font-size: 13px;
  color: #0f5132;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ReviewTime = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionIcon = styled.div<ActionIconProps>`
  width: 36px;
  height: 36px;
  background: ${(props) =>
    props.approved
      ? "linear-gradient(180deg,#00e676,#00c853)"
      : "linear-gradient(180deg,#ff8a80,#e53935)"};
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(2, 6, 23, 0.08);
  cursor: pointer;
  transition: transform 0.16s ease, box-shadow 0.16s ease, opacity 0.12s ease;
  border: none;

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 18px 36px rgba(2, 6, 23, 0.12);
  }
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
