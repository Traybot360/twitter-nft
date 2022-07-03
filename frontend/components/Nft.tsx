type props = {
  description?: string;
  image: string;
  name?: string;
  tweetId?: string;
  tweetedAt: string;
};

const Nft = ({ description, image, name, tweetId, tweetedAt }: props) => {
  const getImgUrl = (img) => {
    return `https://ipfs.io/ipfs/${img.substring(7, img.length)}`;
  };
  const convertDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };
  return (
    <div>
      <img src={getImgUrl(image)} alt={name} />
      <h1>Tweeted At {convertDate(tweetedAt)}</h1>
    </div>
  );
};

export default Nft;
