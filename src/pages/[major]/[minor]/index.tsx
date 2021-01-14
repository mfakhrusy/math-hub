import {
  getAllMajor,
  getAllMinorFromMajor,
  getSiblingLectures,
} from "@/engine/lectures/lectures";
import { LecturesLayout } from "@/modules/lectures";
import { LectureURLQuery } from "@/types/lectures";
import { GetStaticPaths, GetStaticProps } from "next";
import { ReactElement } from "react";

type Props = {
  siblingLectures: Array<string>;
};

export default function MinorPage({ siblingLectures }: Props): ReactElement {
  return (
    <LecturesLayout siblingLectures={siblingLectures}>
      minor page
    </LecturesLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allMajor = getAllMajor();

  const allMinorPaths = [];

  for (let i = 0; i < allMajor.length; i++) {
    const major = allMajor[i];
    const allMinor = getAllMinorFromMajor(major) ?? [];

    for (let j = 0; j < allMinor.length; j++) {
      const minorPath = {
        params: {
          major,
          minor: allMinor[j],
        },
      };

      allMinorPaths.push(minorPath);
    }
  }

  return { paths: allMinorPaths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const query = context.params as LectureURLQuery;

  const siblingLectures = getSiblingLectures("minor", query);

  return {
    props: {
      siblingLectures,
    },
  };
};
