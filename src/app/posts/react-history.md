---
title: 关于 React 的进化史
date: 2025-11-26T23:00:00.000Z
description: 记录 react 历史进程
tags: [frontend，react, log]
lang: zh
duration: 12min
author: Atori
# draft: true
---

原文：[react-history-intro](https://playfulprogramming.com/posts/react-history-through-code#react-history-intro)

刚接触 React 的开发者，常会陷入这样的困惑：面对 Hooks 条条框框的使用限制 —— 比如只能在函数组件顶层调用、不能在条件语句里嵌套 —— 很容易觉得这些 API 像是随时间推移，东拼西凑补丁式开发出来的，背后没有一套统一的设计逻辑。

但事实恰恰相反。如果我们回到 React 诞生的起点，顺着它的成长轨迹去探寻每次技术决策的底层逻辑 —— 为何要创造这样一个框架、每个核心特性诞生时要解决的实际问题 —— 就会发现，看似零散的设计，其实都串联在一条清晰的发展主线上。

所以接下来，本文将以时间为轴，沿着 React 的历史一步步回溯：看看我们如今习以为常的 JSX 是如何让 UI 描述更直观，VDOM 又是怎样提高操作效率；类组件的组合思想，Hooks 又为何能颠覆传统写法成为主流；最后聊聊 React 19 对迈向服务端化的探索。

## 序章: 为什么会有 React

2011 年，Facebook 的广告业务遭遇技术瓶颈：支撑业务的内部框架 BoltJS，虽能解决 90% 的需求，但随着团队规模扩大，剩余 10% 需求暴露出开发一致性差、新人培训效率低、开发者体验不佳等问题。若放任不管，将直接影响产品按预期节奏迭代。

当时广告团队的工程师 Jordan Walke，本就对 BoltJS 这类框架的逻辑不满。他在社区采访中回忆：“初次学编程时，就觉得 MVC 模式的数据绑定与修改方式不适合自己，只是不懂用‘状态突变（mutation）’‘函数式编程（functional programming）’这类术语描述；我写的代码总被认为奇怪，直到学了编程语法基础、掌握术语，才清晰表达出想构建的应用形态。”

带着这份反思，Jordan 以个人项目形式开发 FaxJS，试图解决 BoltJS 及主流框架的共性痛点。不久后 FaxJS 更名为 FBolt（Functional Bolt）—— 这正是后来 React 的雏形，当时已有小团队围绕它展开初步开发。

2012 年，Facebook 以 10 亿美元收购 Instagram。彼时 Instagram 拥有 Android、iOS 移动端应用，却无 Web 版；新团队需开发 Web 端，且必须使用 Facebook 内部技术栈。评估 BoltJS 与 FBolt（早期 React）后，团队最终选择后者，很快发现其迭代快、性能优、开发者接受度高，项目早期甚至有人提议将其开源。

但新的矛盾随之而来：Facebook 内部已形成 BoltJS、React 两套 Web 解决方案。当时 Facebook 刚完成 IPO，广告业务作为核心盈利支柱，此前才迁移到 BoltJS；若再迁 React，不仅需耗时 4 个月，期间还不能接入新需求，业务风险极高，迁移一度被认为 “几乎不可能”。

关键时刻，Facebook CTO 给予了充分的支持：“做正确的技术选择，着眼长远。若产生短期影响，责任由我承担；需要几个月重写，就放手去做。” 最终广告平台顺利完成迁移，效果与 Instagram Web 端开发一致，被认定为 “成功决策”。

[在 2013 年的 JSConfUS 大会上，Tom Occhino（汤姆・奥基诺）与 Jordan Walke（乔丹・沃克）共同宣布 React 开源，同时发布了代码和文档。](https://www.youtube.com/watch?v=GW0rj4sNH2w)

## 第一幕：用 JSX 与 VDOM 清场

[在最早的时候，React 就洞察到将HTML耦合到JS是一种灵活的设计](https://www.youtube.com/watch?v=x7cQ3mrcKaY)。

JSX 为框架带来了足够的灵活性，不仅能避开用条件渲染和循环等逻辑需要的自定义模板标签；而且，**声明式**效率极高，帮助开发者对UI快速迭代。

在 React 出现之前，实现类似逻辑的代码可能是这样的：

```javascript
// This code is expected to live in another file or be a static string of some kind
<div>
  {/* This is pseudo-syntax of a theoretical framework's template code */}
  <some-tag data-if="someVar"></some-tag>
  <some-item-tag data-for="let someItem of someList"></some-item-tag>
</div>
```

我们必须学习新的语法标签。但 React 可以是这样:

```javascript
const data = (
  <div>
    {someVar && <some-tag />}
    {someList.map(someItem => (
      <some-item-tag />
    ))}
  </div>
)
```

这带来的主要好处是:

1. 编译发生在运行之前，允许错误可以在开发阶段被捕获到
2. 重用 JavaScript 表达力；无需在另一种字符串语言中重新创造

JSX 本质是函数的语法糖，只支持表达式。在不同端有较好的迁移能力

```javascript
// The following JSX
function App() {
  return (
    <ul role="list">
      <li>Test</li>
    </ul>
  )
}
// 会被编译成 react.createElement 函数
function App() {
  return React.createElement(
    'ul',
    {
      role: 'list',
    },
    [React.createElement('li', {}, ['Test'])]
  )
}
```

### JSX 才是真正的关心分离

早期，多数人对 JSX 的批评是它打破了”关心分离(separation of concerns)” 。因为基本所有前端项目都是将仓库基于语言进行划分的。

但问题在于：这并不是真正的关心分离。关心分离的核心是指不相关的低耦合，相关的高聚合。而这种基于技术类型的拆分，使相同功能模块中高度关联的CSS、HTML、JS分散在不同文件夹的做法，并不总是能带来想象中便捷，尤其在功能模块比较复杂的情况。

相反，React 团队提出的是，**你应该根据功能来拆分代码**：
![React 推荐结构](/blog-photos/react-history/image.png)

这样做的核心优势在于，能让开发者将注意力完全聚焦于单个功能模块内部 —— 毕竟与该模块相关的代码（HTML、JS、CSS）已高度聚合，无需在分散的文件夹中切换查找，从而实现更贴合实际开发场景的 “关注点分离”。这正是 React 所倡导的理想代码结构，也是 JSX 语法一旦上手便让人青睐的关键原因：它能让 UI 渲染逻辑保持连贯不中断，自然得将与界面相关的 HTML 结构、交互（JS）和样式（CSS）声明在同一处，真正实现了 “相关代码高聚合” 的设计初衷。

### 响应式 (Reactivity) 框架

响应式框架的核心是当数据发生变化时，框架自动将变化映射的HTML上，无需开发者手动操作DOM。理解这句话之前，我们先来看看 React 之前的 Backbonejs 是如何完成一个 Counter 组件:

```html
<!-- index.html, shortened for brevity -->
<div id="counter-app"></div>
<script type="text/template" id="counter-template">
  <p>Count: <%= count %></p>
  <button>Add 1</button>
</script>
<script>
  /* app.js */
  $(function () {
    var CounterModel = Backbone.Model.extend({
      defaults: {
        count: 0,
      },
    })
    var CounterView = Backbone.View.extend({
      el: '#counter-app',
      template: _.template($('#counter-template').html()),
      events: {
        'click button': 'increment',
      },
      initialize: function () {
        this.listenTo(this.model, 'change', this.render)
        this.render()
      },
      render: function () {
        var html = this.template(this.model.toJSON())
        this.$el.html(html)
        return this
      },
      increment: function () {
        var currentCount = this.model.get('count')
        this.model.set('count', currentCount + 1)
      },
    })
    var counterModel = new CounterModel()
    new CounterView({ model: counterModel })
  })
</script>
```

在这个组件里面，我们做这么几件事：

1. 从标记有 “text/template“”的 script 标签读模版
2. 定义模板使用的数据模型
3. 手动绑定事件并根据请求将模板重新构建为HTML

大体看下没什么问题，有个细节，increament 内部，用户为了更新count，需要获取DOM节点、执行 +1 逻辑，两者缺一不可；遇到更复杂的情景，很容易在开发过程中对需要操作的DOM节点遗漏。

我们比较下 React 如何完成 Counter 组件:

```html
<div id="root"></div>
<script type="text/babel">
  var Counter = React.createClass({
    getInitialState: function () {
      return {
        count: 0,
      }
    },
    increment: function () {
      this.setState({
        count: this.state.count + 1,
      })
    },
    render: function () {
      return (
        <div>
          <p>Count: {this.state.count}</p>
          <button onClick={this.increment}>Add 1</button>
        </div>
      )
    },
  })
  ReactDOM.render(<Counter />, document.getElementById('root'))
</script>
```

相较于 Backbone，React 虽通过 this.setState 显式触发更新，但二者在设计思想上存在根本性转变 —— 在 React 的 increment 方法中，开发者无需手动操作 DOM，彻底摆脱了传统开发中数据更新与 DOM 操作强耦合的繁琐流程。

React 的 render 方法绝非仅用于生成组件初始模板，它更像是一个具备 “记忆能力” 的跨时间模板：无论何时组件状态发生变化，render 都会基于最新状态自动生成对应的视图描述，开发者只需要通过 JSX 声明数据如何变化、如何被使用，而必要的DOM更新由框架自动完成。这就是**响应式框架**的核心。

我们通过 JSX + 响应式框架，将关注点放在数据如何驱动UI发生变化，而琐碎的DOM操作交给框架完成，代码组织和开发效率得到了质的提升，这也是我们为什么选择框架，而不再手撸html的原因。

从实际开发角度来看，声明思想 + 响应式的本质，是将 UI 更新视为 “协调（Reconciliation）过程(比较模板的增量更新部分，并进行覆盖) ，而非直接对 DOM 进行修改（DOM Mutation） 。这个想法直接源于Jordan从函数式编程领域学到的知识，在该领域中，数据必须始终是[不可变的](https://playfulprogramming.com/posts/new-post-mutable-vs-immutable)。

想更多了解响应式思想，[点击这里](https://playfulprogramming.com/posts/what-is-reactivity)

### 虚拟DOM (VDOM)

虽然 JSX 很好的描述了数据如何驱动模板改变，但每次状态更新，框架需要重新生成[（DOM）](https://playfulprogramming.com/posts/understanding-the-dom)。这对于大型 DOM 树会产生性能影响。

为了解决这个问题，团队采用了 “虚拟 DOM”（VDOM）的概念。这个虚拟 DOM 是存储在 JavaScript 中的浏览器 DOM 的副本；当 React 在 DOM 中构建一个节点时，它会将该节点复制到自己的 DOM 副本中。

然后，当某个特定组件需要更新 DOM 时，它会与这个虚拟 DOM（VDOM）进行比对，并且只对的需要更新的节点进行重绘。
![增量更新](/blog-photos/react-history/vdom.png)
有了 VDOM ，React 的性能有很大的进步，那些性能要求较高的应用也可以享受 React 带来的高效开发体验。

以上过程，都被React 放在 “协调” 中，通过diff算法来实现 。值得一提的是，[即使是早期的 React 版本也已经对虚拟 DOM（VDOM）的大部分差异比较过程进行了优化](https://calendar.perfplanet.com/2013/diff/)。

## 第二幕：类组件的黄金时代与天花板

React 在2013年发布了基于类的组件( Hooks 直到 2019 年才发布)。虽然类组件很棒，帮助我们对代码进行模块化，但是也有自身的问题。

组件的一个核心原则是它们能够组合，也就是说，**我们可以用现有的组件构建一个新组件**：

```jsx
// Existing components
class Button extends React.Component {
  // ...
}
class Title extends React.Component {
  // ...
}
class Surface extends React.Component {
  // ...
}
// Can be reused and merged into a
// newly created broader component
class Card extends React.Component {
  render() {
    return (
      <Surface>
        <Title />
        <Button />
      </Surface>
    )
  }
}
```

如果没有这种能力，React 在大型应用中会极难扩展。然而上面是组件级别的复用，但对于类组件的内部逻辑我们是没办法复用的。

比如下面这个例子:

```jsx
class WindowSize extends React.Component {
  state = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
  render() {
    // ...
  }
}
```

上面的 WindowSize 组件用于获取浏览器窗口大小，在改变窗口尺寸时，state的改变会触发组件的重新渲染。

现在假设我们想要在其他组件复用这个逻辑，怎么办呢？如果你学习过面向对象编程 — 你会意识到有一种很好的方法可以做到这一点：[**类继承**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain)

### 短期解决方案

不需要改变 WindowSize 的代码，我们可以使用 JavaScript 的内置关键字 extends 允许新的类继承另外一个类的方法和属性。

```jsx
class MyComponent extends WindowSize {
  render() {
    const { windowWidth, windowHeight } = this.state
    return (
      <div>
        The window width is: {windowWidth}
        <br />
        The window height is: {windowHeight}
      </div>
    )
  }
}
```

尽管这个简单示例能够正常运行，但存在明显缺陷：当`MyComponent`的逻辑逐渐复杂时，开发者必须通过`super`关键字调用基类方法，才能确保基类原有的生命周期行为（如事件监听、状态初始化等）不被中断，一旦遗漏`super`调用，极易引发逻辑异常或内存泄漏等问题。

```jsx
class MyComponent extends WindowSize {
  state = {
    // Required with a base class
    ...this.state,
    counter: 0,
  }
  intervalId = null
  componentDidMount() {
    // Required with a base class
    super.componentDidMount()
    this.intervalId = setInterval(() => {
      this.setState(prevState => ({ counter: prevState.counter + 1 }))
    }, 1000)
  }
  componentWillUnmount() {
    // Required with a base class
    super.componentWillUnmount()
    clearInterval(this.intervalId)
  }
  render() {
    const { windowWidth, windowHeight, counter } = this.state
    return (
      <div>
        The window width is: {windowWidth}
        <br />
        The window height is: {windowHeight}
        <br />
        The counter is: {counter}
      </div>
    )
  }
}
```

为了解决这个问题，许多库采用了一种名为 “**高阶组件**”（HoC）的模式。

### HOC

借助高阶组件，用户避免在其代码库中进行`super`调用，而是让 props 的形式获取基类的参数：

```jsx
const withWindowSize = WrappedComponent => {
  return class WithWindowSize extends React.Component {
    state = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    handleResize = () => {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    componentDidMount() {
      window.addEventListener('resize', this.handleResize)
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize)
    }
    render() {
      return (
        <WrappedComponent
          {...this.props}
          windowWidth={this.state.width}
          windowHeight={this.state.height}
        />
      )
    }
  }
}
class MyComponentBase extends React.Component {
  render() {
    const { windowWidth, windowHeight } = this.props
    return (
      <div>
        The window width is: {windowWidth}
        <br />
        The window height is: {windowHeight}
      </div>
    )
  }
}
const MyComponent = withWindowSize(MyComponentBase)
```

在 Hook 出现之前，这是复用 React 类组件内部逻辑最好的方式。

缺点是，需要了解父组件会传来什么`props`，难以支持[TypeScript](https://playfulprogramming.com/posts/introduction-to-typescript)和其他类型检查工具的使用，最终感觉像是一种代码的 hack ，而不是一种属于 React 的 天然、简洁的组合机制。

### 函数组件

[2015 年，React 0.14 发布。](https://legacy.reactjs.org/blog/2015/10/07/react-v0.14.html#stateless-function-components) 这个版本带来了类组件的替代方案：函数组件。

类组件被 React 团队描述为 “一个带有附加状态容器的渲染函数”。如果我们只移除状态容器而保留渲染函数会怎么样呢？

这意味着，得到下面这段代码

```jsx
var Aquarium = React.createClass({
  render: function () {
    var fish = getFish(this.props.species)
    return <Tank>{fish}</Tank>
  },
})
```

如果，将上面的代码更简化一点：

```jsx
var Aquarium = props => {
  var fish = getFish(props.species)
  return <Tank>{fish}</Tank>
}
```

虽然这样做很简洁，但也有个致命的缺点：函数组件无法包含自己的状态。

所以，这限制了它在实际应用的能力。早期，大多数仓库为了避免代码风格的分裂，都决定还是坚持使用基于类的组件。

## 第三幕：Hooks 把组件化深入到逻辑层

[React 16.8 正式引入了 Hooks](https://playfulprogramming.com/blog/2019/02/06/react-v16.8.0.html)。Hook 解决了函数组件无法保留状态的问题，并且成为未来 React 的基础。

以前的[类组件](https://playfulprogramming.com/posts/layered-react-structure#smart-dumb-comps)是使用约定的方法和属性来管理状态和[副作用](https://playfulprogramming.com/posts/ffg-fundamentals-side-effects)：

```jsx
class WindowSize extends React.Component {
  state = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
  render() {
    // ...
  }
}
```

而有了Hooks，以前的的类组件都可以用函数式的方式编写：

```jsx
function WindowSize() {
	const [size, setSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const {height, width} = size;
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
  	// ...
  )
}
```

这一变化对组件内部逻辑的二次复用和组合特别有用。

### 更优雅的处理副作用

让我们看下 class 是如何处置副作用：

```jsx
class Listener extends React.Component {
	// Requires us to register a method on the `this` boundary
	// to reference in both places
	componentDidMount() {
		window.addEventListener("resize", this.handleResize);
	}
	// There may be many lines between the mount and unmount
	componentWillUnmount() {
		window.removeEventListener("resize", this.handleResize);
	}
	// Methods added to `window` via `addEventListener` needed to use
	// arrow functions, as otherwise `this` would be bound to `window`.
	handleResize = () => {
		// ...
	};
}

副作用发生在 componentWillUnmount 中
副作用的清除则在 componentWillUnmount
```

> 注意
> 对为什么当 handleResize不是箭头函数时，this 会是 window 感到困惑吗？[点击这里](https://playfulprogramming.com/posts/javascript-bind-usage)。

对比利用 useEffect 这个 Hook 来注册副作用和清除：

```jsx
function Listener() {
  useEffect(() => {
    // Method colocated next to the listeners
    const handleResize = () => {
      // ...
    }
    window.addEventListener('resize', handleResize)
    // Cleanup in same scope as the effect
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  // ...
}
```

useEffect 第一个参数就是副作用函数，清除逻辑由函数 return 的结果提供，执行时机用户不需要关心，由 React 来决定。相比于 Class 更简洁。这就是为什么 Hooks 不 1:1 映射旧的类组件的生命周期， Hooks 能更好的管理和清除副作用。

### Hook 的使用限制

所有 Hook 都要遵循一套一致的规则：

1. 所有钩子都是函数
2. 函数名称必须以 use 开头
3. [钩子不能有条件地调用](https://react.dev/reference/rules/rules-of-hooks)
4. 它们必须在组件的顶层调用
5. [不允许动态使用钩子](https://react.dev/reference/rules/react-calls-components-and-hooks#dont-dynamically-use-hooks)
6. [传递给钩子的属性不得被修改](https://react.dev/reference/rules/components-and-hooks-must-be-pure#return-values-and-arguments-to-hooks-are-immutable)

无论 Hook 是自定义的还是从 React 导入的，无论是一开始的`useState`，还是 React18 之后的[`useActionState`](https://playfulprogramming.com/posts/what-is-use-action-state-and-form-status)—— 都必须遵守这些规则。

```jsx
// ✅ Allowed usages
function AllowedHooksUsage() {
  const [val, setVal] = React.useState(0)
  const { height, width } = useWindowSize()
  return <>{/* ... */}</>
}
// ❌ Dis-allowed usages
function DisallowedHooksUsage() {
  const obj = {}
  useObj(obj)
  // Not allowed to mutate objects after being passed to a hook
  obj.key = (obj.key ?? 0) + 1
  if (bool) {
    const [val, setVal] = React.useState(0)
  }
  if (other) {
    return null
  }
  // While otherwise valid, can't be after a return
  const { height, width } = useWindowSize()
  for (let i = 0; i++; i < 10) {
    const ref = React.useRef()
  }
  return <>{/* ... */}</>
}
```
