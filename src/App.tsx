import { Route, Routes } from "react-router-dom"

// import AppLayout from "./components/AppLayout"
// import About from "./pages/About"
// import CaseStudy from "./pages/CaseStudy"
// import Home from "./pages/Home"

import HoldingPage from "./pages/HoldingPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HoldingPage />} />

      {/* Full portfolio routes — uncomment when ready
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/case-study/:slug" element={<CaseStudy />} />
      </Route>
      */}

      <Route
        path="*"
        element={
          <main className="min-h-screen bg-amber-100 p-10 text-slate-900">
            <h1 className="text-4xl font-bold">Route not found</h1>
            <p className="mt-4 text-lg">
              The router rendered, but this URL did not match a page.
            </p>
          </main>
        }
      />
    </Routes>
  )
}

export default App
