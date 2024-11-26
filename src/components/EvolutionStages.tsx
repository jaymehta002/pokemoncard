import { Box, HStack, Image, Text } from "@chakra-ui/react";

interface Props {
  stage: number;
  pokemonType: string;
}

export default function EvolutionStages({ stage, pokemonType }: Props) {
  const evolutionMap = {
    Psychic: ["abra", "kadabra", "alakazam"],
    Dragon: ["dratini", "dragonair", "dragonite"],
    Steel: ["beldum", "metang", "metagross"],
    Fire: ["charmander", "charmeleon", "charizard"],
    Electric: ["pichu", "pikachu", "raichu"],
    Fighting: ["machop", "machoke", "machamp"],
    Water: ["squirtle", "wartortle", "blastoise"],
    Normal: ["eevee", "espeon", "umbreon"],
  };

  const evolutionLine = evolutionMap[pokemonType] || [
    "eevee",
    "espeon",
    "umbreon",
  ];

  return (
    <Box w="100%" bg="whiteAlpha.900" p={4} borderRadius="md">
      <Text fontWeight="bold" mb={2} color="gray.700">
        Evolution Stage
      </Text>
      <HStack spacing={4} justify="center">
        {evolutionLine.map((pokemon, index) => (
          <Box
            key={index}
            opacity={index + 1 <= stage ? 1 : 0.3}
            filter={index + 1 > stage ? "grayscale(100%)" : "none"}
          >
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonId(
                pokemon
              )}.png`}
              alt={pokemon}
              w="60px"
              h="60px"
            />
            <Text fontSize="xs" textAlign="center" color="gray.600">
              Stage {index + 1}
            </Text>
          </Box>
        ))}
      </HStack>
    </Box>
  );
}

// Helper function to get Pokémon ID for the sprite URL
function getPokemonId(pokemonName: string): number {
  const pokemonIds: Record<string, number> = {
    abra: 63,
    kadabra: 64,
    alakazam: 65,
    dratini: 147,
    dragonair: 148,
    dragonite: 149,
    beldum: 374,
    metang: 375,
    metagross: 376,
    charmander: 4,
    charmeleon: 5,
    charizard: 6,
    pichu: 172,
    pikachu: 25,
    raichu: 26,
    machop: 66,
    machoke: 67,
    machamp: 68,
    squirtle: 7,
    wartortle: 8,
    blastoise: 9,
    eevee: 133,
    espeon: 196,
    umbreon: 197,
  };

  return pokemonIds[pokemonName] || 133; // Default to Eevee if not found
}
