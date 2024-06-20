import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div className="signInUp">
        <SignUp path="/sign-up" />
      </div>
    </>
  )
}