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
import { Preview } from "@/Components/Polotno/Preview";
import { observer } from "mobx-react-lite";
import { Button } from '@blueprintjs/core';


export default function Design({ template, role, auth }) {

  if (template) {
    store.loadJSON(JSON.parse(template.template));
  }

  const sections = [
    SizeSection,
    LayersSection,
    ElementsSection,
    UploadSection,
    BackgroundSection,
    TextSection,
    DesignTemplatesSection,
    TemplatesSection,
  ];

  if (role !== 'administrator') {
    sections.pop();
  }

  const PageBleedButton = observer(({ store }) => {
    return (
      <Button onClick={() => store.toggleBleed()}>Page Bleed</Button>
    );
  });

  store.toggleRulers(true);

  return (
    <div style={{ height: "100vh" }}>
      <CustomToolbar store={store} auth={auth} role={role} />
      <PolotnoContainer style={{ height: "calc(100% - 50px)" }}>
        <Head title="Design Tools" />
        <SidePanelWrap>
          <SidePanel
            store={store}
            sections={sections}
            defaultSection={"Custom"}
          />
        </SidePanelWrap>
        <WorkspaceWrap>
          <Toolbar
            store={store}
            components={{
              PageBleedButton,
            }}
          />
          <Workspace store={store} bleedColor="red" />
          {store.activePage.custom?.preview &&
            <Preview store={store} />
          }
          <ZoomButtons store={store} />
        </WorkspaceWrap>
      </PolotnoContainer>
    </div>
  );
}
