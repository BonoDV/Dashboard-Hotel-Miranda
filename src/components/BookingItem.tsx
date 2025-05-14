import React from "react";
import styled from "styled-components";

type BookingItemProps = {
  room: string;
  guest: string;
  timeAgo: string;
  dates: string[];
  color?: string;
};

const BookingItem: React.FC<BookingItemProps> = ({ room, guest, timeAgo, dates, color }) => {
  return (
    <ItemContainer>
      <ImagePlaceholder />
      <BookingInfo>
        <RoomName>{room}</RoomName>
        <GuestInfo>
          <GuestAvatar />
          <GuestDetails>
            <GuestName>{guest}</GuestName>
            <TimeAgo>{timeAgo}</TimeAgo>
          </GuestDetails>
        </GuestInfo>
      </BookingInfo>
      <DateBadge color={color}>{dates.join(", ")}</DateBadge>
    </ItemContainer>
  );
};

// Styles
const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
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
  background-color: ${(props) => props.color || "#eee"};
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
`;
export default BookingItem;
