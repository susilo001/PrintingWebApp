import ActionControls from "@/Components/Polotno/ActionControls";
import Container from "@/Components/Polotno/Container";
import { DesignTemplatesSection } from "@/Components/Polotno/DesignTemplatesPanel";
import { PageControls } from "@/Components/Polotno/PageControls";
import SidePanelWrapper from "@/Components/Polotno/SidePanelWrapper";
import { SizeSection } from "@/Components/Polotno/SizePanel";
import WorkspaceWrapper from "@/Components/Polotno/WorkspaceWrapper";
import store from "@/lib/polotno";
import { Head } from "@inertiajs/react";
import { Workspace } from "polotno/canvas/workspace";
import {
  BackgroundSection,
  ElementsSection,
  LayersSection,
  SidePanel,
  TemplatesSection,
  TextSection,
  UploadSection,
} from "polotno/side-panel";
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";

export default function Design() {
  const sections = [
    LayersSection,
    SizeSection,
    UploadSection,
    DesignTemplatesSection,
    TextSection,
    TemplatesSection,
    BackgroundSection,
    ElementsSection,
  ];
  return (
    <>
      <Head title="Design Tools" />

      <Container
        className={"bp4-dark max-w-screen"}
        style={{ height: "100vw" }}
      >
        <SidePanelWrapper>
          <SidePanel
            store={store}
            sections={sections}
            defaultSection={"templates"}
          />
        </SidePanelWrapper>
        <WorkspaceWrapper>
          <Toolbar
            store={store}
            downloadButtonEnabled
            components={{ ActionControls: ActionControls }}
          />
          <Workspace store={store} components={{ PageControls }} />
          {/* <Preview store={store} /> */}
          <ZoomButtons store={store} />
        </WorkspaceWrapper>
      </Container>
    </>
  );
}
