import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';

export default function AddButton(props) {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <FAB.Group
        open={open}
        visible
        icon={open ? 'close' : 'plus'}
        actions={props.actions}
        onStateChange={onStateChange}
        onPress={() => {
        if (open) {
            // do something if the speed dial is open
        }
        }}
    />
  );
};