import { SidePanelWrap } from "polotno";
export default function SidePanelWrapper({ children, className, style }) {
  return (
    <SidePanelWrap className={className} style={style}>
      {children}
    </SidePanelWrap>
  );
}
