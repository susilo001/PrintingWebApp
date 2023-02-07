import { FilePond, registerPlugin } from "react-filepond";

import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import { useState } from "react";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageTransform,
  FilePondPluginFileEncode
);

export default function Filepond({ name, allowMultiple, maxFiles, onChange }) {
  const [files, setFiles] = useState([]);

  return (
    <FilePond
      name={name}
      files={files}
      onChange={onChange}
      onupdatefiles={setFiles}
      allowMultiple={allowMultiple}
      maxFiles={maxFiles}
    />
  );
}
