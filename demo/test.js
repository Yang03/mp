import MP from '../lib/mp';

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

const Component = () => (
  <div>
    {'<ClickComponent />'}
with useState below
    <ClickComponent />
  </div>
);

Page({
  data: {
    $$REACT_MINI_APP_ROOT: [
    ],
  },

  onReady() {
    MP.render(<Component />, this);
  },

});
