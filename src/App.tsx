import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Units from './pages/Units';
import LessonPage from './pages/LessonPage';
import Progress from './pages/Progress';
import WizardLessonPage from './pages/WizardLessonPage';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="pb-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/units" element={<Units />} />
              <Route path="/units/:unitId" element={<LessonPage />} />
              <Route path="/lessons/:lessonId" element={<WizardLessonPage />} />
              <Route path="/progress" element={<Progress />} />
            </Routes>
          </main>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}
