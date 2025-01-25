
type CartItem = {
  id: number,
  cartId: number,
  productId: number,
  quantity: number,
  price: number
}

type Cart = {
  id: number,
  userId: number,
  items: CartItem[],
  createAt: Date,
  updateAt: Date,
}
