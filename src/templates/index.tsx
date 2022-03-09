export const getServerSideProps = () => {
    return { message: "Hello from the server!" };
  };

  export const config = {
    name: "index",
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
  
  type Props = {
    message: string;
  };
  
  const Homepage = ({ message }: Props) => {
    return <div onClick={() => console.log("hello")}>{message}</div>;
  };
  
  export default Homepage;