import { getAllMajor, getAllMinorFromMajor, getSiblingLectures } from "@/engine/lectures/lectures";
import { Layout } from "@/modules/layout";
import { LectureURLQuery } from "@/types/lectures";
import { GetStaticPaths, GetStaticProps } from "next";

type Props = {
  siblingLectures: Array<string>
}

export default function MinorPage({siblingLectures}: Props) {
  return (
    <Layout sidebarItems={siblingLectures}>
      minor page
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allMajor = getAllMajor().map(({directory}) => directory);

  let allMinorPaths = [];

  for (let i = 0; i < allMajor.length; i++) {
    const major = allMajor[i];
    const allMinor = getAllMinorFromMajor(major)?.map(({directory}) => directory) ?? [];

    for (let j = 0; j < allMinor.length; j++) {

      const minorPath = {
        params: {
          major,
          minor: allMinor[j]
        }
      }

      allMinorPaths.push(minorPath);
    }
  }

  return { paths: allMinorPaths, fallback: false }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const query = context.params as LectureURLQuery;

  const siblingLectures = getSiblingLectures('minor', query)

  return {
    props: {
      siblingLectures
    }
  }
};
