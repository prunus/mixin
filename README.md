# Mixin

![GitHub package.json version](https://img.shields.io/github/package-json/v/prunus/mixin?style=for-the-badge)
![GitHub](https://img.shields.io/github/license/prunus/mixin?style=for-the-badge)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/prunus/mixin/CI?label=CI&style=for-the-badge)

Mixin is a lib that, as its name says, creates our beloved traits, helping to improve the syntax of our class.

## Installation

```sh
npm install @prunus/mixin
```

or

```sh
yarn add @prunus/mixin
```

---

## Usage

### **The best way:**

This is the purpose of this lib, to give readability to your code in a clean way and with little code. This, along with the __typescript [mixin](https://www.typescriptlang.org/docs/handbook/mixins.html) feature__, makes it even more exciting as they complement each other extremely well.

```ts
import { Mixed } from '@prunus/mixin'

class Trait1 {}
class Trait2 {}

class Class extends Mixed(Trait1, Trait2) {}
```

Or

```ts
import { Mixin } from '@prunus/mixin'

class Trait1 {}
class Trait2 {}

@Mixin(Trait1, Trait2)
class Class {}

interface Class extends Trait1, Trait2 {}
```

Test! Write some properties of your traits and your class and watch the magic happen.

### **The not so good way:**

We certainly do not encourage you to do this, but it is a feature that could not be left out, due to some specific needs that the developer may have.

```ts
import { Mixin } from '@prunus/mixin'

class Trait1 {}

class Trait2 {}

class TestClass {}

const Test: TestConstructor = Mixin(Trait1, Trait2)(TestClass)

interface TestClass extends Trait1, Trait2 {}
interface TestConstructor {
  new (): TestClass
}
```

As you can see in this way, we lose readability, it can make the code confusing depending on how complex our trait or class code is, even separating it into files... But it works, so your imagination is the limit.

### Supers

We haven't forgotten about the overlay, and we never will, that's why we remember our super. Unfortunately we can't fight js for the position of `super` inside the class, but it is a property of our `this.supers`.

```ts
import { Mixed } from '@prunus/mixin'

class Trait {
  say() {
    console.log('Hello world i\'am a trait')
  }
}

class Class extends Mixed(Trait) {
  say() {
    this.supers.for(Trait).say()
    # or
    this.supers.forEach(that => that.say())

    console.log('Hello world i\'am a mixin')
  }
}

```

---

### All instanceof instructions working correctly

In your code you can check if that instance of your dear mix is an instance of some other class within the mix. Example:

```ts
import { Mixed } from '@prunus/mixin'

class Trait1 {}

class Trait2 {}

class Trait3 {}

class Trait4 extends Mixed(Trai1, Trait3)

class Test extends Mixed(Trait1, Trait2) {}

console.log(new Test() instanceof Trait1) // true
console.log(new Test() instanceof Trait2) // true
console.log(new Test() instanceof Trait3) // false
console.log(new Test() instanceof Trait4) // false
console.log(new Trait4() instanceof Trait3) // true
console.log(new Trait4() instanceof Trait1) // false
console.log(new Trait4() instanceof Trait2) // false
console.log(new Trait4() instanceof Test) // false
```

---

## Limitations

Well... the limitations of this solution are quite interesting, starting with that... they don't work with the class syntax. Cough! Cough!

### Why?

Simple, try executing the code below and you will understand that it will be impossible to call only the constructor of a class as if it were just a function with context.

```js
class Test {}

const mixinContext = {}

Test.call(mixinContext)

// Uncaught TypeError: Class constructor Test cannot be invoked without 'new'
```

For that reason in the end inside the mixin the class you passed to it needs to be a function, no matter how you do it, typescript, babel, a fifth dimensional cat... It needs to be a function or nothing will work.

### Wait, trait with constructor?

Yeah, yeah, weird right? But it is necessary... simply because a trait can have properties that are initialized the moment the instance is created. As JavaScript doesn't support this, we unfortunately need to do all this torture with our class, turn it into a function.

```ts
import { Mixin } from '@prunus/mixin'

class Trait {
  protected property = true
}

@Mixin(Trait)
class Class {}

interface Class extends Trait {}
```

If we didn't convert our trait into a function, we wouldn't be able to initialize this property, because it won't be defined in the prototype, only when the instance is created.

### But let's not be discouraged, we just need to write our classes as functions.

Just kidding, we don't need to do this anymore right? right...?

### **TypeScript**
If you use typescript it's simple, let's tax some of our features for that.

```jsonc
{
  "compilerOptions": {
    // ...
    "target": "ES5",
    // ...
    "experimentalDecorators": true,
    // ...
  },
}
```

If you don't want to use our beautiful decorator, you can disable `experimentalDecorators`. But remember we won't be able to assemble your class pointer at runtime without decorators. So your syntax will have to be something like this:

```ts
import { Mixin } from '@prunus/mixin'

const MixinClass = Mixin(...traits)(class Class {})

const MixinFunction = Mixin(...traits)(function Class(this: Class) {
  return this
})
```

### **Babel**

Well this one is very simple, add the babel plugin that turns classes into functions [`@babel/plugin-transform-classes`](https://babeljs.io/docs/en/babel-plugin-transform-classes).

In that case you can also configure the babel decorator plugin, we recommend that you don't get a headache looking at your mixin code [@babel/plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators).

## What's to come

- Documentation and examples of integration with libs like typeorm
