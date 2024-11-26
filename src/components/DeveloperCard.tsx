import { useRef } from 'react';
import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  useToast,
} from '@chakra-ui/react';
import { toPng } from 'html-to-image';
import type { GitHubUser } from '../types';

interface Props {
  user: GitHubUser;
}

export default function DeveloperCard({ user }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  const getDeveloperType = (user: GitHubUser) => {
    if (user.public_repos > 30) return 'Senior Developer';
    if (user.public_repos > 10) return 'Developer';
    return 'Junior Developer';
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;
    
    try {
      const dataUrl = await toPng(cardRef.current);
      const link = document.createElement('a');
      link.download = `${user.login}-card.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to download card',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Box
      ref={cardRef}
      w="100%"
      maxW="400px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="xl"
      p={6}
    >
      <VStack spacing={4}>
        <Image
          borderRadius="full"
          boxSize="150px"
          src={user.avatar_url}
          alt={user.login}
        />
        
        <Text fontSize="2xl" fontWeight="bold">
          {user.name || user.login}
        </Text>
        
        <Badge colorScheme="purple" fontSize="md">
          {getDeveloperType(user)}
        </Badge>

        {user.bio && (
          <Text textAlign="center" color="gray.600">
            {user.bio}
          </Text>
        )}

        <HStack spacing={6}>
          <VStack>
            <Text fontWeight="bold">{user.followers}</Text>
            <Text fontSize="sm">Followers</Text>
          </VStack>
          
          <VStack>
            <Text fontWeight="bold">{user.public_repos}</Text>
            <Text fontSize="sm">Repositories</Text>
          </VStack>
        </HStack>

        <Button colorScheme="blue" onClick={downloadCard} w="100%">
          Download Card
        </Button>
      </VStack>
    </Box>
  );
}