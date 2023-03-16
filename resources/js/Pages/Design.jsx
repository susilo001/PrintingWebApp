import { DesignTemplatesSection } from "@/Components/Polotno/DesignTemplatesPanel";
import { SizeSection } from "@/Components/Polotno/SizePanel";
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
import CustomToolbar from "@/Components/Polotno/CustomToolbar";
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';

export default function Design({ template, role, auth }) {

  if (template) {
    store.loadJSON(JSON.parse(template.template));
  }

  const sections = [
    LayersSection,
    SizeSection,
    TextSection,
    BackgroundSection,
    ElementsSection,
    UploadSection,
    DesignTemplatesSection,
    TemplatesSection,
  ];

  if (role !== 'administrator') {
    sections.pop();
  }

  return (
    <PolotnoContainer
      className={"bp4-dark"}
      style={{ height: "100vh", width: "100vw" }}
    >
      <Head title="Design Tools" />
      <SidePanelWrap>
        <SidePanel
          store={store}
          sections={sections}
          defaultSection={"Custom"}
        />
      </SidePanelWrap>
      <WorkspaceWrap>
        <CustomToolbar store={store} auth={auth} role={role} />
        <Toolbar store={store} />
        <Workspace store={store} />
        {/* <Preview store={store} /> */}
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
}
