import React, { useRef } from "react";
import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Progress,
  Badge,
  Button,
  Tooltip,
  SimpleGrid,
} from "@chakra-ui/react";
import { GitHubUser, PokemonStats, PokemonType } from "../types/github";
import { calculatePokemonStats } from "../utils/stats";
import { getPokemonType, getElementalWeakness } from "../utils/pokemon";

interface Props {
  user: GitHubUser;
  onDownload: () => void;
}

export default function PokemonCard({ user, onDownload }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const stats: PokemonStats = calculatePokemonStats(user);
  const pokemonType = getPokemonType(user);
  const weakness = getElementalWeakness(pokemonType, user);

  return (
    <Box
      ref={cardRef}
      w="100%"
      maxW="400px"
      borderWidth="3px"
      borderRadius="lg"
      borderColor="yellow.400"
      overflow="hidden"
      bgGradient={pokemonType.background}
      boxShadow="xl"
      p={6}
      position="relative"
    >
      <Tooltip label={pokemonType.description} placement="top">
        <Badge
          position="absolute"
          top={3}
          right={3}
          colorScheme={pokemonType.color.split(".")[0]}
          fontSize="md"
          px={3}
          py={1}
          borderRadius="full"
          zIndex={2}
        >
          {pokemonType.name} Type
        </Badge>
      </Tooltip>

      <VStack spacing={4}>
        <Box
          position="relative"
          width="full"
          bg="whiteAlpha.900"
          borderRadius="xl"
          p={4}
        >
          <Text
            position="absolute"
            top={2}
            left={4}
            fontSize="sm"
            color="gray.600"
          >
            {pokemonType.pokemon}
          </Text>
          <Image
            borderRadius="full"
            boxSize="150px"
            src={user.avatar_url}
            alt={user.login}
            border="4px"
            borderColor="yellow.400"
            mx="auto"
            mt={4}
          />
        </Box>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          {user.name || user.login}
        </Text>

        {user.bio && (
          <Text textAlign="center" color="whiteAlpha.900" fontSize="sm">
            {user.bio}
          </Text>
        )}

        <Box w="100%" bg="whiteAlpha.900" p={4} borderRadius="md">
          <VStack spacing={3} align="stretch">
            <HStack justify="space-between">
              <Text fontWeight="bold" color="gray.700" minW="60px">
                HP
              </Text>
              <Progress
                value={stats.hp}
                max={120}
                w="70%"
                colorScheme="green"
              />
              <Text fontSize="sm" minW="30px" textAlign="right">
                {stats.hp}
              </Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontWeight="bold" color="gray.700" minW="60px">
                Attack
              </Text>
              <Progress
                value={stats.attack}
                max={100}
                w="70%"
                colorScheme="red"
              />
              <Text fontSize="sm" minW="30px" textAlign="right">
                {stats.attack}
              </Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontWeight="bold" color="gray.700" minW="60px">
                Defense
              </Text>
              <Progress
                value={stats.defense}
                max={100}
                w="70%"
                colorScheme="blue"
              />
              <Text fontSize="sm" minW="30px" textAlign="right">
                {stats.defense}
              </Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontWeight="bold" color="gray.700" minW="60px">
                Speed
              </Text>
              <Progress
                value={stats.speed}
                max={100}
                w="70%"
                colorScheme="yellow"
              />
              <Text fontSize="sm" minW="30px" textAlign="right">
                {stats.speed}
              </Text>
            </HStack>
          </VStack>
        </Box>
        <Box w="100%" bg="whiteAlpha.900" p={4} borderRadius="md">
          <Text fontWeight="bold" mb={2} color="gray.700">
            Special Moves
          </Text>
          <SimpleGrid columns={2} spacing={2}>
            {pokemonType.moves.map((move, index) => (
              <Badge
                key={index}
                colorScheme={pokemonType.color.split(".")[0]}
                p={1}
                textAlign="center"
              >
                {move}
              </Badge>
            ))}
          </SimpleGrid>
        </Box>

        <Box w="100%" bg="whiteAlpha.800" p={3} borderRadius="md">
          <VStack spacing={2}>
            <HStack spacing={6} w="100%" justify="center">
              <VStack>
                <Text fontWeight="bold" color="gray.800">
                  {user.followers}
                </Text>
                <Text fontSize="xs" color="gray.700">
                  Followers
                </Text>
              </VStack>
              <VStack>
                <Text fontWeight="bold" color="gray.800">
                  {user.public_repos}
                </Text>
                <Text fontSize="xs" color="gray.700">
                  Repos
                </Text>
              </VStack>
              <VStack>
                <Text fontWeight="bold" color="gray.800">
                  {user.public_gists || 0}
                </Text>
                <Text fontSize="xs" color="gray.700">
                  Gists
                </Text>
              </VStack>
            </HStack>
            <Box>
              <Text fontSize="xs" color="gray.600" textAlign="center">
                Weakness: {weakness}
              </Text>
            </Box>
          </VStack>
        </Box>
        <Button
          colorScheme="yellow"
          onClick={onDownload}
          w="100%"
          _hover={{ bg: "yellow.500" }}
        >
          Catch (Download)
        </Button>
      </VStack>
    </Box>
  );
}
