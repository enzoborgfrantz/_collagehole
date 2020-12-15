import styled, { css } from "styled-components";

const baseFontSize = 25;
const fontSizeXS = baseFontSize - 15;
const fontSizeS = baseFontSize - 10;
const fontSizeM = baseFontSize;
const fontSizeL = baseFontSize + 10;

const Letter = styled.span((props) => [
  css`
    font-family: monospace;
    color: white;
    font-size: ${fontSizeM}px;
  `,
  props.bold &&
    css`
      font-weight: 600;
    `,
  props.color &&
    css`
      color: ${props.color};
    `,
  props.size &&
    css`
      font-size: ${props.size}px;
    `,
]);

const Logo = () => (
  <div>
    <Letter color="#a34381" bold>
      c
    </Letter>
    <Letter color="#e2cf5c">O</Letter>
    <Letter color="#00a8c6">l</Letter>
    <Letter color="#b22b68" bold>
      L
    </Letter>
    <Letter color="#4aa037">a</Letter>
    <Letter color="#864f89" size={fontSizeL}>
      g
    </Letter>
    <Letter color="#d65126" size={fontSizeS}>
      E
    </Letter>
    <Letter color="#1a4e72">h</Letter>
    <Letter color="#c5ab2b" size={fontSizeXS} bold>
      O
    </Letter>
    <Letter color="#d73f5e">L</Letter>
    <Letter color="#93bb4d" size={fontSizeL} bold>
      e
    </Letter>
  </div>
);

const Wrapper = styled.div`
  background: #191919;
  padding: 25px;
`;

export const Header = ({ headerRef }) => (
  <Wrapper ref={headerRef}>
    <Logo />
  </Wrapper>
);
