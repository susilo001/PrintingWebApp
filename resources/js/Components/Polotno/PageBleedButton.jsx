import { Button } from '@blueprintjs/core';
import { observer } from 'mobx-react-lite';

export const PageBleedButton = observer(({ store }) => {

  return (
    <Button
      onClick={() => store.toggleBleed()}
    >Page Bleed</Button>
  );
});

