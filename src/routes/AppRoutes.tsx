import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import TopicsPage from '../pages/TopicsPage';
import LessonGeneratorPage from '../pages/LessonGeneratorPage';
import QuizGeneratorPage from '../pages/QuizGeneratorPage';
import WorksheetPage from '../pages/WorksheetPage';
import RubricPage from '../pages/RubricPage';
import TextToolsPage from '../pages/TextToolsPage';
import ProgressPage from '../pages/ProgressPage';
import AdminPage from '../pages/AdminPage';
import PlatformAdminPage from '../pages/PlatformAdminPage';
import SettingsPage from '../pages/SettingsPage';
import NotFoundPage from '../pages/NotFoundPage';

interface Props {
  layout: React.ReactNode;
}

const AppRoutes: React.FC<Props> = ({ layout }) => {
  return (
    <Routes>
      <Route element={layout}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/lesson-generator" element={<LessonGeneratorPage />} />
        <Route path="/quiz-generator" element={<QuizGeneratorPage />} />
        <Route path="/worksheet" element={<WorksheetPage />} />
        <Route path="/rubric" element={<RubricPage />} />
        <Route path="/text-tools" element={<TextToolsPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/platform-admin" element={<PlatformAdminPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
