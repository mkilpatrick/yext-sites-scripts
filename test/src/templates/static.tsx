import { useState } from 'react';

export const config = {
  name: 'static',
};

export const getPath = (data: any) => {
  return `static/${Math.random().toString()}`;
};

const Static = (props: any) => {
  const { document } = props.data;
  console.log(JSON.stringify(document));

  const [num, setNum] = useState<number>(0);

  return (
    <>
      <div>Hello from static</div>
      <button onClick={() => setNum(num + 1)}>Click me</button>
      Num: {num}
    </>
  );
};

export default Static;
