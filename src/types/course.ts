export type Course = {
  slug: string;
  meta: CourseMeta;
};

export type CourseMeta = {
  private: boolean;
  title: string;
  date: Date;
  description: string;
  cover: StaticImageData | string;
};
