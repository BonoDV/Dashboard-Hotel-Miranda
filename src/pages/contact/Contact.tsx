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
import { useTranslation } from "react-i18next";
import { formatDateTimeDisplay } from "../../utils/dateUtils";
import Pagination from "../../components/Pagination.tsx";

function Contact() {
  const dispatch = useDispatch<AppDispatch>();
  const { contacts, loading, error } = useSelector(
    (state: RootState) => state.contact
  );
  const nonActionedContacts = useSelector((state: RootState) =>
    state.contact.contacts.filter((c) => c.status === "Non Actioned")
  );
  const { t } = useTranslation();
  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pestañas
  const [selectedTab, setSelectedTab] = useState("all");

  useEffect(() => {
    dispatch(fetchContacts() as any);
    dispatch(fetchContactNonActioned() as any);
  }, [dispatch]);

  // Filtrar contactos según la pestaña seleccionada
  const filteredContacts = contacts.filter((contact) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "archived")
      return contact.status === ContactStatus.ARCHIVED;
    return true;
  });

  // Calcular el rango de reviews a mostrar
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedContacts = filteredContacts.slice(startIndex, endIndex);

  if (loading) return <div>{t("loading_contact")}</div>;
  if (error)
    return (
      <div>
        {t("loading_contact_error")} {error}
      </div>
    );

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  const cols = [
    t("contact_table_order_id"),
    t("contact_table_date"),
    t("contact_table_customer"),
    t("contact_table_comment"),
    t("contact_table_action"),
  ];
  const data = paginatedContacts.map((contact) => ({
    [t("contact_table_order_id")]: contact.id,
    [t("contact_table_date")]: formatDateTimeDisplay(contact.contactDate),
    [t("contact_table_customer")]:
      contact.firstNameCustomer + " " + contact.lastNameCustomer,
    [t("contact_table_comment")]: contact.message,
    [t("contact_table_action")]: (
      <div style={{ display: "flex", gap: 12 }}>
        <TableActionButton
          variant="approve"
          onClick={async () => {
            await dispatch(
              updateContact({ ...contact, status: ContactStatus.PUBLISHED })
            );
            dispatch(fetchContacts());
            dispatch(fetchContactNonActioned());
          }}
        >
          {t("contact_publish") || "Publish"}
        </TableActionButton>
        <TableActionButton
          variant="archive"
          onClick={async () => {
            await dispatch(
              updateContact({ ...contact, status: ContactStatus.ARCHIVED })
            );
            dispatch(fetchContacts());
            dispatch(fetchContactNonActioned());
          }}
        >
          {t("contact_archive") || "Archive"}
        </TableActionButton>
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
                <ReviewTime>
                  {formatDateTimeDisplay(nonActionedContacts.contactDate)}
                </ReviewTime>
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Tabs>
          <Tab
            active={selectedTab === "all"}
            onClick={() => {
              setSelectedTab("all");
              setCurrentPage(1);
            }}
          >
            {t("contact_all_contact_table_tab")}
          </Tab>
          <Tab
            active={selectedTab === "archived"}
            onClick={() => {
              setSelectedTab("archived");
              setCurrentPage(1);
            }}
          >
            {t("contact_pending_table_tab")}
          </Tab>
        </Tabs>
      </div>
      <Table
        cols={cols}
        data={data}
        basePath={"contacts"}
        showActions={false}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
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
  display: grid;
  /* columnas fijas para que se distribuyan y dejen espacio entre ellas */
  grid-template-columns: repeat(3, 320px);
  gap: 120px;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  box-sizing: border-box;
  align-items: start;

  @media (max-width: 1200px) {
    /* en pantallas intermedias mantenemos 3 columnas pero permite reducir si no cabe */
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
  max-width: 320px; /* coincide con la columna fija para evitar expansión */
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
  color: #1f2937; /* darker text for better contrast */
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
  width: 44px;
  height: 44px;
  background: linear-gradient(
    135deg,
    rgba(19, 88, 70, 0.12),
    rgba(0, 200, 83, 0.06)
  );
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #083827;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
  border: 1px solid rgba(19, 88, 70, 0.06);
`;

const ReviewerDetails = styled.div`
  flex-grow: 1;
  min-width: 0; /* allow text truncation */
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

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  position: relative;
`;

const Tabs = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 24px;
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

// Insert modern table action button styles
const TableActionButton = styled.button<{ variant?: "approve" | "archive" }>`
  padding: 8px 12px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.12s ease, box-shadow 0.12s ease, opacity 0.12s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  min-width: 84px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  ${({ variant }) =>
    variant === "approve"
      ? `
    background: linear-gradient(180deg, #00e676, #00c853);
    color: #fff;
  `
      : `
    background: linear-gradient(180deg, #ff6b6b, #e53935);
    color: #fff;
  `}
`;

export default Contact;
