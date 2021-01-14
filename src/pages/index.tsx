import { GetStaticProps } from "next";
import { HomeView } from "@/modules/home";
import { getAllMajor } from "@/engine/lectures/lectures";
import { getAllTools } from "@/engine/tools/tools";
import { ReactElement } from "react";

type Props = {
  allMajor: Array<string>;
  allTools: Array<string>;
};

export default function Home({ allMajor, allTools }: Props): ReactElement {
  return <HomeView allMajor={allMajor} allTools={allTools} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const allMajor = getAllMajor();
  const allTools = getAllTools();

  return {
    props: {
      allMajor,
      allTools,
    },
  };
};
