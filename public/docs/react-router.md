一、什么是路由
前端路由指的是一种将浏览器URL与特定页面或视图关联起来的技术。在传统的Web开发中，当用户点击链接或者输入URL时，服务器会接收到请求并返回相应的HTML页面。而在前端路由中，当用户点击链接或者输入URL时，浏览器会根据路由规则对URL进行解析，并使用JavaScript控制页面的展示。

前端路由通常使用JavaScript库来实现，比如React Router、Vue Router等。它们允许开发者定义路由规则，并根据这些规则来显示不同的组件或页面。例如，当用户点击一个链接时，前端路由会将URL解析为一个路由路径，然后根据路径匹配相应的组件或页面并显示在页面上，而不需要向服务器发起请求。

前端路由可以提高Web应用的性能和用户体验，因为它允许应用实现快速的页面切换和动态的内容加载，同时减少了服务器的负载。
```js
<HashRouter>
      ...
</HashRouter>
<BrowserRouter>
      	...
</BrowserRouter>
```
二、安装
// 注意：我用的是6.x的版本
npm install react-router-dom

三、路由模式
1、HashRouter
HashRouter使用URL的哈希部分（即#后面的部分）来匹配路由，它不会向服务器发送请求。例如，URL可以是Example Domain。HashRouter兼容性比较好，哪怕浏览器不支持HTML5 History API也可以正常使用。

2、BrowserRouter
BrowserRouter使用HTML5 History API来匹配路由，使用 HTML5 的 pushState 和 replaceState API 来实现路由的切换。它可以隐藏URL中的#符号，使URL更加友好。例如，URL可以是http://example.com/about

3、MemoryRouter
MemoryRouter是一个不依赖于浏览器历史记录的路由器。它将URL存储在内存中，而不是浏览器历史记录中，适用于测试或在不支持HTML5 History API的环境中使用

4、StaticRouter
StaticRouter是一个用于服务器端渲染的路由器。它将请求的URL作为参数传递给组件，并将组件的输出发送回客户端。这样就可以在服务器端生成动态HTML，然后将其发送到浏览器。

5、NativeRouter
NativeRouter是用于React Native应用的路由器，它使用Native导航而不是HTML导航来匹配路由

四、react-router-dom 有哪些组件
1、HashRouter组件以及其他路由模式组件
用于创建一个路由容器，使得我们可以在浏览器中使用路由。它包裹整个应用程序，并提供了一个路由的上下文环境。

2、Route组件
用于将一个路由路径与一个组件进行映射。当浏览器 URL 与 Route 组件所定义的路径匹配时，该组件就会被渲染到页面上

常用属性      
属性名           类型        默认值      描述

path            string                用于匹配 URL 的路径。

element         ReactNode             指定路由匹配成功后要渲染的组件。

caseSensitive   boolean     false     指定路径匹配时是否区分大小写。

sensitive       boolean     false     指定路径匹配时是否严格匹配大小写和斜杠。

location        string | object       指定要匹配的位置。

navigate        boolean     true      当路由匹配成功后是否进行页面导航。

elementProps    object                传递给渲染组件的属性对象。

preload         function              用于预加载组件。

caseSensitive   boolean     false     指定路径匹配时是否区分大小写。

sensitive       boolean     false     指定路径匹配时是否严格匹配大小写和斜杠。

redirectTo      string                当路由匹配成功后要重定向到的路径。

redirectPath    string                当路由匹配成功后要重定向到的路径。

replace         boolean     false     当页面导航时是否使用 replace 而非 push。

caseSensitive   boolean     false     指定路径匹配时是否区分大小写。

sensitive       boolean     false     指定路径匹配时是否严格匹配大小写和斜杠。

preventDefault  boolean     false     是否阻止默认的页面导航行为。

when            boolean | func  true  指定条件是否匹配，用于控制是否进行页面导航。

className       string                为路由渲染的元素指定 CSS 类名。

style           object                为路由渲染的元素指定样式对象。

title           string                页面标题，用于在路由变化时更新页面标题。

meta            any

