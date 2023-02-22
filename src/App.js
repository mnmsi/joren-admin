import Layout from './Layout/Layout';
import Route from './Routes/Route';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
function App() {
  const { pathname } = useLocation();
  const [isAuth, setAuth] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    let token = localStorage.getItem('joren_token') ?? null;
    axios
      .get(process.env.REACT_APP_API_URL + '/api/admin/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setAuth(true);
        } else {
          localStorage.removeItem('joren_token');
          setAuth(false);
          navigate('/login');
        }
      })
      .catch((err) => {
        if (err) {
          localStorage.removeItem('joren_token');
          setAuth(false);
          navigate('/login');
        }
      });
  }, [pathname]);
  return (
    <div className='App'>
      <Layout>
        <Route auth={isAuth} />
      </Layout>
    </div>
  );
}

export default App;
