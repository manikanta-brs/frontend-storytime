import AuthorsList from "../components/authors/AuthorsList";

const authorsList = [
  {
    id: 1,
    url: "./images/image.png",
    name: "sam",
    publisher: "someone1",
  },
  {
    id: 2,
    url: "./images/image.png",
    name: "john",
    publisher: "someone2",
  },

  {
    id: 3,
    url: "./images/image.png",
    name: "sarah",
    publisher: "someone3",
  },

  {
    id: 4,
    url: "./images/image.png",
    name: "jane",
    publisher: "someone4",
  },

  {
    id: 5,
    url: "./images/image.png",
    name: "bill",
    publisher: "someone5",
  },

  {
    id: 6,
    url: "./images/image.png",
    name: "tom",
    publisher: "someone6",
  },

  {
    id: 7,
    url: "./images/image.png",
    name: "sarah",
    publisher: "someone7",
  },

  {
    id: 8,
    url: "./images/image.png",
    name: "mike",
    publisher: "someone8",
  },

  {
    id: 9,
    url: "./images/image.png",
    name: "jerry",
    publisher: "someone9",
  },

  {
    id: 10,
    url: "./images/image.png",
    name: "peter",
    publisher: "someone10",
  },

  {
    id: 11,
    url: "./images/image.png",
    name: "jerry",
    publisher: "someone11",
  },

  {
    id: 12,
    url: "./images/image.png",
    name: "jerry",
    publisher: "someone12",
  },
];
AuthorsList;
const AuthosPage = () => {
  return (
    <div className="container mx-auto mt-5 px-5">
      <AuthorsList authors={authorsList} />
    </div>
  );
};

export default AuthosPage;
