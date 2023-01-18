import { observer } from "mobx-react-lite";
import { SectionTab } from "polotno/side-panel/tab-button";
import { PrinterIcon } from "@heroicons/react/24/solid";
import { ImagesGrid } from "polotno/side-panel/images-grid";
import { useEffect, useState } from "react";

export const DesignTemplatesPanel = observer(({ store }) => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetch("/api/design")
      .then((response) => response.json())
      .then((data) => {
        setTemplates(data.templates);
      });
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row items-center justify-between">
        <SectionTab title="Design Templates" icon={<PrinterIcon />} />
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto">
        <ImagesGrid
          images={templates}
          getPreview={(template) => template.image}
          onSelect={async (template) => {
            const req = await fetch(template.json);
            const json = await req.json();

            store.loadJSON(JSON.parse(json));
          }}
        />
      </div>
    </div>
  );
});

export const DesignTemplatesSection = {
  name: "design templates",
  Tab: (props) => (
    <SectionTab name="Custom" iconSize={20} {...props}>
      <PrinterIcon className="bp4-icon w-5 h-5" />
    </SectionTab>
  ),

  Panel: DesignTemplatesPanel,
};
