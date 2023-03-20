import { Button, Navbar } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

export const Preview = observer(({ store }) => {
  const [previewVisible, setPreviewVisible] = useState(true);
  const [content, setContent] = useState("");

  useEffect(() => {
    store.on("change", async () => {
      setContent(await store.toDataURL({ ignoreBackground: false }));
    });
  }, [store]);

  if (!store.pages[0].custom?.preview) {
    return null;
  }

  return (
    <div
      className="fixed bottom-14 right-2 sm:bottom-5 sm:right-6 z-10 transform-origin-top-left bg-white border shadow-lg border-gray-200 rounded overflow-hidden"
    >
      <Navbar>
        <Navbar.Group align="right">
          {previewVisible && (
            <Button
              icon="eye-off"
              minimal
              onClick={() => {
                setPreviewVisible(false);
              }}
            />
          )}
          {!previewVisible && (
            <Button
              icon="eye-on"
              minimal
              onClick={() => {
                setPreviewVisible(true);
              }}
            />
          )}
        </Navbar.Group>
      </Navbar>
      <div className={`${previewVisible ? "" : "hidden"} relative`}>
        <img src={store.pages[0].custom?.preview.src} style={{ width: '300px' }} />
        <img
          className="absolute inset-20 border-2 border-red-300 object-contain w-36"
          src={content}
        />
      </div>
    </div >

  );
});
