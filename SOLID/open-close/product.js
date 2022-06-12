const Color = Object.freeze({
  red: 'red',
  blue: 'blue',
  green: 'green',
});

const Size = Object.freeze({
  small: 'small',
  medium: 'medium',
  large: 'large',
  extraLarge: 'extra large',
})

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

class ProductFilter {
  filterByColor(products, color) {
    return products.filter((product) => product.color === color)
  }
}

const apple = new Product('Apple', Color.red, Size.small);
const orange = new Product('Orange', Color.blue, Size.medium);
const grape = new Product('Grape', Color.green, Size.large);

const products = [apple, orange, grape];

pf = new ProductFilter;

console.log(pf.filterByColor(products, Color.red));