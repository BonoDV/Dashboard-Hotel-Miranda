import React from 'react';
import { useLocation, Link } from 'react-router';
import styled from 'styled-components';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean); // Elimina vacíos

  const formatName = (name) => {
    if (name.toLowerCase() === 'guest') return 'Guest List';
    if (name.toLowerCase() === 'concierge') return 'Concierge List';
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <BreadcrumbContainer>
      <LinkStyled to="/dashboard">Dashboard</LinkStyled> /
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return (
          <span key={to}>
            {' '}
            <LinkStyled to={to}>{formatName(value)}</LinkStyled>
            {index < pathnames.length - 1 && ' /'}
          </span>
        );
      })}
    </BreadcrumbContainer>
  );
};

const BreadcrumbContainer = styled.nav`
  font-size: 14px;
  margin-bottom: 20px;
  color: #555;
`;

const LinkStyled = styled(Link)`
  color: #135846;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default Breadcrumb;
