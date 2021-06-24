import Content from "../../components/Content";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function Guest() {
  return (
    <div className="App">
      <Navbar logged={false} searchbar={true} />
      <div style={{ display: "flex", width: "100%" }}>
        <Sidebar />
        <Content />
      </div>
    </div>
  );
}

export default Guest;
