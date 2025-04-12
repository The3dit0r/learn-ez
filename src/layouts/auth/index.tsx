import { SecButton } from "@components/buttons";
import { Padder } from "@components/others";

import { useUserData } from "@context/user";
import { authService } from "@models/auth";

export default function LoginPanel() {
  const { setUser } = useUserData();

  async function handleClick() {
    const user = await authService.loginWithGoogle();
    setUser(user);
  }

  return (
    <div className="content-wrapper flex aictr jcctr coll" style={{ gap: 32 }}>
      <img src={location.origin + "/assets/logo.svg"} />
      <h1>LearnEZ</h1>

      <p style={{ fontSize: "1.4em", width: 500 }} className="tactr">
        A platform that generates interactive roadmaps and questions
        automatically from documents.
      </p>
      <div>
        <div style={{ fontSize: "1.4em" }}>Please login to use this app</div>
        <Padder height={32} />
        <SecButton onClick={handleClick}>Login</SecButton>
      </div>
    </div>
  );
}
