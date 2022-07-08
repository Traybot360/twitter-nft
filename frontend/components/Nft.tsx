import { Container, Text } from "@chakra-ui/react";
import { convertDate, getImgUrl } from "./helpers";

type props = {
  image: string;
  name?: string;
  tweetedAt: string;
};

// an nft in the nft grid component in the home page
const Nft = ({ image, name, tweetedAt }: props) => {
  return (
    <Container
      boxShadow="0px 0px 20px 0px rgba(0,0,0,0.51)"
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
