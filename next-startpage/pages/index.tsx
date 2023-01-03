import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { Link } from "../types/Link";
import { linkSync } from "fs";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [time, setTime] = useState<Date>(new Date());
  const [customLinks, setCustomLinks] = useState<Link[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  setTimeout(() => {
    setTime(new Date());
  }, 1000);

  useEffect(() => {
    setHasMounted(true);
    const data = window.localStorage.getItem("customLinks");
    if (data) {
      const links = JSON.parse(data) as Link[];
      setCustomLinks(links);
    }
  }, []);

  if (!hasMounted) {
    return null;
  }

  function saveLinks(links: Link[]) {
    window.localStorage.setItem("customLinks", JSON.stringify(links));
  }

  function createNewLink(title?: string, url?: string): void {
    const newLinks = customLinks.slice();
    if (title && url) {
      console.log("Got it!");
      newLinks.push({ title: title, url: url });
      console.log(newLinks);
      setCustomLinks(newLinks);
      saveLinks(newLinks);
      setShowForm(false);
      setTitle("");
      setUrl("");
    }
  }

  function deleteLink(index: number) {
    const newLinks = customLinks.slice();
    newLinks.splice(index, 1);
    setCustomLinks(newLinks);
    saveLinks(newLinks);
  }

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Custom Start Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? "-" : "+"}
          </button>
          {showForm && (
            <div>
              <p>Title</p>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              ></input>
              <p>URL</p>
              <input
                onChange={(e) => setUrl(e.target.value)}
                value={url}
              ></input>
              <button onClick={() => createNewLink(title, url)}>Submit</button>
            </div>
          )}
        </div>
        <div className={styles.description}>
          <p>{time.toLocaleTimeString(undefined, { hour12: false })}</p>
        </div>
        <div className={styles.grid}>
          {customLinks?.map((link, index) => {
            return (
              <a
                href={link.url}
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
                key={link.url + index}
              >
                <h2 className={inter.className}>
                  {link.title} <span>-&gt;</span>
                </h2>
                {/* <p className={inter.className}>hello</p> */}
                <button onClick={() => deleteLink(index)}>-</button>
              </a>
            );
          })}

          {/* 

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a> */}
        </div>
      </main>
    </>
  );
}
