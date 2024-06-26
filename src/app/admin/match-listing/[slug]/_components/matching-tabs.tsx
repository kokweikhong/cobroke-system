"use client";

import type { ExportListing, ListingWithJoins } from "@/types/listings";
import MatchingForm from "./matching.form";
import { FC, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";

type MatchingTabsProps = {
  data: ListingWithJoins;
};

const MatchingTabs: FC<MatchingTabsProps> = ({ data }) => {
  const [result, setResult] = useState<ExportListing[]>([]);
  const [activeTab, setActiveTab] = useState("matching-form");

  function handleMatchingResult() {
    console.log(result);
    let csv = Papa.unparse(result);
    let csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    let csvURL = window.URL.createObjectURL(csvData);
    let tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", `${data.listings.id}.csv`);
    tempLink.click();
  }

  return (
    <div>
      <div>
        <Tabs
          defaultValue={activeTab}
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-auto"
        >
          <TabsList className="flex flex-wrap gap-2 py-4 h-auto">
            <TabsTrigger value="matching-form">Matching Form</TabsTrigger>
            <TabsTrigger value="matching-result">Matching Result</TabsTrigger>
          </TabsList>

          <TabsContent value="matching-form">
            <MatchingForm
              data={data}
              setResult={setResult}
              setActiveTab={setActiveTab}
            />
          </TabsContent>
          <TabsContent value="matching-result">
            <div className="flex flex-col gap-4">
              <Button onClick={handleMatchingResult}>Export to CSV</Button>

              {/* Show total result */}
              <div>
                <p className="text-lg font-semibold">
                  Total Result: {result.length}
                </p>
              </div>

              {/* Show matching result */}
              <div className="flex flex-col gap-4 overflow-auto">
                {result.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <p className="text-lg font-semibold">Result {index + 1}</p>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(item).map(([key, value]) => (
                        <div key={key}>
                          <p className="text-sm font-semibold">{key}</p>
                          <p>{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MatchingTabs;
