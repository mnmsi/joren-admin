import Layout from './Layout/Layout';
import Route from './Routes/Route';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
function App() {
  const [isAuth, setAuth] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
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
      });
  }, []);
  return (
    <div className='App'>
      <Layout>
        <Route auth={isAuth} />
      </Layout>
    </div>
  );
}

export default App;