例子
```js
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={Home} />
      	<Route path="/about" element={About} />
      </Routes>
    </div>
  );
}
```
3、Routes组件
Routes 组件是 React Router v6 中的一个组件，它的作用是用于定义应用程序的路由规则。与 React Router v5 中的 <Switch> 组件类似，Routes 组件包含多个 <Route> 子组件，用于指定不同的路径和对应的组件。

Routes 组件可以让我们更加灵活地定义路由规则。与 React Router v5 中的 <Switch> 组件只能按顺序匹配第一个符合条件的路由不同，Routes 组件可以匹配多个路由，并根据 path 属性的优先级选择最匹配的路由。例如，如果同时定义了 /users/:id 和 /users/new 两个路由规则，当访问 /users/new 时，React Router v6 会选择匹配优先级更高的 /users/new 路由，而不是直接匹配第一个符合条件的路由。
```js
import { Route, Routes } from 'react-router-dom';
 
function App() {
  return (
    <Routes>
      <Route exact path="/" element={Home} />
      <Route path="/about" element={About} />
    </Routes>
  );
}
```
4、Link组件
用于创建一个链接，使得用户可以通过点击链接来访问应用程序的不同路由路径。它会生成一个 <a> 标签，并根据传入的 to 属性生成正确的 href 属性。
```js
import { Link } from 'react-router-dom';
 
function Home() {
  return (
    <div>
        <ul>
          <li>
            <Link to="/a">A页面</Link>
          </li>
          <li>
            <Link to="/b">B页面</Link>
          </li>
        </ul>
    </div>
  );
}
```
5、NavLink
与 <Link> 类似，也用于创建一个链接，但它会在当前路由匹配成功时添加一个指定的类名，以便样式上的区分。
```js
import { NavLink } from 'react-router-dom';
 
/**
当点击链接的时候会自动激活activeClassName属性的className
*/
function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/a" activeClassName="active">
            a页面
          </NavLink>
        </li>
        <li>
          <NavLink to="/b" activeClassName="active">
            b页面
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
```
6、Redirect
用于重定向用户到另一个路由路径。当用户访问当前路径时，会自动跳转到指定的路径。

在使用Redirect组件时，您需要在路由配置中使用它而不是在组件中使用它。例如，如果您想在用户访问/home时重定向到/dashboard，则可以像这样设置路由。
```js
import { Route, Routes, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';
 
function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={<Redirect to="/dashboard" />} />
    </Routes>
  );
}
```
7、Prompt
用于在用户离开当前页面之前提示用户。可以用来防止用户在填写表单时误操作导致数据丢失。

五、react-router-dom中常用的hooks
1、useNavigate
用于在组件中进行导航、跳转等操作，与 useHistory 功能类似，但提供了更丰富的 API，例如可以使用命名路由进行跳转。

所谓的命名理由就是Route组件上定义的name属性，然后在跳转的时候直接穿name即可。

2、useParams
用于获取 URL 中的参数，例如 /users/:id 中的 id

3、useLocation
用于访问当前页面的位置信息，包括 URL 中的路径、查询参数、哈希等。

4、useMatch
用于获取当前页面的匹配信息，例如路由规则中的路径、参数等，与 useRouteMatch 功能类似

5、useOutlet
用于在父组件中呈现子路由组件，可以将子路由组件放在特定位置。也就是展示嵌套路由。
```js
import { useOutlet } from 'react-router-dom';
 
function App() {
  const outlet = useOutlet();
  return (
    <div>
      <h1>这是应用程序的头部</h1>
      {/* 在这里渲染子路由组件 */}
      {outlet}
      <h1>这是应用程序的底部</h1>
    </div>
  );
}
```
路由定义嵌套路由
```js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />}>
          {/* 子路由 */}
          <Route path="/" element={<UserList />} />
          <Route path=":id" element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}
```
6、useRoutes
根据规则动态渲染路由。

注意：

