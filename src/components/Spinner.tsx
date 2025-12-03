import type { CSSProperties } from "react";
import { BeatLoader } from "react-spinners";

 const override: CSSProperties = {
   margin: "auto",
 };


export default function Spinner() {
  return (
      <BeatLoader size={20} cssOverride={override} color="#F17300"/>
  )
}
