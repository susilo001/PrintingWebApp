import { Button, NumericInput, Switch, Divider, FormGroup, Icon } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";
import { SectionTab } from "polotno/side-panel/tab-button";
import { useState } from "react";

export const SizeSection = {
  name: "sizes",
  Tab: (props) => (
    <SectionTab name="Sizes" {...props}>
      <Icon icon='array-floating-point' iconSize={20} />
    </SectionTab>
  ),

  Panel: observer(({ store }) => {
    const [width, setWidth] = useState(store.width);
    const [height, setHeight] = useState(store.height);
    const [magicResizer, setMagicResizer] = useState(true);

    const AVAILABLE_SIZES = [
      { desc: 'A3 Size', width: 842, height: 1191 },
      { desc: 'A3 Size', width: 1123, height: 1587 },
      { desc: 'A3 Size', width: 1754, height: 2480 },
      { desc: 'A3 Size', width: 3508, height: 4960 },
    ];

    const handleWidthChange = (e) => {
      setWidth(parseInt(e));
    };

    const handleHeightChange = (e) => {
      setHeight(parseInt(e));
    };

    const handleSubmit = () => {
      store.setSize(width, height, magicResizer);
    };

    const handleBookCover = () => {
      store.pages[0].set({
        // you can use "custom" attribute to save your own custom data
        custom: {
          preview: {
            src: '../asset/blank-book-cover.jpg'
          }
        },
        bleed: 20, // in pixels
        width: 1410, // in pixels. You can use 'auto' to inherit width from the store
        height: 2250, // in pixels. You can use 'auto' to inherit height from the store
      })
    }

    const handlePaperBag = () => {
      store.pages[0].set({
        // you can use "custom" attribute to save your own custom data
        custom: {
          preview: {
            src: '../asset/paper-bag.jpg'
          }
        },
        bleed: 20, // in pixels
        width: 842, // in pixels. You can use 'auto' to inherit width from the store
        height: 1191, // in pixels. You can use 'auto' to inherit height from the store
      })
    }

    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Size</span>
          <Switch
            checked={magicResizer}
            onChange={(e) => setMagicResizer(e.target.checked)}
          />
        </div>
        <div className="flex items-center">
          <FormGroup
            label="Width"
            labelFor="width"
          >
            <NumericInput
              name="width"
              className="bp4-fill"
              value={width}
              onValueChange={(e) => handleWidthChange(e)
              }
            />
          </FormGroup>
          <FormGroup
            label="Height"
            labelFor="height"
          >
            <NumericInput
              name="height"
              className="bp4-fill"
              value={height}
              onValueChange={(e) => handleHeightChange(e)}
            />
          </FormGroup>
        </div>
        <div className="flex items-center">
          <Button
            className='bp4-fill'
            rightIcon="refresh"
            alignText="left"
            onClick={() => store.setSize(500, 500, true)}
          >Reset</Button>
          <Button onClick={() => handleSubmit()} className='bp4-fill'>Apply</Button>
        </div>
        <Divider />
        {AVAILABLE_SIZES.map(({ width, height, desc }, index) => (
          <Button
            key={index}
            alignText="left"
            onClick={() => store.setSize(width, height, magicResizer)}
          >
            <div className="flex justify-between">
              <span className="text-sm font-semibold">{desc}</span>
              <span className="text-sm font-semibold">
                {width} x {height} px
              </span>
            </div>
          </Button>
        ))}
        <Button
          alignText="left"
          onClick={() => handleBookCover()}
        >
          <div className="flex justify-between">
            <span className="text-sm font-semibold">Book Cover</span>
            <span className="text-sm font-semibold">
              1410 x 2250 px
            </span>
          </div>
        </Button>
        <Button
          alignText="left"
          onClick={() => handlePaperBag()}
        >
          <div className="flex justify-between">
            <span className="text-sm font-semibold">Paper Bag</span>
            <span className="text-sm font-semibold">
              842 x 1191 px
            </span>
          </div>
        </Button>
      </div >
    );
  }),
};



