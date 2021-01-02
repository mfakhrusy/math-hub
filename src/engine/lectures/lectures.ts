import { LectureLevel, LectureURLQuery } from '@/types/lectures';
import fs from 'fs';

type Directory = {
  directory: string;
  filename: string;
};

export function getAllMajor(): Array<Directory> {
  const folders = fs
    .readdirSync?.(`${process.cwd()}/src/lectures`, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(({name}) => ({
      directory: name,
      filename: `${name}.md`,
    }));

  return folders;
};

export function getAllMinorFromMajor(major?: string): Array<Directory> | null {
  if (!major) {
    return null
  };

  const folders = fs
    .readdirSync?.(`${process.cwd()}/src/lectures/${major}`, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(({name}) => ({
      directory: name,
      filename: `${name}.md`,
    }));

  return folders;
};

export function getAllSubjectFromMinor(major?: string, minor?: string): Array<Directory> | null {
  if (!major || !minor) {
    return null
  }
  const folders = fs
    .readdirSync?.(`${process.cwd()}/src/lectures/${major}/${minor}`, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(({name}) => ({
      directory: name,
      filename: `${name}.md`,
    }));

  return folders;
};

export function getAllChapterFromSubject(major?: string, minor?: string, subject?: string): Array<Directory> | null {
  if (!major || !minor || !subject) {
    return null
  }
  const folders = fs
    .readdirSync?.(`${process.cwd()}/src/lectures/${major}/${minor}/${subject}`, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(({name}) => ({
      directory: name,
      filename: `${name}.md`,
    }));

  return folders;
};

export function getLectureLevel(urlQuery?: LectureURLQuery): LectureLevel {
  if (urlQuery?.chapter) {
    return "chapter"
  } else if (urlQuery?.subject) {
    return "subject"
  } else if (urlQuery?.minor) {
    return "minor"
  } else if (urlQuery?.major) {
    return "major"
  } else {
    return null;
  }
};

export function getSiblingLectures(lectureLevel: LectureLevel, urlQuery: LectureURLQuery): Array<string> {
  switch (lectureLevel) {
    case 'major':
      return getAllMajor()?.map(({directory}) => directory);
    case 'minor':
      return getAllMinorFromMajor(urlQuery.major)?.map(({directory}) => directory) ?? [];
    case 'subject':
      return getAllSubjectFromMinor(urlQuery.major, urlQuery.minor)?.map(({directory}) => directory) ?? [];
    case 'chapter':
      return getAllChapterFromSubject(urlQuery.major, urlQuery.minor, urlQuery.subject)?.map(({directory}) => directory) ?? [];
    default:
      return []
  }
}