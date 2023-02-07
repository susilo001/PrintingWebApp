import { router } from "@inertiajs/react";
import { DownloadButton } from "polotno/toolbar/download-button";
export default function ActionControls({ store }) {
  const handleRedirectHome = () => {
    router.visit(route("home"));
  };
  const handleSaveButton = () => {
    store.toDataURL().then((image) => {
      router.post(route("design.store"), {
        data: JSON.stringify(store.toJSON()),
        image: image,
      });
    });
  };
  return (
    <div className="mr-4 flex space-x-4">
      <DownloadButton store={store} />
      <button onClick={handleSaveButton}>Save</button>
      <button onClick={handleRedirectHome}>Home</button>
    </div>
  );
}