在使用 useRoutes 钩子函数时，需要将其作为根组件渲染，而不是将其作为子组件嵌套在其他组件中。这是因为 useRoutes 钩子函数需要访问 react-router-dom 的上下文，从而能够进行路由匹配和导航操作。
```js
import { useRoutes } from 'react-router-dom';
 
function App() {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },
    { path: '/users/:id', element: <User /> },
  ]);
  return <div>{routes}</div>;
}
```
六、基本使用
1、创建a、b、c三个组件文件，内容任意
2、创建router-component.jsx文件
```js
/**
 * 从react-router-dom中 引用HashRouter 是一个组件
 * 如果需要别的模式那就引入其他模式
 *
 */
import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import APage from "./learn-router/a";
import BPage from "./learn-router/b";
import CPage from "./learn-router/c";
export default function RouterComponent() {
  return (
    // 首先确定什么模式，那么最上层组件就是用这个模式
    <HashRouter>
      <Routes>
        <Route path="/" element={<APage />} />
        <Route path="/b" element={<BPage />} />
        <Route path="/b" element={<CPage />}></Route>
      </Routes>
    </HashRouter>
  );
}
```
3、在入口文件处引入
```js
import React from "react";
import ReactDOM from "react-dom/client";
import RouterComponent from "./rotuerComponent";
 
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterComponent />
);
```
4、在url地址直接输入地址就可以切换不同的页面
http://localhost:3000/

http://localhost:3000/#/b

http://localhost:3000/#/c

七、页面中进行路由跳转
1、普通跳转
```js
import { useNavigate } from "react-router-dom";
 
export default function APage() {
  /**
   * 使用useNavigate钩子返回一个方法
   * 使用这个方法进行跳转
   */
  const navigate = useNavigate();
  const linlB = () => {
    // 直接跟我们定义的path
    navigate('/b')
  }
  return (
    <div>
      <div>A页面</div>
      <button onClick={() => linlB()}>跳转到B页面</button>
    </div>
  );
}
```
2、替换当前页面
```js
import { useNavigate } from "react-router-dom";
 
export default function APage() {
  /**
   * 使用useNavigate钩子返回一个方法
   * 使用这个方法进行跳转
   */
  const navigate = useNavigate();
  const replaceB = () => {
    // 直接跟我们定义的path
    navigate('/b', { replace: true })
  }
  return (
    <div>
      <div>A页面</div>
      <button onClick={() => replaceB()}>把当前页面替换成B页面</button>
    </div>
  );
}
```
3、前进或后退到浏览器历史记录中的特定页面
```js
function MyComponent() {
  const navigate = useNavigate();
  function handleBack() {
    // 后退几页
    navigate(-1);
  }
  function handleForward() {
    // 前进几页
    navigate(1);
  }
  return (
    <div>
      <button onClick={handleBack}>Back</button>
      <button onClick={handleForward}>Forward</button>
    </div>
  );
}
```
八、路由传参
1. 路由参数（params形式）
路由参数是将参数嵌入到 URL 中的一种方式。在 React Router 6 中，我们可以通过在路由路径中使用冒号来定义参数

定义
```js
<Route path="/users/:id" element={<UserDetails />} />
```
获取
我们定义了一个名为 id 的参数，它可以在 URL 中的 /:id 部分找到。当用户访问 /users/123 时，123 将成为路由参数，并可以在组件中通过 useParams 钩子函数访问
```js
function UserDetails() {
  const { id } = useParams();
  // ...
}
```
2、查询参数（search形式）
查询参数是在 URL 中使用问号传递的一种参数。在 React Router 6 中，我们可以通过在 URL 中添加查询参数来传递参数

定义
```js
<Link to="/users?id=123">User Details</Link>
```
获取
我们向 /users 页面传递了一个名为 id 的查询参数，并将其设置为 123。我们可以在组件中使用 useLocation 钩子函数获取当前 URL 中的查询参数，并使用 URLSearchParams 对象来解析它们
```js
function UserDetails() {
  const [searchParams] = useSearchParams();
  // 使用URLSearchParams这个对象解析url的search，然后直接获取id
  const id = searchParams.get('id');
  // ...
}
```
3. 状态对象
状态对象是一种可以在导航期间传递数据的机制。在 React Router 6 中，我们可以在 navigate 函数中使用第二个参数来传递状态对象

