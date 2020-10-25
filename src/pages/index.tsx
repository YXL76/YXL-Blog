import { Layout, useScrollTrigger } from "../components";

export default function App() {
  const trigger = useScrollTrigger();
  return <Layout title="Index" trigger={trigger}></Layout>;
}
