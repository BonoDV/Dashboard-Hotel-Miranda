import styled from "styled-components";

function Contact() {
  return (
    <>
      <ReviewCardsContainer>
        <ReviewCard>
          <ReviewText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
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
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
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
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
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

      <TableContainer>
        <Tabs>
          <Tab active>All Customer Reviews</Tab>
          <Tab>Archived</Tab>
        </Tabs>

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Order ID</Th>
                <Th>Date</Th>
                <Th>Customer</Th>
                <Th>Comment</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              <Tr>
                <Td>#00032456</Td>
                <Td>Nov 27th 2020 09:21 AM</Td>
                <Td>James Sikepu</Td>
                <Td>
                  <Comment>
                    <Stars>★★★★★</Stars>
                    <CommentText>
                      We recently had dinner with friends at Dimas Can Zheng and
                      we all walked away with a great experience. Good food,
                      pleasant environment, personal attention through all the
                      evening. Thanks to the team and we will be back.
                    </CommentText>
                  </Comment>
                </Td>
                <Td>
                  <Action>
                    <PublishLink>Publish</PublishLink>
                    <ArchiveLink>Archive</ArchiveLink>
                  </Action>
                </Td>
              </Tr>
            </tbody>
          </Table>
        </TableWrapper>

        <SortMenu>
          <SortButton>Newest</SortButton>
        </SortMenu>
      </TableContainer>
    </>
  );
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

const ActionIcon = styled.div`
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

const Tab = styled.div`
  font-weight: 500;
  color: ${({ active }) => (active ? "#135846" : "#888")};
  border-bottom: ${({ active }) => (active ? "2px solid #135846" : "none")};
  padding-bottom: 8px;
  cursor: pointer;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
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
