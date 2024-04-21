import { GetServerSideProps, NextPage } from "next";
import {useEffect , useState} from 'react'
import styles from "./index.module.css"
type Image = {
    url: string;
};
type Props = {
    initialImageUrl: string;
}
const IndexPage: NextPage<Props> =({initialImageUrl})=>{
    const [imageUrl, setImageUrl] = useState(initialImageUrl)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetchImage().then((newImage)=>{
        setImageUrl(newImage.url);
        setLoading(false);
    })
    }, []);
    const handleClick = async() => {
        setLoading(true);
        const newImage = await fetchImage();
        setImageUrl(newImage.url);
        setLoading(false);
    };
    return (
        <div className={styles.page}>
            <button onClick={handleClick} className={styles.button}>
                One more cat!
            </button>
            <div className={styles.frame}>
                {loading || <img src={imageUrl} className={styles.img} alt="cute cat"/>}
            </div>
        </div>
    );

}

export default IndexPage;

const fetchImage = async (): Promise<Image> => {
    const res = await fetch('https://api.thecatapi.com/v1/images/search');
    const images = await res.json();
    console.log(images);
    return images[0];
}

fetchImage().then((image) => {
    console.log(image);
})

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const image = await fetchImage();
    return {
        props:{
            initialImageUrl:image.url,
        }
    }
}