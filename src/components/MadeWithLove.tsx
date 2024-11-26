import Link from "next/link";
import { Box, Text, Icon } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

export default function MadeWithLove() {
  return (
    <Box textAlign="center" mt={8} mb={4}>
      <Text fontSize="lg" color="gray.600">
        Made with <Icon as={FaHeart} color="red.500" /> by{" "}
        <Link href="https://github.com/jaymehta002" color="yellow.500">
          jaymehta002
        </Link>
      </Text>
    </Box>
  );
}
