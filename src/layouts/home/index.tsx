import { WarnButton } from "@components/buttons";
import { Padder } from "@components/others";

import { UnavailablePreviewPanel } from "@layouts/others";
import { useUserData } from "@context/user";
import { getAuth, signOut } from "firebase/auth";

type Props = {};

export function HomePanel({}: Props) {
  const { user } = useUserData();

  if (!user) return <></>;

  return (
    <div className="content-wrapper flex coll">
      <Padder height={64} />

      <div style={{ gap: 32 }} className="flex aictr">
        {!user.photoURL || (
          <img src={user.photoURL} style={{ borderRadius: 64 }} />
        )}

        <div className="flex coll flex-1" style={{ gap: 8 }}>
          <div style={{ fontSize: "1.35em" }}>Welcome back</div>
          <h1 className="username-greet">{user?.displayName}</h1>
        </div>

        <WarnButton
          onClick={() => {
            signOut(getAuth());
          }}
        >
          Log out
        </WarnButton>
      </div>

      <UnavailablePreviewPanel />
    </div>
  );
}
