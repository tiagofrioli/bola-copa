import { FlatList, Icon, VStack } from "native-base";
import { useState } from "react";
import { Button } from "../../components/Button";
import { EmptyPoolList } from "../../components/EmptyPoolList";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { PoolCard, PoolCardPros } from "../../components/PoolCard";
import { Octicons } from "@expo/vector-icons";

export function Pools() {
  const [isLoading, setIsLoading] = useState(false);
  const [pools, setPools] = useState<PoolCardPros[]>([]);

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="MEUS BOLÕES" />

      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
          onPress={() => {} /* navigate('find') */}
        />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PoolCard
              data={item}
              onPress={() => {} /* navigate('details', { id: item.id }) */}
            />
          )}
          ListEmptyComponent={<EmptyPoolList />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          px={5}
        />
      )}
    </VStack>
  );
}
