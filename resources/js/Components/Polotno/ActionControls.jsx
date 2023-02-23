import Dropdown from "@/Components/Dropdown";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { router } from "@inertiajs/react";
import { DownloadButton } from "polotno/toolbar/download-button";
import { useState } from "react";
export default function ActionControls({ store }) {
  const [showSettings, setShowSettings] = useState(false);
  const handleSaveButton = () => {
    store.toDataURL().then((image) => {
      router.post(route("design.store"), {
        data: JSON.stringify(store.toJSON()),
        image: image,
      });
    });
  };
  return (
    <>
      <div className="flex space-x-4">
        <div className="hidden sm:flex sm:space-x-4">
          <DownloadButton store={store} />
          <button onClick={handleSaveButton}>Save</button>
        </div>
        <div className="sm:hidden">
          <Dropdown>
            <Dropdown.Trigger>
              <AdjustmentsHorizontalIcon className="h-6 w-6" />
            </Dropdown.Trigger>
            <Dropdown.Content>
              <div className="flex flex-col space-y-4">
                <DownloadButton store={store} />
                <button onClick={handleSaveButton}>Save</button>
              </div>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </div>
    </>
  );
}
