import type { CSSProperties } from "react";
import { BeatLoader } from "react-spinners";

const override: CSSProperties = {
  margin: "auto",
};


export default function Spinner() {
  return (
    <div className="flex justify-center items-center py-20">
      <BeatLoader size={20} cssOverride={override} color="#4f46e5" />
    </div>
  )
}
