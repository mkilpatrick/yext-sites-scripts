import { useState } from "react";

export const config = {
  name: "foo",
  hydrate: true,
  streamId: "products",
  stream: {
    "$id": "products",
    "source": "knowledgeGraph",
    "destination": "pages",
    "fields": [
      "name",
      "meta",
      "id",
      "uid"
    ],
    "filter": {
      "entityTypes": [
        "product"
      ]
    },
  },
};

const Foo = (props) => {
  const [num, setNum] = useState(0);

  return (
    <>
      <div>
        Hello from {props.name} wooo
      </div>
      <button onClick={() => setNum(num + 1)}>Click me</button>
      Num: {num}
    </>
  );
};

export default Foo;