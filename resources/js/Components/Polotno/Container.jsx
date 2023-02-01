import { PolotnoContainer } from "polotno";
export default function Container({ children, className, style }) {
  return (
    <PolotnoContainer className={className} style={style}>
      {children}
    </PolotnoContainer>
  );
}
