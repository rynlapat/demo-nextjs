import { useEffect } from "react";
import { useRouter } from "next/router";

function Callback() {
  const router = useRouter();

  useEffect(() => {
    const { Auth0 } = require("@auth0/auth0-react");

    const auth0 = new Auth0({
      domain: "dev-o7zbf66yw7vld355.us.auth0.com",
      clientId: "BaYX9qnOtr4xvejkNPXji4QeIcmzf6n0",
      redirectUri: `${window.location.origin}/callback`,
    });

    auth0.handleRedirectCallback().then(() => {
      router.push("/home");
    });
  }, []);

  return <div>Redirecting...</div>;
}

export default Callback;
