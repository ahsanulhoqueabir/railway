import Featured from "@/Components/Home/Featured";
import Instructions from "@/Components/Home/Instructions";
import PaymentOptions from "@/Components/Home/PaymentOptions";
import SearchSection from "@/Components/Home/SearchSection";
import { setTitle } from "@/utilities/funtions";

const Home = () => {
  setTitle("Home");
  return (
    <div>
      <SearchSection />
      <Featured />
      <Instructions />
      <PaymentOptions />
    </div>
  );
};

export default Home;
