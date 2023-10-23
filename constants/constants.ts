import { SidebarLink, TagProps } from "@/types";

export const themeOptions = [
  { value: "light", label: "Light", iconPath: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", iconPath: "/assets/icons/moon.svg" },
  { value: "system", label: "System", iconPath: "/assets/icons/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },
  {
    imgURL: "/assets/icons/suitcase.svg",
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};

export const HotQuestions = [
  { _id: 1, title: "How do I use express as a custom server in NextJS?" },
  { _id: 2, title: "Cascading Deletes in SQLAlchemy?" },
  { _id: 3, title: "How to Perfectly Center a Div with Tailwind CSS?" },
  {
    _id: 4,
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  },
  { _id: 5, title: "Redux Toolkit Not Updating State as Expected" },
];

export const PopularTags: TagProps[] = [
  { _id: "1", name: "javascript", totalQuestions: 5 },
  { _id: "2", name: "react", totalQuestions: 5 },
  { _id: "3", name: "next", totalQuestions: 5 },
  { _id: "4", name: "vue", totalQuestions: 2 },
  { _id: "5", name: "redux", totalQuestions: 10 },
];
