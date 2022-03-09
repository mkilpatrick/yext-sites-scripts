export const config = {
  name: "Product Test",
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

const Test = () => {
    return (
      <div>
        Hello from testttttt
      </div>
    );
  };
  
  export default Test;