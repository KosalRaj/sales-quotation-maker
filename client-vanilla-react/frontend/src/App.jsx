import QuotationTable from "./components/QuotationTable";
import { lineItems } from "./lineItems";
import "./App.css";

function App() {
  return (
    <div className="App">
      <QuotationTable lineItems={lineItems} />
    </div>
  );
}

export default App;
