import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
    <div className="signInUp">
      <SignIn path="/sign-in" />
    </div>
  </>
);
}