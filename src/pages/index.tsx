import { Layout, useScrollTrigger } from "../components";

export default function App() {
  const trigger = useScrollTrigger();
  return <Layout trigger={trigger}>Index</Layout>;
}
