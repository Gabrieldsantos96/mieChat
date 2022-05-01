import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import { getItem } from './localStorage';
import { Provider } from './contexts/userContext';

function ProtectedRoutes({ redirectTo }) {
  const isAuthenticated = getItem('token');
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRoutes() {
  return (
    <Provider>
    <Routes>
       <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoutes redirectTo='/login' />}>
         <Route path="/" element={<Home />} />
      </Route>
</Routes>
    </Provider>

  );
}

export default MainRoutes;