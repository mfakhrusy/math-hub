import {
  getAllMajor,
  getAllMinorFromMajor,
  getAllSubjectFromMinor,
  getSiblingLectures,
} from "@/engine/lectures/lectures";
import { LecturesLayout } from "@/modules/lectures";
import { LectureURLQuery } from "@/types/lectures";
import { GetStaticPaths, GetStaticProps } from "next";

type Props = {
  siblingLectures: Array<string>;
};

export default function SubjectPage({ siblingLectures }: Props) {
  return (
    <LecturesLayout siblingLectures={siblingLectures}>
      subject page
    </LecturesLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allMajor = getAllMajor();

  let allSubjectPaths = [];

  for (let i = 0; i < allMajor.length; i++) {
    const major = allMajor[i];
    const allMinor = getAllMinorFromMajor(major) ?? [];

    for (let j = 0; j < allMinor.length; j++) {
      const minor = allMinor[j];
      const allSubject = getAllSubjectFromMinor(major, minor) ?? [];

      for (let k = 0; k < allSubject.length; k++) {
        const subjectPath = {
          params: {
            major,
            minor,
            subject: allSubject[k],
          },
        };

        allSubjectPaths.push(subjectPath);
      }
    }
  }

  return { paths: allSubjectPaths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const query = context.params as LectureURLQuery;

  const siblingLectures = getSiblingLectures("subject", query);

  return {
    props: {
      siblingLectures,
    },
  };
};
