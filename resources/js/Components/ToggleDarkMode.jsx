import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { themeChange } from "theme-change";

export default function ToggleDarkMode() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <button
      className="swap swap-rotate btn btn-ghost btn-circle"
      data-toggle-theme="night,cmyk"
      data-act-class="ACTIVECLASS"
      onClick={() => setEnabled(!enabled)}
    >
      {enabled ? (
        <SunIcon className="h-6 w-6 " />
      ) : (
        <MoonIcon className="h-6 w-6  " />
      )}
    </button>
  );
}
