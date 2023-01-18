import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";

import { Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { SidePanel, DEFAULT_SECTIONS } from "polotno/side-panel";
import { DesignTemplatesSection } from "@/Components/Polotno/DesignTemplatesPanel";
import { Workspace } from "polotno/canvas/workspace";
import { DownloadButton } from "polotno/toolbar/download-button";
import store from "@/lib/polotno";

export default function Design() {
  const ActionControls = ({ store }) => {
    return (
      <div className="space-x-4">
        <DownloadButton store={store} />
        <button
          onClick={() => {
            store.toDataURL().then((image) => {
              Inertia.post(route("design.store"), {
                data: JSON.stringify(store.toJSON()),
                image: image,
              });
            });
          }}
        >
          Save
        </button>
      </div>
    );
  };
  const sections = [DesignTemplatesSection, ...DEFAULT_SECTIONS];
  return (
    <>
      <Head title="Design" />
      <PolotnoContainer
        className={"bp4-dark polotno-app-container container mx-auto"}
        style={{ width: "100vw", height: "100vh" }}
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
