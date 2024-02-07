import { View, Text, FlatList } from 'react-native'

import { CATEGORIES } from "@/utils/data/products"

import { Header } from '@/components/header'
import { CategoryButton } from '@/components/category-button'
import { useState } from 'react'

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0])


  function handleCagetorySelect(selectedCategory: string) {
    setCategory(selectedCategory)
  }

  return (
    <View className="flex-1 pt-8">

      <Header title="Faça seu Pedido" cartQuantityItems={5} />
      {/* <Text className="text-white text-2xl text-center font-heading" >Bienvenido al Chuin Menu😻</Text> */}

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleCagetorySelect(item)}
          />
        )}
        horizontal
        className='max-h-10 mt-5'
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />

    </View>

  )
}

