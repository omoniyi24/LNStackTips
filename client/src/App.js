import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
    return (
        <Router>
            <div className="flex flex-col justify-between h-screen">
                <Navbar/>
                <main className='container mx-auto px-3'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/help' element={<Help />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/signIn' element={<SignIn />} />
                        <Route path='/signUp' element={<SignUp />} />
                        <Route path='/*' element={<NotFound />} />
                    </Routes>
                </main>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
