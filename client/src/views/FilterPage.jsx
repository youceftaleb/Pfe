import React from "react";
import { CardGroup,FilterForm } from "../components";
import ParentAccountLayout from "../layout/ParentAccountLayout";

const FilterPage = () => {
  return (
    <ParentAccountLayout>
      <FilterForm />
      <CardGroup />
    </ParentAccountLayout>
  );
};

export default FilterPage;
