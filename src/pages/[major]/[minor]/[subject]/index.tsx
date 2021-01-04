import { getAllMajor, getAllMinorFromMajor, getAllSubjectFromMinor, getSiblingLectures } from "@/engine/lectures/lectures";
import { Layout } from "@/modules/layout";
import { LectureURLQuery } from "@/types/lectures";
import { GetStaticPaths, GetStaticProps } from "next";

type Props = {
  siblingLectures: Array<string>
}

export default function SubjectPage({siblingLectures}: Props) {
  return (
    <Layout siblingLectures={siblingLectures}>
      subject page
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allMajor = getAllMajor().map(({directory}) => directory);

  let allSubjectPaths = [];

  for (let i = 0; i < allMajor.length; i++) {
    const major = allMajor[i];
    const allMinor = getAllMinorFromMajor(major)?.map(({directory}) => directory) ?? [];

    for (let j = 0; j < allMinor.length; j++) {
      const minor = allMinor[j];
      const allSubject = getAllSubjectFromMinor(major, minor)?.map(({directory}) => directory) ?? [];

      for (let k = 0; k < allSubject.length; k++) {
        const subjectPath = {
          params: {
            major,
            minor,
            subject: allSubject[k]
          }
        }

        allSubjectPaths.push(subjectPath);
      }
    }
  }

  return { paths: allSubjectPaths, fallback: false }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const query = context.params as LectureURLQuery;

  const siblingLectures = getSiblingLectures('subject', query)

  return {
    props: {
      siblingLectures
    }
  }
};
