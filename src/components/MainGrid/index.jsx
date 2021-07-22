import styled from 'styled-components';
import styles from '../../constants/styles';

const MainGrid = styled.div`
  max-width: ${styles.MAX_WIDTH};
  margin-left: auto;
  margin-right: auto;
  padding: 24px 16px;
  .profileArea {
    display: none;
    @media(min-width: 860px) {
      display: block;
    }
  }
  @media(min-width: 860px) {
    column-gap: 10px;
    display: grid;
    grid-template-columns: 160px auto 312px;
  }
`;

export default MainGrid;
