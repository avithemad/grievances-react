import Header from "./components/Header";
import Newcomplaint from "./components/Newcomplaint";
import Qrscanner from "./components/Qrscanner";

function App() {
  return (
    <div className="min-h-screen text-slate-800 bg-slate-200 dark:bg-slate-800 dark:text-slate-100">
      <Header />
      <Newcomplaint />
      <Qrscanner />
    </div>
  );
}

export default App;
