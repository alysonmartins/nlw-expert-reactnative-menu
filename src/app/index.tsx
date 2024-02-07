import { View, Text, FlatList, SectionList } from 'react-native'

import { CATEGORIES, MENU } from "@/utils/data/products"
import { Product } from '@/components/product'

import React, { useState, useRef } from 'react'
import { Header } from '@/components/header'
import { CategoryButton } from '@/components/category-button'
import { Link } from 'expo-router'
import { useCartStore } from '@/stores/cart-store'

export default function Home() {
  const cartStore = useCartStore()
  const [category, setCategory] = useState(CATEGORIES[0])

  const sectionListRef = useRef<SectionList>(null)

  const cartQuantityItems = cartStore.products.reduce((total, product) => total + product.quantity, 0)

  function handleCagetorySelect(selectedCategory: string) {
    setCategory(selectedCategory)

    const sectionIndex = CATEGORIES.findIndex((category) => category === selectedCategory)

    console.log(sectionIndex)

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      })
    }
  }


  return (
    <View className="flex-1 pt-8">

      <Header title="Faça seu Pedido" cartQuantityItems={cartQuantityItems} />
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

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}

        renderItem={({ item }) => (
          <Link href={`../product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}

        renderSectionHeader={({ section: { title } }) => (
          <Text className='text-xl text-white font-heading mt-8 mb-3'>{title}</Text>
        )}
        className='flex-1 p-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, }}
      />

    </View>

  )
}