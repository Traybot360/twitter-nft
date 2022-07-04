import { Container, Text } from "@chakra-ui/react";

type props = {
  //   description?: string;
  image: string;
  name?: string;
  //   tweetId?: string;
  tweetedAt: string;
};

const getImgUrl = (img: string) => {
  return `https://ipfs.io/ipfs/${img.substring(7, img.length)}`;
};
const convertDate = (date: string) => {
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

const Nft = ({ image, name, tweetedAt }: props) => {
  return (
    <Container
      boxShadow="0px 0px 20px 0px rgba(0,0,0,0.51)"
      // border="1px solid"
      borderRadius={5}
      p={0}
    >
      <img style={{ borderRadius: "5px" }} src={getImgUrl(image)} alt={name} />
      <Text textAlign="center" p={4}>
        Tweeted At <b>{convertDate(tweetedAt)}</b>
      </Text>
    </Container>
  );
};

export default Nft;
