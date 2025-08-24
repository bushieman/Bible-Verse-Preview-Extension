import React from "react";
import Home from "../../components/Home.jsx"

interface AppProps {
  text?: string;
}

const App: React.FC<AppProps> = ({ text }) => {
  console.log(text, "Text in App component");
  if (text) {
    return <Home selection={text} />;
  }
};

export default App;
