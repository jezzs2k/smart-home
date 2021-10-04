import {useState} from 'react';
import {GestureResponderEvent} from 'react-native';

export default function useToggle(
  defaultValue: boolean,
): [boolean, (value?: boolean) => any] {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(value?: boolean) {
    setValue(currentValue =>
      typeof value === 'boolean' ? value : !currentValue,
    );
  }

  return [value, toggleValue];
}
