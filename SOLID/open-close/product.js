let Color = Object.freeze({
  red: 'red',
  green: 'green',
  blue: 'blue'
});

let Sizes = Object.freeze({
  small: 'small',
  medium: 'medium',
  large: 'large'
});

// The open closed principle is a software design principle that states
// that software entities (classes, modules, functions, etc.) should be open for extension,
// but closed for modification.


class Product {
  constructor(name, color, size) {
    this.color = color;
    this.name = name;
    this.size = size;
  }
}

// This filetr while effective, should remain as is and should not be modified once its created
// adding new filtering options will violate the open closed principle, and will require modification.

class ProductFilter {
  filterByName(products, name) {
    return products.filter(p => p.name === name);
  }

  filberByColor(products, color) {
    return products.filter(p => p.color === color);
  }
}



let apple = new Product('apple', Color.blue, Sizes.small);
let tree = new Product('tree', Color.green, Sizes.large);
let house = new Product('house', Color.blue, Sizes.large);

let products = [apple, tree, house];

let pf = new ProductFilter();

for (let p of pf.filberByColor(products, Color.green)) {
  // console.log(`* ${p.name} is green`);
}

// This filter serves as an extension to the filtering functinality, since it builds on the specification classes
// to provide a filtering alternative that will not be modified, but can be extended through the use of the Specification Classes.


// Takes an array of items and a specification object, and returns a filtered array of items that match the specification.

class BetterFilter {
  filter(items, specification) {
    return items.filter(product => specification.isSatisfied(product));
  }
}

class ColorSpecification {
  constructor(color) {
    this.color = color;
  }

  isSatisfied(product) {
    return product.color === this.color;
  }
}

class SizeSpecification {
  constructor(size) {
    this.size = size;
  }

  isSatisfied(product) {
    return product.size === this.size;
  }
}

// This is next class is a combinator, that will take an arbitrary number of specifications
// and along the betterfilter will run every specificattion and return the the ones that match the specifications
// passed in.

// This satisfies the open-closed principle nothing is being modified, but the capablities of the filter are being extended
// through specifications and combinnators. Like the AndSpecification

class AndSpecification {
  constructor(...specifications) {
    this.specifications = specifications;
  }

  isSatisfied(product) {
    return this.specifications.every(specification => specification.isSatisfied(product));
  }
}

let bf = new BetterFilter();

for (let product of bf.filter(products, new ColorSpecification(Color.blue))) {
  console.log(`* ${product.name} is blue`);
}

console.log('Small and blue stuff: ');

let spec = new AndSpecification(
  new SizeSpecification(Sizes.small),
  new ColorSpecification(Color.blue)
)

console.log({bf})

for (let p of bf.filter(products, spec)) {
  console.log(`* ${p.name} is small and blue`);
}
