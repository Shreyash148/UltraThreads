import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import Image from "next/image"
import { shadesOfPurple } from '@clerk/themes';

const Topbar = () => {
  const { userId } = auth();
  return (
    <>
      <section className="topbar md:hidden">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/logo.svg"
            alt="ultra threads"
            width={35} height={35}
          />
          <div className="text-heading3-bold text-light-1 max-xs:hidden">
            UltraThreads
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="block md:hidden">
            {userId ?
              <div>
                <SignOutButton>
                  <Image
                    src="/assets/logout.svg"
                    alt="logout"
                    width={24} height={24}
                  />
                </SignOutButton>
              </div> : ""
            }

          </div>
          {/* <OrganizationSwitcher appearance={{ elements: { organizationSwitcherTrigger: "px-4 py-2" }, baseTheme: shadesOfPurple }} /> */}
        </div>
      </section>
    </>
  )
}

export default Topbar