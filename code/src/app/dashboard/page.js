'use client'
import Navbar from "../components/Navbar";
import { useAuthenticationStatus, NhostProvider } from "@nhost/nextjs";
import { nhost } from "@/lib/nhost";
function App() {
    return (
      <NhostProvider nhost={nhost}>
        <Dashboard />
      </NhostProvider>
    );
  }
  
  function Dashboard() {
    const isAuthenticated = useAuthenticationStatus();
    console.log("auth status",nhost.auth.isAuthenticated())
    if(isAuthenticated){
        return(<>
        <Navbar/>
        </>)
    }
  }
  
  export default App