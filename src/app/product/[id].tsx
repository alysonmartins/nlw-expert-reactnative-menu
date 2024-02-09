import React from "react";
import { Feather } from "@expo/vector-icons"
import { Image, Text, View } from "react-native";
import { useLocalSearchParams, useNavigation, Redirect } from "expo-router"



import { Button } from "@/components/button";
import { PRODUCTS } from "@/utils/data/products";
import { useCartStore } from "@/stores/cart-store";
import { LinkButton } from "@/components/link-button";
import { formatCurrency } from "@/utils/functions/fomat-currency";



export default function Product() {
  const cartStore = useCartStore()
  const navigation = useNavigation()
  const { id } = useLocalSearchParams()

  const product = PRODUCTS.find((item) => item.id === id)

  // console.log(id)
  // console.log(cartStore.products)

  function handleAddToCart() {
    if (product) {
      cartStore.add(product)
      navigation.goBack()
    }
  }


  if (!product) {
    return <Redirect href="/" />
  }

  return (
    <View className="flex-1">
      <Image source={product.cover} className="w-full h-52" resizeMode="cover" />

      <View className="p-5 mt-1 flex-1">

        <Text className="text-white text-2xl font-heading">
          {product.title}
        </Text>

        <Text className="text-lime-400 text-xl font-heading my-2 text-right">
          {formatCurrency(product.price)}
        </Text>

        <Text className="text-slate-200 text-lg font-heading my-2">
          Descrição:
        </Text>

        <Text className="text-slate-400 font-body text-base leading-6 mb-6">
          {product.description}
        </Text>

        <Text className="text-slate-200 text-lg font-heading my-2">
          Ingredientes:
        </Text>

        {product.ingredients.map((ingredient) => (
          <Text key={ingredient} className="text-slate-400 font-body text-base leading-6">
            {"\u2022"} {ingredient}</Text>
        ))}

        <View className="p-5 pb-6 gap-5 mt-10">

          <Button onPress={handleAddToCart}>

            <Button.Icon>
              <Feather name="plus-circle" size={20} />
            </Button.Icon>

            <Button.Text>Adicionar ao pedido</Button.Text>

          </Button>

          <LinkButton title="Voltar" href="/" />

        </View>

      </View>
    </View >
  )
}