定义
```js
function handleClick() {
  navigate('/users', { state: { id: 123 } });
}
```
获取
我们在导航到 /users 页面时传递了一个名为 id 的状态对象。我们可以在组件中使用 useLocation 钩子函数获取当前 URL 中的状态对象
```js
function UserDetails() {
  const location = useLocation();
  const { id } = location.state;
  // ...
}
```

注意
使用状态对象传递数据会将数据存储在浏览器的会话历史中，因此它仅适用于页面之间的相邻导航。如果用户从当前页面返回到其他页面，状态对象中的数据将被清除。如果需要在不同页面之间共享数据，最好使用其他的数据传递方式，如 Redux 或 Context API

九、嵌套路由
点击顶栏导航按钮。页面跳转。导航栏保持不变。页面改变

1、使用Outlet实现
routerComponent.jsx定义
```js
/**
 * 从react-router-dom中 引用HashRouter 是一个组件
 * 如果需要别的模式那就引入其他模式
 *
 */
import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import APage from "./learn-router/a";
import BPage from "./learn-router/b";
import CPage from "./learn-router/c";
import DPage from "./learn-router/d";
 
export default function RouterComponent() {
  return (
    // 首先确定什么模式，那么最上层组件就是用这个模式
    <HashRouter>
      <Routes>
        <Route path="/d" element={<DPage />}>
          {/* 
            嵌套路由子路由必须包含父级路由的path
          */}
          <Route path="/d/a" element={<APage></APage>}></Route>
          <Route path="/d/b" element={<BPage></BPage>}></Route>
          <Route path="/d/c" element={<CPage></CPage>}></Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}
```

页面中使用
// 直接使用Outlet组件 或者 使用useOutlet都可以
```js
import { Link, Outlet } from "react-router-dom";
 
export default function DPage() {
  return (
    <div>
      <div>
        <Link to="/d/a">A页面</Link>
        <Link to="/d/b">b页面</Link>
        <Link to="/d/c">c页面</Link>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
```

2、直接在页面中定义
routerComponent.jsx定义
```js
/**
 * 从react-router-dom中 引用HashRouter 是一个组件
 * 如果需要别的模式那就引入其他模式
 *
 */
import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import APage from "./learn-router/a";
import BPage from "./learn-router/b";
import CPage from "./learn-router/c";
import DPage from "./learn-router/d";
 
export default function RouterComponent() {
  return (
    // 首先确定什么模式，那么最上层组件就是用这个模式
    <HashRouter>
      <Routes>
        {/* 
          path后面加上/*
        */}
        <Route path="/d/*" element={<DPage />}>
        </Route>
      </Routes>
    </HashRouter>
  );
}
```

页面中使用
// 直接使用Outlet组件 或者 使用useOutlet都可以
```js
import { Link, Routes, Route } from "react-router-dom";
import APage from "./a";
import BPage from "./b";
import CPage from "./c";
 
export default function DPage() {
  return (
    <div>
      <div>
        {/* 
          注意：跳转的时候必须要加上父级路由的path
        */}
        <Link to="/d/a">A页面</Link>
        <Link to="/d/b">b页面</Link>
        <Link to="/d/c">c页面</Link>
      </div>
      <Routes>
        {/* 
          我们再定义子路由的path的时候不需要加父组件的path
        */}
        <Route path="/a" element={<APage></APage>}></Route>
        <Route path="/b" element={<BPage></BPage>}></Route>
        <Route path="/c" element={<CPage></CPage>}></Route>
      </Routes>
    </div>
  );
}
```

十、路由匹配规则
1、基本匹配规则
/path：精确匹配路径为 /path 的路由。

/path/subpath：精确匹配路径为 /path/subpath 的路由
```js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 
<Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</Router>
```

