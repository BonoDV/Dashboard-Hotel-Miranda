import styled from "styled-components";
import { RootState } from "../../redux/store/store.ts";
import { fetchContacts } from "../../redux/features/contact/contactSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Table from "../../components/Table.tsx";
import Image from "../../components/Image.tsx";

function Contact() {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector(
    (state: RootState) => state.contact
  );

  useEffect(() => {
    dispatch(fetchContacts() as any);
  }, [dispatch]);

  if (loading) return <div>Loading contacts...</div>;
  if (error) return <div>Error loading contacts: {error}</div>;

  const cols = ["Order ID", "Date", "Customer", "Comment", "Action"];
  const data = contacts.map((contact) => ({
    "Order ID": contact.id,
    Date: contact.contactDate,
    Customer: contact.firstNameCustomer + " " + contact.lastNameCustomer,
    Comment: contact.message,
    Action: (
      <div>
        <button
          style={{ color: "#00c853", border: "none", background: "none" }}
        >
          Publish
        </button>
        <button
          style={{ color: "#e53935", border: "none", background: "none" }}
        >
          Archive
        </button>
      </div>
    ),
  }));

  return (
    <>
      <Table
        cols={cols}
        data={data}
        basePath={"contacts"}
        showActions={false}
      />
    </>
  );
}

interface ActionIconProps {
  approved?: boolean;
}

interface TabProps {
  active?: boolean;
}

const ReviewCardsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  background-color: #ffffff;
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

const ActionIcon = styled.div<ActionIconProps>`
  width: 20px;
  height: 20px;
  background: ${(props) => (props.approved ? "#00c853" : "#e53935")};
  border-radius: 50%;
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  position: relative;
`;

const Tabs = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
`;

const Tab = styled.div<TabProps>`
  font-weight: 500;
  color: ${({ active }) => (active ? "#135846" : "#888")};
  border-bottom: ${({ active }) => (active ? "2px solid #135846" : "none")};
  padding-bottom: 8px;
  cursor: pointer;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  font-size: 14px;
  color: #666;
  border-bottom: 1px solid #ddd;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;

const Td = styled.td`
  padding: 12px;
  font-size: 14px;
  vertical-align: top;
  border-bottom: 1px solid #eee;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
`;

const Stars = styled.div`
  color: #00c853;
  font-size: 14px;
  margin-bottom: 4px;
`;

const CommentText = styled.div`
  color: #555;
  font-size: 14px;
`;

const Action = styled.div`
  display: flex;
  gap: 12px;
`;

const PublishLink = styled.span`
  color: #00c853;
  cursor: pointer;
  font-weight: 500;
`;

const ArchiveLink = styled.span`
  color: #e53935;
  cursor: pointer;
  font-weight: 500;
`;

const SortMenu = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
`;

const SortButton = styled.button`
  background: transparent;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 500;
  cursor: pointer;
`;

export default Contact;
