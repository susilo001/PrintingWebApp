import { FilePond, registerPlugin } from "react-filepond";

import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageTransform,
  FilePondPluginFileEncode
);

export default function Filepond({
  name,
  allowMultiple,
  maxFiles,
  onChange,
  files,
  onUpdateFiles,
}) {
  return (
    <FilePond
      name={name}
      files={files}
      storeAsFile={true}
      onChange={onChange}
      onupdatefiles={onUpdateFiles}
      allowMultiple={allowMultiple}
      maxFiles={maxFiles}
      credits={false}
    />
  );
}
