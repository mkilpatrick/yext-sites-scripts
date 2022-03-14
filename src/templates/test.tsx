import { GetServerSideProps } from "../../react-sites-scripts/ssr/types";

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

// export const getServerSideProps: GetServerSideProps = async () => {
//   const cogData = fs.readFileSync('localData/fastfood__631a91f020286f3ddf808a2dd52ce209.json')
  
//   return JSON.parse(cogData.toString());
// };

const Test = (props: any) => {
  return (
    <div>
      Hello from {props.name}
    </div>
  );
};

export default Test;