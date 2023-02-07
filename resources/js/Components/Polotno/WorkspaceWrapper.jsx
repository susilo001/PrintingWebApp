import { WorkspaceWrap } from "polotno";
export default function WorkspaceWrapper({ children, className, style }) {
  return (
    <WorkspaceWrap className={className} style={style}>
      {children}
    </WorkspaceWrap>
  );
}
