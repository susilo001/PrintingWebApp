import { DownloadButton } from "polotno/toolbar/download-button";
import { Inertia } from "@inertiajs/inertia";
export default function ActionControls({ store }) {
  const handleRedirectHome = () => {
    Inertia.visit(route("home"));
  };
  const handleSaveButton = () => {
    store.toDataURL().then((image) => {
      Inertia.post(route("design.store"), {
        data: JSON.stringify(store.toJSON()),
        image: image,
      });
    });
  };
  return (
    <div className="space-x-4 flex mr-4">
      <DownloadButton store={store} />
      <button onClick={handleSaveButton}>Save</button>
      <button onClick={handleRedirectHome}>Home</button>
    </div>
  );
}
