import React from "react";
import styled from "styled-components";

const KPI = ({ value, label, icon }) => {
  return (
    <Card>
      <IconWrapper>{icon}</IconWrapper>
      <Content>
        <Value>{value.toLocaleString()}</Value>
        <Label>{label}</Label>
      </Content>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 16px 20px;
  min-width: 15%;
`;

const IconWrapper = styled.div`
  background-color: #ffecec;
  color: #e53935;
  padding: 12px;
  border-radius: 8px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Value = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`;

const Label = styled.div`
  font-size: 14px;
  color: #999;
`;

export default KPI;
