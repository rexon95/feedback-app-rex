import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FeedbackProvider } from './context/FeedbackContext';
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import AboutPage from './pages/AboutPage';
import AboutIcon from './components/AboutIcon';

function App() {

    return (
        <>
            <FeedbackProvider>
                <Router>
                    <Header />
                    <div className="container">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <>
                                        <FeedbackForm  />
                                        <FeedbackStats />
                                        <FeedbackList
                                        />
                                    </>
                                }
                            />
                            <Route path="/about" element={<AboutPage />} />
                        </Routes>
                        <AboutIcon />
                    </div>
                </Router>
            </FeedbackProvider>
        </>
    );
}

export default App;
