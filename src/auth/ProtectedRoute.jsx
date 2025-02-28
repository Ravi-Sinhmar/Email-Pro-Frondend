import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { authState } from '@/states/atoms/auth';

function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/check-tokens', {
          method: 'GET',
          credentials: 'include', // Include cookies for authentication
        });
   

        if (response.ok) {
        response.json().then((data)=>{
          console.log(data);
          if(data.hasValidJWT){
            setIsAuth(true)
          }else{
            window.location.href = 'http://localhost:3000/auth'
          }
        });
        } else {
          setIsAuth(false); // Update Recoil state
          navigate('/'); // Redirect to home page if not authenticated
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuth(false); // Update Recoil state
        navigate('/'); // Redirect to home page on error
      }
    };

    checkAuth();
  }, [navigate, setIsAuth]);

  // Render children only if authenticated
  return isAuth ? children : null;
}

export default ProtectedRoute;