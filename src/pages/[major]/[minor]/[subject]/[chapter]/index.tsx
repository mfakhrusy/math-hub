import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { LectureURLQuery } from "@/types/lectures";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllChapterFromSubject, getAllMajor, getAllMinorFromMajor, getAllSubjectFromMinor, getSiblingLectures } from "@/engine/lectures/lectures";
import { Layout } from "@/modules/layout";

type Props = {
  siblingLectures: Array<string>
}

export default function ChapterPage({siblingLectures}: Props) {
  const router = useRouter();
  const { major, minor, subject, chapter } = router.query as LectureURLQuery;
  const Component = dynamic<{boh: string}>(
    () => import(`../../../../../lectures/${major}/${minor}/${subject}/${chapter}/${chapter}.tsx`)
    .catch(() => {
      return () => <div> error </div>
    })
  );
  return (
  <Layout siblingLectures={siblingLectures}>
    <Component boh="beh" />
  </Layout>
  )
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allMajor = getAllMajor().map(({directory}) => directory);

  let allChapterPath = [];

  for (let i = 0; i < allMajor.length; i++) {
    const major = allMajor[i];
    const allMinor = getAllMinorFromMajor(major)?.map(({directory}) => directory) ?? [];

    for (let j = 0; j < allMinor.length; j++) {
      const minor = allMinor[j];
      const allSubject = getAllSubjectFromMinor(major, minor)?.map(({directory}) => directory) ?? [];

      for (let k = 0; k < allSubject.length; k++) {
        const subject = allSubject[k];
        const allChapter = getAllChapterFromSubject(major, minor, subject)?.map(({directory}) => directory) ?? [];

        for (let l = 0; l < allChapter.length; l++) {
          const chapterPath = {
            params: {
              major,
              minor,
              subject,
              chapter: allChapter[l]
            }
          }

          allChapterPath.push(chapterPath)
        }
      }
    }
  };

  return { paths: allChapterPath, fallback: false }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const query = context.params as LectureURLQuery;

  const siblingLectures = getSiblingLectures('chapter', query)

  return {
    props: {
      siblingLectures
    }
  }
};

