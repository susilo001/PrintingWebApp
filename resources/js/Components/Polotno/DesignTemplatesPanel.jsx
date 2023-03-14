import { RectangleGroupIcon } from "@heroicons/react/24/solid";
import { observer } from "mobx-react-lite";
import { ImagesGrid } from "polotno/side-panel/images-grid";
import { SectionTab } from "polotno/side-panel/tab-button";
import { useEffect, useState } from "react";
import { Spinner, InputGroup } from "@blueprintjs/core";

export const DesignTemplatesPanel = observer(({ store }) => {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/design")
      .then((response) => response.json())
      .then((data) => {
        setTemplates(data.templates);
        setIsLoading(false);
      });
  }, [templates]);

  return (
    <div className="flex h-full flex-col space-y-4">
      <div>
        <InputGroup className="bp4-fill" placeholder="Search..." leftIcon='search' />
      </div>
      <div className="flex flex-grow flex-col overflow-y-auto">
        {isLoading ? <Spinner /> :
          <ImagesGrid
            images={templates}
            getPreview={(template) => template.image}
            onSelect={async (template) => {
              store.loadJSON(JSON.parse(template.template));
            }}
          />
        }
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
