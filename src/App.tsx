import React, { Suspense } from 'react';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/LoadingScreen';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        <AppRoutes />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
