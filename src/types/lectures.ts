export interface LectureURLQuery {
  major?: string;
  minor?: string;
  subject?: string;
  chapter?: string;
};

export type LectureLevel = (keyof LectureURLQuery) | null;
