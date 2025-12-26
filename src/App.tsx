import GlobalProvider from "./components/GlobalProvider";
import MainRouter from "./router/MainRouter";

function App() {
  return (
    <div className="h-screen w-screen">
      <GlobalProvider>
        <MainRouter />
      </GlobalProvider>
    </div>
  );
}

export default App;
