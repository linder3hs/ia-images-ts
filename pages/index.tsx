import { useState } from "react";
import { ImagesResponse } from "openai";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Gallery, Loading } from "../components";

export default function Home() {
  const [images, setImages] = useState<ImagesResponse | null>(null);

  const [search, setSearch] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createImages = async () => {
    if (!search) return alert("Please type something");
    setSearch("");
    setImages(null);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/images/?name=${search}`);
      const data = await response.json();
      setImages(data);
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      <Head>
        <title>Images IA</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1 className={styles.title}>Create images width OpenIA</h1>
          <p className={styles.description}>
            Create images with IA, just type a name and click on the button
          </p>
        </div>
        <div>
          <input
            type="text"
            disabled={isLoading}
            name="name"
            value={search}
            onKeyDown={(e) => e.key === "Enter" && createImages()}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.input}
            autoComplete="off"
            placeholder="Type something"
          />
          <button
            disabled={isLoading}
            className={styles.button}
            onClick={createImages}
          >
            Create image
          </button>
        </div>
      </main>
      {images && <Gallery images={images!} />}
    </>
  );
}
