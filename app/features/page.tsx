import { FeatureExplorer } from "../../components/FeatureExplorer";
import { Reveal } from "../../components/Reveal";
import { Ticks } from "../../components/Ticks";
import { features } from "../../lib/features";

export const metadata = { title: "Features · Ashen" };

export default function Features() {
  return (
    <main className="wrap sect">
      <Reveal><h1 className="ptitle">Features</h1></Reveal>
      <Ticks />
      <Reveal><FeatureExplorer features={features} /></Reveal>
    </main>
  );
}
