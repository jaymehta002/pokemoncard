import { useRef, useState } from 'react';
import {
  Box,
  Container,
  Input,
  Button,
  VStack,
  useToast,
  Text,
  Heading,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { toPng } from 'html-to-image';
import PokemonCard from '../components/PokemonCard';
import { fetchGitHubUser } from '../utils/github';
import type { GitHubUser } from '../types/github';

export default function Home() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a GitHub username',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    setUserData(null);

    try {
      const data = await fetchGitHubUser(username);
      setUserData(data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch user data',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;
    
    try {
      const dataUrl = await toPng(cardRef.current);
      const link = document.createElement('a');
      link.download = `${userData?.login}-pokemon-card.png`;
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
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Box textAlign="center">
          <Heading mb={2}>Pokémon Developer Card Generator</Heading>
          <Text color="gray.600">Transform your GitHub profile into a Pokémon card!</Text>
        </Box>

        <Box as="form" w="100%" onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Input
              placeholder="Enter GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="lg"
              isDisabled={isLoading}
            />
            <Button
              leftIcon={<SearchIcon />}
              colorScheme="yellow"
              isLoading={isLoading}
              type="submit"
              w="100%"
              loadingText="Generating..."
            >
              Generate Card
            </Button>
          </VStack>
        </Box>
        
        <Box ref={cardRef}>
          {userData && <PokemonCard user={userData} onDownload={downloadCard} />}
        </Box>
      </VStack>
    </Container>
  );
}