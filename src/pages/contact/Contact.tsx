import styled from "styled-components";
import { RootState } from "../../redux/store/store.ts";
import {
  fetchContactNonActioned,
  fetchContacts,
  updateContact,
} from "../../redux/features/contact/contactSlice";
import { ContactStatus } from "../../type/Contact";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import Table from "../../components/Table.tsx";
import Image from "../../components/Image.tsx";

function Contact() {
  const dispatch = useDispatch<AppDispatch>();
  const { contacts, loading, error } = useSelector(
    (state: RootState) => state.contact
  );
  const nonActionedContacts = useSelector((state: RootState) =>
    state.contact.contacts.filter((c) => c.status === "Non Actioned")
  );

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchContacts() as any);
    dispatch(fetchContactNonActioned() as any);
  }, [dispatch]);

  // Calcular el rango de habitaciones a mostrar
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedContacts = contacts.slice(startIndex, endIndex);

  if (loading) return <div>Loading contacts...</div>;
  if (error) return <div>Error loading contacts: {error}</div>;
  // Calcular el número total de páginas
  const totalPages = Math.ceil(contacts.length / itemsPerPage);

  const cols = ["Order ID", "Date", "Customer", "Comment", "Action"];
  const data = paginatedContacts.map((contact) => ({
    "Order ID": contact.id,
    Date: contact.contactDate,
    Customer: contact.firstNameCustomer + " " + contact.lastNameCustomer,
    Comment: contact.message,
    Action: (
      <div>
        <button
          style={{
            color: "#00c853",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
          onClick={async () => {
            await dispatch(
              updateContact({ ...contact, status: ContactStatus.PUBLISHED })
            );
            dispatch(fetchContacts());
            dispatch(fetchContactNonActioned());
          }}
        >
          Publish
        </button>
        <button
          style={{
            color: "#e53935",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
          onClick={async () => {
            await dispatch(
              updateContact({ ...contact, status: ContactStatus.ARCHIVED })
            );
            dispatch(fetchContacts());
            dispatch(fetchContactNonActioned());
          }}
        >
          Archive
        </button>
      </div>
    ),
  }));

  return (
    <>
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
      <Table
        cols={cols}
        data={data}
        basePath={"contacts"}
        showActions={false}
      />
      {/* Controles de paginación */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
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
