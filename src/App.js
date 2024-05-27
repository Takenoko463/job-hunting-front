import React from "react";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import JobHuntingStatuses from "./components/JobHuntingStatuses";
import Container from "react-bootstrap/Container";
import { Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <Container fluid="md">
          <Routes>
            <Route
              path="/user/:id"
              element={<JobHuntingStatuses/>}
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
