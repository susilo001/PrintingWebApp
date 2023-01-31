import ActionControls from "@/Components/Polotno/ActionControls";
import { DesignTemplatesSection } from "@/Components/Polotno/DesignTemplatesPanel";
import store from "@/lib/polotno";
import { Head } from "@inertiajs/react";
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { Workspace } from "polotno/canvas/workspace";
import { DEFAULT_SECTIONS, SidePanel } from "polotno/side-panel";
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";

export default function Design() {
  const sections = [DesignTemplatesSection, ...DEFAULT_SECTIONS];
  return (
    <>
      <Head title="Design Tools" />
      <PolotnoContainer
        className={"bp4-dark polotno-app-container container m-auto"}
        style={{ width: "100vw", height: "100vh", padding: 0 }}
      >
        <SidePanelWrap>
          <SidePanel
            store={store}
            sections={sections}
            defaultSection={"templates"}
          />
        </SidePanelWrap>
        <WorkspaceWrap>
          <Toolbar
            store={store}
            downloadButtonEnabled
            components={{ ActionControls: ActionControls }}
          />
          <Workspace store={store} />
          <ZoomButtons store={store} />
        </WorkspaceWrap>
      </PolotnoContainer>
    </>
  );
}
