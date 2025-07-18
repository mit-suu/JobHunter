import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

// Component này sẽ thay thế hoàn toàn nút Google mặc định
function GoogleCustomLogin({ onLoginSuccess, onLoginError }) {
  const [isLoading, setIsLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );
        onLoginSuccess(userInfo.data);
      } catch (err) {
        onLoginError();
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      onLoginError();
      setIsLoading(false);
    },
  });

  const handleButtonClick = () => {
    setIsLoading(true);
    login();
  };

  return (
    <button
      type="button"
      onClick={handleButtonClick}
      disabled={isLoading}
      className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
      ) : (
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" className="h-6 w-6" />
      )}
      <span>{isLoading ? 'Processing...' : 'Sign in with Google'}</span>
    </button>
  );
}

export default GoogleCustomLogin;