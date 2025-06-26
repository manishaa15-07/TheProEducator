import Image from "next/image";
import TermsAndConditions from "./terms-and-conditions/page";
import PolicyNav from "./components/PolicyNav";
import PrivacyPolicy from "./privacy-policy/page";
import CareerPage from "./career/page";

export default function Home() {
  return (
    <>
      {/* <TermsAndConditions /> */}
      <PolicyNav />
      {/* <PrivacyPolicy /> */}
      <CareerPage />
    </>
  );
}
