import BillboardClients from "./components/billboard-client";

const Billboards = () => {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-7 pt-7">
        <BillboardClients />
      </div>
    </div>
  );
};

export default Billboards;
