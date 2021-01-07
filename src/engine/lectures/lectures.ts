import fs from "fs";
import { LectureLevel, LectureURLQuery } from "@/types/lectures";

type Directory = {
  directory: string;
  filename: string;
};

export function getAllMajor(): Array<string> {
  const folders = fs
    .readdirSync?.(`${process.cwd()}/src/lectures`, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map(({ name }) => name);

  return folders;
}

export function getAllMinorFromMajor(major?: string): Array<string> | null {
  if (!major) {
    return null;
  }

  const folders = fs
    .readdirSync?.(`${process.cwd()}/src/lectures/${major}`, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory())
    .map(({ name }) => name);

  return folders;
}

export function getAllSubjectFromMinor(
  major?: string,
  minor?: string
): Array<string> | null {
  if (!major || !minor) {
    return null;
  }
  const folders = fs
    .readdirSync?.(`${process.cwd()}/src/lectures/${major}/${minor}`, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory())
    .map(({ name }) => name);

  return folders;
}

export function getAllChapterFromSubject(
  major?: string,
  minor?: string,
  subject?: string
): Array<string> | null {
  if (!major || !minor || !subject) {
    return null;
  }
  const folders = fs
    .readdirSync?.(
      `${process.cwd()}/src/lectures/${major}/${minor}/${subject}`,
      { withFileTypes: true }
    )
    .filter((dirent) => dirent.isDirectory())
    .map(({ name }) => name);

  return folders;
}

export function getLectureLevel(urlQuery?: LectureURLQuery): LectureLevel {
  if (urlQuery?.chapter) {
    return "chapter";
  } else if (urlQuery?.subject) {
    return "subject";
  } else if (urlQuery?.minor) {
    return "minor";
  } else if (urlQuery?.major) {
    return "major";
  } else {
    return null;
  }
}

export function getParentLectureLevel(
  lectureLevel: LectureLevel
): LectureLevel {
  switch (lectureLevel) {
    case "chapter":
      return "subject";
    case "subject":
      return "minor";
    case "minor":
      return "major";
    case "major":
      return null;
    default:
      return null;
  }
}

export function getSiblingLectures(
  lectureLevel: LectureLevel,
  urlQuery: LectureURLQuery
): Array<string> {
  switch (lectureLevel) {
    case "major":
      return getAllMajor();
    case "minor":
      return getAllMinorFromMajor(urlQuery.major) ?? [];
    case "subject":
      return getAllSubjectFromMinor(urlQuery.major, urlQuery.minor) ?? [];
    case "chapter":
      return (
        getAllChapterFromSubject(
          urlQuery.major,
          urlQuery.minor,
          urlQuery.subject
        ) ?? []
      );
    default:
      return [];
  }
}
