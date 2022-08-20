import Header from "./components/Header";
import Newcomplaint from "./components/Newcomplaint";
import Qrscanner from "./components/Qrscanner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Nopage from "./components/Nopage";

function App() {
  return (
    <div className="min-h-screen text-slate-800 bg-slate-200 dark:bg-slate-800 dark:text-slate-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="qrscanner" element={<Qrscanner />} />
            <Route path="newcomplaint" element={<Newcomplaint />} />
            <Route path="*" element={<Nopage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
