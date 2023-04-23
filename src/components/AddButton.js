import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';

export default function AddButton() {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <FAB.Group
        open={open}
        visible
        icon={open ? 'close' : 'plus'}
        actions={[
        {
            icon: 'contactless-payment-circle',
            label: 'Kontakt senden',
            //onPress: () => console.log('Pressed notifications'),
        },
        {
            icon: 'account-plus',
            label: 'Kontakt erstellen',
            //onPress: () => console.log('Pressed star'),
        },
        {
            icon: 'account-multiple-plus',
            label: 'Aus Kontakten importieren',
            //onPress: () => console.log('Pressed email'),
        },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
        if (open) {
            // do something if the speed dial is open
        }
        }}
    />
  );
};