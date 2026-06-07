import { Outlet } from 'react-router';
import { AppProvider } from './components/context/AppContext';

export default function Root() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
}
