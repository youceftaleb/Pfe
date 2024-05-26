import { Navbar } from "../components";
import FilterPage from "../views/FilterPage";

const ParentAccountLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default ParentAccountLayout;
