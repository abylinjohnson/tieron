'use client'
import { useState } from 'react';
import { useSignInEmailPassword, useAuthenticationStatus } from '@nhost/nextjs';
import { NhostProvider } from "@nhost/nextjs";
import { nhost } from '@/lib/nhost';

function App() {
  return (
    <NhostProvider nhost={nhost}>
      <Login />
    </NhostProvider>
  );
}

function Login() {
  // const { login } = useNhostAuth();
  const isAuthenticated = useAuthenticationStatus();
  console.log("auth status",nhost.auth.isAuthenticated())
  const {
    signInEmailPassword,
    needsEmailVerification,
    isLoading,
    isSuccess,
    isError,
    error
  } = useSignInEmailPassword()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log(email, password)
    try {
      const data = await nhost.auth.signIn({email:email, password:password})
      console.log(data)
      if(!data.isError){
        alert("Login Sccessfull")
      }else{
        alert(error)
      }
    } catch (error) {
      console.log(error)
    }
  };

  if (isLoading) {
    return <div>Loading</div>
  } else {
    return (
      <NhostProvider nhost={nhost}>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h2 className="text-center text-3xl font-extrabold text-gray-900">Welcome Back to Tieron</h2>
              <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign In
                  </button>
                </div>
              </form>
              <div className="text-sm text-center p-5">
                <p className="text-gray-600">New To Tieron?</p>
                <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                  register
                </a>
              </div>
            </div>
          </div>
        </div>
      </NhostProvider>
    );
  }
}

export default App