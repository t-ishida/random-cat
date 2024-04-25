import {GetServerSideProps, NextPage} from 'next';
import {useState, useEffect} from 'react';
import styles from './index.module.css';
type  Props = {
    initialImageUrl: string;
};

const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
    const [imageUrl, setImageUrl] = useState(initialImageUrl);
    const [loading, setLoading] = useState(false);
    return (
        <div>
            <h1>Random Cat</h1>
            <div className={styles.page}>
                <button className={styles.button} onClick={async () => {
                    setLoading(true);
                    fetchImage().then((image) => {
                        setImageUrl(image.url);
                        setLoading(false);
                    });
                }}>チェンジ</button>
                <div className={styles.frame}>
                    {loading || <img src={imageUrl} alt="Random cat" /> }
                </div>
            </div>
        </div>
    );
};
export default IndexPage;
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {initialImageUrl: image.url},
  };
};
  
type Image = {
    url: string;
};
const fetchImage = async () : Promise<Image> => {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const images = await response.json();
    return images[0];
};
