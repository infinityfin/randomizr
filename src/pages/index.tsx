import { AllowAccount, Connect, NetworkSwitcher } from "../components";
import { useIsMounted } from "../hooks";

const Page = () => {
  const isMounted = useIsMounted();

  if (!isMounted) return null;
  return (
    <>
      <Connect />
      <AllowAccount />
      <NetworkSwitcher />
      <span className="processBtn"></span>
    </>
  );
};

export default Page;
