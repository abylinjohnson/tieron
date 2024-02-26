import BackNav from "../components/BackNav";
import { useAuthenticationStatus, NhostProvider } from "@nhost/react";
import { nhost } from "../lib/nhost";
import CreateContainer from "../components/CreateContainer";

  
function CreatePage() {
        return(<>
        <BackNav/>
        <CreateContainer/>
        </>)
  }
  
  export default CreatePage;