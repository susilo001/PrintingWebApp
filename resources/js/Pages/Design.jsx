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

export default function Design({ template }) {
  if (template) {
    store.loadJSON(JSON.parse(template.template));
  }

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
    <PolotnoContainer
      className={"bp4-dark"}
      style={{ height: "100vw", width: "100vw" }}
    >
      <Head title="Design Tools" />
      <SidePanelWrap>
        <SidePanel
          store={store}
          sections={sections}
          defaultSection={"templates"}
        />
      </SidePanelWrap>
      <WorkspaceWrap>
        <CustomToolbar store={store} />
        <Toolbar store={store} />
        <Workspace store={store} />
        {/* <Preview store={store} /> */}
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
}
