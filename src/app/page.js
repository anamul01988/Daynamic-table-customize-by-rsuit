import Image from "next/image";
import { Button, SelectPicker } from "rsuite";
import { DynamicColumn } from "./dynamicColumn";
const data = ["First Column", "Second Column", "Last Value"].map((item) => ({
  label: item,
  value: item,
}));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="dynamic_content__column-selection" style={{ width: 624 }}>
        {/* <SelectPicker data={data} style={{ width: 224 }} /> */}
        <DynamicColumn />
      </div>
    </main>
  );
}
