"use client"

import { useState } from "react"
import { ShoppingCart, Plus, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: number
  name: string
  category: string
  price: number
  popularPrice?: number
  description: string
  image: string
  farmaciapopular: boolean
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

const products: Product[] = [
  {
    id: 1,
    name: "Dipirona 500mg",
    category: "medicamentos",
    price: 8.9,
    popularPrice: 0,
    description: "Analgésico e antitérmico",
    image: "/placeholder.svg?height=150&width=150&text=Dipirona",
    farmaciapopular: true,
  },
  {
    id: 2,
    name: "Paracetamol 750mg",
    category: "medicamentos",
    price: 12.5,
    popularPrice: 0,
    description: "Para dores e febre",
    image: "/placeholder.svg?height=150&width=150&text=Paracetamol",
    farmaciapopular: true,
  },
  {
    id: 3,
    name: "Omeprazol 20mg",
    category: "medicamentos",
    price: 15.9,
    popularPrice: 0,
    description: "Protetor gástrico",
    image: "/placeholder.svg?height=150&width=150&text=Omeprazol",
    farmaciapopular: true,
  },
  {
    id: 4,
    name: "Vitamina C 500mg",
    category: "suplementos",
    price: 25.9,
    popularPrice: 3.5,
    description: "Fortalece a imunidade",
    image: "/placeholder.svg?height=150&width=150&text=Vitamina+C",
    farmaciapopular: true,
  },
  {
    id: 5,
    name: "Protetor Solar FPS 60",
    category: "cosmeticos",
    price: 45.9,
    description: "Proteção solar avançada",
    image: "/placeholder.svg?height=150&width=150&text=Protetor+Solar",
    farmaciapopular: false,
  },
  {
    id: 6,
    name: "Shampoo Anticaspa",
    category: "higiene",
    price: 18.9,
    description: "Tratamento anticaspa",
    image: "/placeholder.svg?height=150&width=150&text=Shampoo",
    farmaciapopular: false,
  },
  {
    id: 7,
    name: "Vitamina D3 2000UI",
    category: "suplementos",
    price: 32.9,
    popularPrice: 4.2,
    description: "Fortalecimento ósseo",
    image: "/placeholder.svg?height=150&width=150&text=Vitamina+D3",
    farmaciapopular: true,
  },
  {
    id: 8,
    name: "Creme Hidratante",
    category: "cosmeticos",
    price: 28.9,
    description: "Hidratação facial",
    image: "/placeholder.svg?height=150&width=150&text=Creme+Hidratante",
    farmaciapopular: false,
  },
  {
    id: 9,
    name: "Pasta de Dente",
    category: "higiene",
    price: 12.9,
    description: "Proteção anticáries",
    image: "/placeholder.svg?height=150&width=150&text=Pasta+de+Dente",
    farmaciapopular: false,
  },
  {
    id: 10,
    name: "Ômega 3 1000mg",
    category: "suplementos",
    price: 42.9,
    popularPrice: 5.8,
    description: "Saúde cardiovascular",
    image: "/placeholder.svg?height=150&width=150&text=Omega+3",
    farmaciapopular: true,
  },
  {
    id: 11,
    name: "Sérum Anti-idade",
    category: "cosmeticos",
    price: 65.9,
    description: "Rejuvenescimento facial",
    image: "/placeholder.svg?height=150&width=150&text=Serum+Anti-idade",
    farmaciapopular: false,
  },
  {
    id: 12,
    name: "Desodorante Roll-on",
    category: "higiene",
    price: 16.9,
    description: "Proteção 48h",
    image: "/placeholder.svg?height=150&width=150&text=Desodorante",
    farmaciapopular: false,
  },
]

const categories = [
  { id: "medicamentos", name: "Medicamentos", icon: "💊" },
  { id: "suplementos", name: "Suplementos", icon: "🧴" },
  { id: "cosmeticos", name: "Cosméticos", icon: "💄" },
  { id: "higiene", name: "Higiene Pessoal", icon: "🧼" },
]

export default function AleFarma() {
  const [selectedCategory, setSelectedCategory] = useState("medicamentos")
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevCart, { id: product.id, name: product.name, price: product.price, quantity: 1 }]
      }
    })
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const filteredProducts = products.filter((product) => product.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cabeçalho Vermelho */}
      <header className="bg-red-600 text-white py-8 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">ALE FARMA</h1>

          {/* Informação Farmácia Popular */}
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-6 h-6 mr-2" />
              <h2 className="text-xl font-semibold">Farmácia Popular</h2>
            </div>
            <p className="text-red-100">Medicamentos gratuitos e com desconto especial do Governo Federal</p>
            <p className="text-red-200 text-sm mt-1">Apresente seu CPF e retire seus medicamentos</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Carrinho */}
        <div className="mb-8 text-right">
          <Button className="bg-red-600 hover:bg-red-700">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Carrinho ({getTotalItems()})
          </Button>
        </div>

        {/* Tipos de Produtos */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Tipos de Produtos Ofertados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white hover:border-red-300"
                }`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-semibold">{category.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Produtos */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            {categories.find((cat) => cat.id === selectedCategory)?.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="p-4">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-lg bg-gray-100"
                    />
                    {product.farmaciapopular && (
                      <Badge className="absolute top-2 right-2 bg-green-600 text-white">
                        <Award className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-sm mb-3">{product.description}</CardDescription>

                  <div className="space-y-2">
                    {product.farmaciapopular && product.popularPrice !== undefined && (
                      <div className="bg-green-50 p-2 rounded-lg">
                        <div className="text-sm font-semibold text-green-700">Farmácia Popular:</div>
                        <div className="text-lg font-bold text-green-600">
                          {product.popularPrice === 0 ? "GRATUITO" : `R$ ${product.popularPrice.toFixed(2)}`}
                        </div>
                      </div>
                    )}

                    <div className="bg-gray-50 p-2 rounded-lg">
                      <div className="text-sm text-gray-600">Preço normal:</div>
                      <div className="text-xl font-bold text-red-600">R$ {product.price.toFixed(2)}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button onClick={() => addToCart(product)} className="w-full bg-red-600 hover:bg-red-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-red-600 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-2">ALE FARMA</h3>
          <p className="text-red-100 mb-4">Sua farmácia de confiança com Farmácia Popular</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Contato</h4>
              <p>📞 (11) 3000-0000</p>
              <p>📧 contato@alefarma.com.br</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Horário</h4>
              <p>Segunda a Sexta: 8h às 18h</p>
              <p>Sábado: 8h às 14h</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Farmácia Popular</h4>
              <p>Medicamentos gratuitos</p>
              <p>Apresente seu CPF</p>
            </div>
          </div>
          <div className="border-t border-red-500 mt-6 pt-4">
            <p>&copy; 2024 ALE FARMA. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
