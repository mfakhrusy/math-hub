import { getAllMajor, getSiblingLectures } from "@/engine/lectures/lectures";
import { Layout } from "@/modules/layout";
import { LectureURLQuery } from "@/types/lectures";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";

type Props = {
  siblingLectures: Array<string>;
};

export default function MajorPage({ siblingLectures }: Props) {
  return <Layout siblingLectures={siblingLectures}>major page</Layout>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allMajorPaths = getAllMajor().map(({ directory }) => ({
    params: {
      major: directory,
    },
  }));

  return { paths: allMajorPaths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const query = context.params as LectureURLQuery;

  const siblingLectures = getSiblingLectures("major", query);

  return {
    props: {
      siblingLectures,
    },
  };
};
