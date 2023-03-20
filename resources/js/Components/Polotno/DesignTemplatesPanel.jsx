import { observer } from "mobx-react-lite";
import { ImagesGrid } from "polotno/side-panel/images-grid";
import { SectionTab } from "polotno/side-panel/tab-button";
import { useEffect, useState } from "react";
import { Spinner, InputGroup, Icon } from "@blueprintjs/core";

export const DesignTemplatesSection = {
  name: "custom",
  Tab: (props) => (
    <SectionTab name="Custom" {...props}>
      <Icon icon="media" />
    </SectionTab>
  ),

  Panel: observer(({ store }) => {
    const [templates, setTemplates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      fetch("/api/design")
        .then((response) => response.json())
        .then((data) => {
          setTemplates(data.templates);
          setIsLoading(false);
        });
    }, []);

    return (
      <div className="flex h-full flex-col space-y-4">
        <div>
          <InputGroup className="bp4-fill" placeholder="Search..." leftIcon='search' />
        </div>
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <Spinner />
          </div>
        )}
        {!isLoading && templates.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-500">No templates found</span>
          </div>
        )}
        {templates.length > 0 && (
          <div className="flex flex-grow flex-col overflow-y-auto">
            <ImagesGrid
              images={templates}
              isLoading={isLoading}
              getPreview={(template) => template.image}
              onSelect={(template) => {
                store.loadJSON(JSON.parse(template.template));
              }}
            />
          </div>
        )}
      </div>
    );
  }),
};
