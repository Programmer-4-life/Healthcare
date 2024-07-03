import React, { useEffect, useState } from "react";
import "../assets/styles/dashboard_grid.css";
import "../assets/styles/chart_grid.css";
import ChartGridCards from "./shared-components/ChartGridCards";
import { fetchUserDetails } from "../api/api";
import { useSelectedIndex } from "../context/SelectedIndexContext";
import { useErrorAndLoading } from "../context/ErrorLoadingContext";
import { jessicaTaylor } from "../data";
import LineChart from "./shared-components/LineChart";
import Table from "./shared-components/Table";

function Main() {
  const [data, setData] = useState(null);
  const { selectedIndex } = useSelectedIndex();
  const { setError, error, loading } = useErrorAndLoading();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchUserDetails();
        setData(userData);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };
    fetchUserData();
  }, [selectedIndex]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div id="dashboard_grid_child" className="main_div bg-transparent space-y-[1.5rem]">
      <div className="chartContainer rounded-[0.5rem] bg-custom-white w-full p-4">
        <h1 className="font-semibold text-2xl">Diagnostic History</h1>
        <div className="chartgrid_div mt-5">
          <div className="gridchild_div">
            <LineChart
              details={data && data.length > 1 ? data[selectedIndex] : null}
            />
          </div>
          {jessicaTaylor.map((item, index) => (
            <ChartGridCards
              key={index}
              index={index}
              icon={item.icon}
              title={item.title}
              value={item.value}
              status={item.statuses}
              arrowIcon={item.arrow}
            />
          ))}
        </div>
      </div>
      <div>
        <Table details={data.length > 1 && data[selectedIndex]} />
      </div>
    </div>
  );
}

export default Main;
