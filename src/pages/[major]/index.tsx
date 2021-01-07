import { getAllMajor, getSiblingLectures } from "@/engine/lectures/lectures";
import { LecturesLayout } from "@/modules/lectures/components/LecturesLayout";
import { LectureURLQuery } from "@/types/lectures";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";

type Props = {
  siblingLectures: Array<string>;
};

export default function MajorPage({ siblingLectures }: Props) {
  return (
    <LecturesLayout siblingLectures={siblingLectures}>
      major page
    </LecturesLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allMajorPaths = getAllMajor().map((major) => ({
    params: {
      major,
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