2、动态参数匹配规则
```js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 
<Router>
  <Routes>
    {/* 
          匹配路径为 /users/123、/users/abc 等任意值的路由，
          并将匹配到的值存储在 id 参数中
        */}
        <Route path="/users/:id" element={<UserProfile />} />
        {/* 
          匹配路径为 /users 或 /users/123 等任意值的路由，并将匹配到的值存储在 id 参数中，
          如果路径中不包含 id 参数，则 id 参数的值为 undefined
        */}
        <Route path="/users/:id?" element={<UserList />} />
        {/* 
          匹配路径为 /users/123、/users/456 等数字的路由，
          并将匹配到的值存储在 id 参数中，其中 \d+ 表示正则表达式，
          用于匹配一个或多个数字
        */}
  </Routes>
</Router>
```

3、嵌套路由匹配规则
React Router 6 中的嵌套路由需要子路由的 path 包含父级路由的 path
```js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/*
          父级路由 /dashboard 对应的是 Dashboard 组件，
          而子路由 /dashboard/:id 对应的是 DashboardDetail 组件。
          子路由的 path 是完整的路径，包含了父级路由的 path。
          因此，当访问 /dashboard/123 路径时，React Router 会先匹配父级路由 /dashboard，
          然后再匹配子路由 /dashboard/:id，最终渲染 DashboardDetail 组件
        */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/:id" element={<DashboardDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}
```

3、匹配所有路径
在 React Router 6 中，可以使用*来匹配所有路径
```js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 
function App() {
  return (
    <Router>
      <Routes>
        {/*
          我们使用了通配符 * 来匹配所有以 /about/ 开头的路径，
          例如 /about, /about/team, /about/contact 等等。
          当用户访问这些路径时，都会渲染 AboutInfo 组件
        */}
        <Route path="/about/*" element={<about />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
```

二、代码分割
1、代码分割用来解决什么问题
React Router 在使用时，会把所有路由相关的组件都打包进同一个 JavaScript 文件中，这会导致整个应用的体积变得很大，加载时间变长。为了解决这个问题，我们可以使用代码分割（code splitting）技术，将不同的路由组件分别打包成不同的 JavaScript 文件，实现按需加载。

2、React.lazy
React.lazy 是 React 16.6.0 新引入的一个函数，它可以让你很容易地实现代码分割（code splitting），实现组件的按需加载。React.lazy() 函数接受一个函数作为参数，这个函数必须返回一个动态 import() 语句。

const MyComponent = React.lazy(() => import('./MyComponent'));
3、例子
React Router 提供了 React.lazy() 和 React.Suspense 来实现组件的懒加载。React.lazy() 是一个高阶函数，可以将一个动态 import() 语句包装成一个能够被渲染的组件，而 React.Suspense 则是一个组件，可以在组件加载时显示一个 loading 界面，等待组件加载完成后再显示实际内容。
```js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
 
// 使用 React.lazy() 和 import() 来分别定义了三个路由组件 
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));
const Contact = lazy(() => import('./Contact'));
/**
使用 React.Suspense 包裹了整个 Routes 组件，
当路由组件还未加载完成时，会显示一个 "Loading..." 的提示信息
*/
function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

三、路由 (V5) 和路由 (V6) 差异解读
react Router v6使用Hooks来实现路由，而v5使用高阶组件（HOCs）来实现路由。这是它们之间最大的区别。

1、路由配置
React Router v5中的路由配置需要将Route组件作为子组件嵌套在Switch组件中。而React Router v6中的路由配置方式发生了变化。现在，我们需要在Routes组件中使用数组来配置路由。

2、嵌套路由
在React Router v6中，嵌套路由的使用方式更加简单直观。在v5中，嵌套路由需要在组件之间进行深度传递props，而在v6中，可以使用嵌套路由。

3、状态管理
React Router v6通过提供useSearchParams、useLocation和useNavigate等Hooks，使得状态管理变得更加方便。这些Hooks可以帮助我们在不同的路由之间共享状态，而在v5中需要使用类似于redux等外部状态管理库来实现。

四、如何在类组件中使用
编写一个高阶组件：
```js
import React from "react";
import { useNavigate } from "react-router-dom";
 
export default function WithRouter(WarpComponent) {
  const navigate = useNavigate();
  return <WarpComponent {...this.props} navigate={navigate}></WarpComponent>;
}
```
