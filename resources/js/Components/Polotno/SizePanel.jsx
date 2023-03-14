import { Button, NumericInput, Switch, Divider, H5 } from "@blueprintjs/core";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { observer } from "mobx-react-lite";
import { SectionTab } from "polotno/side-panel/tab-button";
import { useState } from "react";

export const SizePanel = observer(({ store }) => {
  const [width, setWidth] = useState(store.width);
  const [height, setHeight] = useState(store.height);
  const [magicResizer, setMagicResizer] = useState(true);

  const handleWidthChange = (e) => {
    setWidth(parseInt(e));
  };

  const handleHeightChange = (e) => {
    setHeight(parseInt(e));
  };

  const handleSubmit = () => {
    store.setSize(width, height, magicResizer);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">Size</span>
        <Button
          icon="refresh"
          minimal
          onClick={() => store.setSize(500, 500, true)}
        />

        <Switch
          checked={magicResizer}
          onChange={(e) => setMagicResizer(e.target.checked)}
        />
      </div>
      <div className="flex flex-grow flex-col overflow-y-auto">
        <div className="flex flex-col">
          <span>Width</span>
          <NumericInput
            name="page width"
            className="bp4-fill"
            value={width}
            onValueChange={(e) => handleWidthChange(e)
            }
          />

          <span>Height</span>
          <NumericInput
            name="page height"
            className="bp4-fill"
            value={height}
            onValueChange={(e) => handleHeightChange(e)}
          />
          <Button onClick={() => handleSubmit()}>Apply</Button>
          <H5 className="text-sm font-semibold text-center">Stationary sizes</H5>
          <Divider />
          <Button
            alignText="left"
            onClick={() => store.setSize(842, 1191, magicResizer)}
          >
            <div className="flex justify-between">
              <span className="text-sm font-semibold">A3 resolution </span>
              <span className="text-sm font-semibold">
                842 x 1191 px
              </span>
            </div>
          </Button>
          <Button
            alignText="left"
            onClick={() => store.setSize(1123, 1587, magicResizer)}
          >
            <div className="flex justify-between">
              <span className="text-sm font-semibold">A3 resolution </span>
              <span className="text-sm font-semibold">
                1123 x 1587 px
              </span>
            </div>
          </Button>
          <Button
            alignText="left"
            onClick={() => store.setSize(1754, 2480, magicResizer)}
          >
            <div className="flex justify-between">
              <span className="text-sm font-semibold">A3 resolution </span>
              <span className="text-sm font-semibold">
                1754 x 2480 px
              </span>
            </div>
          </Button>
          <Button
            className="flex justify-between"
            alignText="left"
            onClick={() => {
              store.setSize(3508, 4960, magicResizer);
            }}
          >
            <div className="flex justify-between">
              <span className="text-sm font-semibold">A3 resolution </span>
              <span className="text-sm font-semibold">
                3508 x 4960 px
              </span>
            </div>
          </Button>
          <Divider />
        </div>
      </div>
    </div>
  );
});

export const SizeSection = {
  name: "size section",
  Tab: (props) => (
    <SectionTab name="Size Layer" iconSize={20} {...props}>
      <ArrowsPointingOutIcon className="bp4-icon h-5 w-5" />
    </SectionTab>
  ),

  Panel: SizePanel,
};
