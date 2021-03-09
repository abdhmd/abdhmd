import Link from "next/link";
import Title from "../../components/Title";
import workStyle from "../../styles/Works.module.css";
import Image from "next/Image";

// import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getStaticProps() {
  //Fetch the products
  const work_res = await fetch(`${API_URL}/works/`);
  const works = await work_res.json();

  //Return the products as props
  return {
    props: {
      works,
    },
  };
}

const Works = ({ works }) => {
  return (
    <section>
      <div className="container">
        <Title title={"my works"} />
        <main className={workStyle.main}>
          {works.map((work) => (
            <span key={work.id}>
              <Link href={`/works/${work.id}`} className="btn">
                <a>{work.title}</a>
              </Link>
              {work.image.map((img) => {
                return (
                  <Image
                    key={img.id}
                    src={`${img.url}`}
                    alt={work.title}
                    width={600}
                    height={320}
                  />
                );
              })}
            </span>
          ))}
        </main>
      </div>
    </section>
  );
};

export default Works;
