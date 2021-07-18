import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function Home() {
  const [comunidades, setComunidades] = React.useState(['Alurakut']);
  setComunidades('Alura comunidade');
  return <Title>{`Olá, amigo da ${comunidades[0]}`}</Title>;
}
