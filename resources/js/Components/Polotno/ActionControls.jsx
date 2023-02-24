import {
  Button,
  Popover,
  PopoverInteractionKind,
  Position,
} from "@blueprintjs/core";
import {
  Cog6ToothIcon,
  DocumentIcon,
  PhotoIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";
export default function ActionControls({ store }) {
  const handleSaveButton = async () => {
    await store.toBlob().then((blob) => {
      router.post(
        route("design.store"),
        {
          data: JSON.stringify(store.toJSON()),
          image: blob,
        },
        {
          onSuccess: (page) => {
            Swal.fire({
              title: "Success!",
              text: page.props.flash.message,
              icon: "success",
              confirmButtonText: "Ok",
            });
          },
        }
      );
    });
  };

  const handleSaveAsImage = async () => {
    await store.saveAsImage();
  };

  const handleSaveAsPDF = async () => {
    await store.saveAsPDF();
  };

  return (
    <Popover
      interactionKind={PopoverInteractionKind.CLICK}
      popoverClassName="bp4-popover-content-sizing bp4-dark"
      position={Position.BOTTOM}
    >
      <Button>
        <Cog6ToothIcon className="h-5 w-5" />
      </Button>
      <div className="flex flex-col space-y-2">
        <Button onClick={handleSaveAsImage}>
          <span className="flex items-center space-x-2">
            <PhotoIcon className="h-5 w-5" />
            <span>Save as Image</span>
          </span>
        </Button>
        <Button onClick={handleSaveAsPDF}>
          <span className="flex items-center space-x-2">
            <DocumentIcon className="h-5 w-5" />
            <span>Save as PDF</span>
          </span>
        </Button>
        <Button onClick={handleSaveButton}>
          <span className="flex items-center space-x-2">
            <RectangleGroupIcon className="h-5 w-5" />
            <span>Save Template</span>
          </span>
        </Button>
      </div>
    </Popover>
  );
}
