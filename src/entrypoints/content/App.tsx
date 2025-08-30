import React from "react";
import Home from "../../components/Home.jsx"

interface AppProps {
  text?: string;
}

const App: React.FC<AppProps> = ({ text }) => {
  if (text) {
    return <Home selection={text} />;
  }
};

export default App;
