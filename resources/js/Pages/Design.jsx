import { DesignTemplatesSection } from "@/Components/Polotno/DesignTemplatesPanel";
import { SizeSection } from "@/Components/Polotno/SizePanel";
import store from "@/lib/polotno";
import { Head } from "@inertiajs/react";
import { Workspace } from "polotno/canvas/workspace";
import {
  SidePanel,
  DEFAULT_SECTIONS
} from "polotno/side-panel";
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import CustomToolbar from "@/Components/Polotno/CustomToolbar";
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Preview } from "@/Components/Polotno/Preview";

export default function Design({ template, role, auth }) {

  store.toggleRulers(true);
  store.toggleBleed(true);

  const ResizeSection = DEFAULT_SECTIONS.find(
    (section) => section.name === 'size'
  );

  ResizeSection.Panel = SizeSection.Panel;

  const sections = [...DEFAULT_SECTIONS, DesignTemplatesSection]

  if (role === 'customer') {
    sections.splice(0, 1);
    sections.splice(1, 2);
    sections.splice(2, 1);
    sections.splice(3, 1);
  }

  if (template) {
    store.loadJSON(JSON.parse(template.template));
  }

  return (
    <div style={{ height: "100vh" }}>
      <CustomToolbar store={store} auth={auth} role={role} />
      <PolotnoContainer style={{ height: "calc(100% - 50px)" }}>
        <Head title="Design Tools" />
        <SidePanelWrap>
          <SidePanel
            store={store}
            sections={sections}
            defaultSection={"custom"}
          />
        </SidePanelWrap>
        <WorkspaceWrap>
          <Toolbar store={store} />
          <Workspace store={store} bleedColor="red" />
          <Preview store={store} />
          <ZoomButtons store={store} />
        </WorkspaceWrap>
      </PolotnoContainer>
    </div>
  );
}
