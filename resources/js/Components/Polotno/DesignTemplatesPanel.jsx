import { RectangleGroupIcon } from "@heroicons/react/24/solid";
import { observer } from "mobx-react-lite";
import { ImagesGrid } from "polotno/side-panel/images-grid";
import { SectionTab } from "polotno/side-panel/tab-button";
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
    <div className="flex h-full flex-col">
      <div className="flex flex-row items-center justify-between">
        <SectionTab title="Design Templates" icon={<RectangleGroupIcon />} />
      </div>
      <div className="flex flex-grow flex-col overflow-y-auto">
        <ImagesGrid
          images={templates}
          getPreview={(template) => template.image}
          onSelect={async (template) => {
            store.loadJSON(JSON.parse(template.template));
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
      <RectangleGroupIcon className="bp4-icon h-5 w-5" />
    </SectionTab>
  ),

  Panel: DesignTemplatesPanel,
};
