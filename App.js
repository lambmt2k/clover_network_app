import { Provider } from "react-redux";
import { persistor, store } from "./Store";
import Routes from "./Routes";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
