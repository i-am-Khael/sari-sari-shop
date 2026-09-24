import { ref, reactive, computed, watch } from "vue";


const CART_LOCAL_STORAGE_KEY = 'cart-items';
const QUANTITY_LOCAL_STORAGE_KEY = 'item-quantities';

const getStorage = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);

    if (stored === null) return fallback;

    return JSON.parse(stored);

  } catch (error) {
    console.log(`Failed to read "${key}" from storage.`, error);
    return fallback;
  }
}

const loadCart = () => {
  const storedCart = getStorage(CART_LOCAL_STORAGE_KEY, []);

  if (!Array.isArray(storedCart)) return [];

  return storedCart;
}

const loadQuantities = () => {
  const storedQuantities = getStorage(QUANTITY_LOCAL_STORAGE_KEY, []);

  if (!Array.isArray(storedQuantities)) return {};

  return storedQuantities;
}


const cart = ref(loadCart());
const quantities = reactive(loadQuantities());


const getQuantity = (productId) => {
  if (!quantities[productId]) quantities[productId] = 1;
  return quantities[productId];
}

const setQuantity = (productId, value, max) => {
  let quantity = Number(value);

  if (!Number.isFinite(quantity) || quantity < 1) quantity = 1;

  if (quantity > max) quantity = max;

  quantities[productId] = quantity;
}

const increase = (productId, max) => {
  const current = getQuantity(productId);
  if (current < max) quantities[productId] = current + 1;
}

const decrease = (productId) => {
  const current = getQuantity(productId);
  if (current > 1) quantities[productId] = current - 1;
}


const addToCart = (product, quantity = 1) => {
  const existingItem = cart.value.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.value.push({ ...product, quantity })
  }
}

const removeFromCart = (productId) => {
  cart.value = cart.value.filter(item => item.id !== productId);
}

const clearCart = () => {
  cart.value = [];
}

const totalItems = computed(() => {
  return cart.value.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
});

const totalPrice = computed(() => {
  return cart.value.reduce((total, item) => {
    return total + (Number(item.price) * item.quantity);
  }, 0);
})

const formatMoney = (value) => {

  const number = parseFloat(value);

  if (number === undefined) return 0;

  if (number % 1 === 0) {

    return number.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

  } else {

    return number.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  }

}


watch(
  cart,
  (newCart) => {
    try {
      localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(newCart));
    } catch(error) {
      console.log('Failed to save cart to storage.', error);
    }
  },
  { deep: true }
);

watch(
  quantities,
  (newQuantities) => {
    try {
      localStorage.setItem(QUANTITY_LOCAL_STORAGE_KEY, JSON.stringify(newQuantities))
    } catch (error) {
      console.log('Failed to save quantities to storage.', error);
    }
  },
  { deep: true }
)

export const utilities = () => {
  return {
    quantities,
    getQuantity,
    setQuantity,
    increase,
    decrease,
    cart,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart,
    formatMoney
  }
}
