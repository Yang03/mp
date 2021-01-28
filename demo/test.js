import MP from '../lib/mp';

import Component from '../lib/components'

const { View, Text } = Component
console.log(Text, View)

const {
  React,
  useState,
} = MP;

const ClickComponent = () => {
  const [count, setCount] = MP.useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div onClick={handleClick}>
    CLICK
      {count}
    times
    </div>
  );
};

const Demo = () => (
  <View>
    test
    <Text>text</Text>
  </View>
);

Page({
  data: {
    $$REACT_MINI_APP_ROOT: [
    ],
  },

  onReady() {
    MP.render(<Demo />, this);
  },

});
