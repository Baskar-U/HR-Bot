export const questionBank = {
    'JavaScript': [
      {
        question: "Can you explain the difference between 'let', 'const', and 'var' in JavaScript?",
        answer: "- `var`: Function-scoped or globally-scoped, can be redeclared and updated, hoisted to the top of its scope and initialized with undefined. \n- `let`: Block-scoped, can be updated but not redeclared within its scope, hoisted but not initialized. \n- `const`: Block-scoped, cannot be updated or redeclared, must be initialized at declaration, hoisted but not initialized.",
        keyPoints: ["block scope vs function scope", "redeclaration rules", "hoisting behavior", "mutability differences", "initialization requirements"]
      },
      {
        question: "What is the event loop in JavaScript and how does it work?",
        answer: "The event loop is JavaScript's mechanism for handling asynchronous operations. It continuously checks the call stack and the callback queue. When the call stack is empty, it takes the first event from the queue and pushes it to the call stack for execution. This process enables non-blocking behavior in a single-threaded language.",
        keyPoints: ["callback queue", "call stack", "non-blocking", "asynchronous operations", "task prioritization", "microtasks vs macrotasks"]
      },
      {
        question: "How would you describe closures in JavaScript?",
        answer: "A closure is the combination of a function bundled together with references to its surrounding state (lexical environment). It gives you access to an outer function's scope from an inner function, even after the outer function has returned. Closures are created every time a function is created at function creation time.",
        keyPoints: ["lexical scoping", "persistent scope access", "data encapsulation", "private variables", "memory implications"]
      },
      {
        question: "What's the difference between synchronous and asynchronous code in JavaScript?",
        answer: "Synchronous code executes line by line in sequence, blocking further execution until the current operation completes. Asynchronous code allows operations to run in the background without blocking the main thread, using callbacks, promises, or async/await to handle results when they're ready.",
        keyPoints: ["blocking vs non-blocking", "execution order", "callbacks/promises/async-await", "thread utilization", "user experience implications"]
      },
      {
        question: "What are promises in JavaScript? How do they work?",
        answer: "Promises are objects representing the eventual completion or failure of an asynchronous operation and its resulting value. They have three states: pending, fulfilled, or rejected. Promises provide .then() and .catch() methods for handling success and failure cases, and allow for cleaner chaining of asynchronous operations compared to callbacks.",
        keyPoints: ["three states", "then/catch/finally methods", "chaining", "error handling", "Promise.all/race/any methods"]
      },
      {
        question: "Can you explain the difference between `null` and `undefined`?",
        answer: "`undefined` means a variable has been declared but not assigned a value, or a function doesn't return a value explicitly, or trying to access a non-existent object property. `null` is an intentional assignment representing 'no value' or 'empty'. `undefined` is a type itself while `null` is an object. When compared with `==`, they are equal, but with `===`, they are different.",
        keyPoints: ["type differences", "default vs explicit assignment", "equality comparison", "common use cases", "typeof behavior"]
      },
      {
        question: "How does JavaScript handle memory management?",
        answer: "JavaScript uses automatic memory management through garbage collection. The main algorithm is 'mark-and-sweep': it marks objects that are reachable from roots (global objects) and sweeps away those that aren't marked. Variables are garbage collected when they become unreachable. Memory leaks can still occur, especially with closures, event listeners, or circular references.",
        keyPoints: ["garbage collection", "mark-and-sweep", "reference counting", "memory leaks", "weak references"]
      },
      {
        question: "What is the difference between deep copy and shallow copy in JavaScript?",
        answer: "A shallow copy duplicates the top-level properties of an object but nested objects are still referenced, so changes to nested objects affect both copies. A deep copy duplicates everything, creating completely independent copies of nested objects. Shallow copies can be created with Object.assign() or spread operator, while deep copies require methods like JSON.parse(JSON.stringify()) or specialized libraries.",
        keyPoints: ["nested object handling", "reference vs value", "implementation methods", "limitations", "performance considerations"]
      },
      {
        question: "What are arrow functions, and how are they different from regular functions?",
        answer: "Arrow functions are a concise syntax for writing functions in ES6. Key differences: 1) They don't have their own `this` context, instead inheriting from the parent scope. 2) They don't have `arguments` object. 3) Can't be used as constructors (no `new`). 4) Don't have their own `super`. 5) Can't change `this` with call/apply/bind. 6) Provide implicit return for single expressions.",
        keyPoints: ["this binding", "concise syntax", "no arguments object", "not constructable", "implicit returns"]
      },
      {
        question: "How does JavaScript handle hoisting?",
        answer: "Hoisting is JavaScript's behavior of moving declarations to the top of their scope during compilation. Variable declarations (var) are hoisted but not initializations, function declarations are fully hoisted, let/const declarations are hoisted but not initialized (temporal dead zone). This allows using functions before declaration, but variables should be declared before use to avoid unexpected behavior.",
        keyPoints: ["variable vs function hoisting", "temporal dead zone", "var vs let/const", "best practices", "execution context"]
      },
      {
        question: "What is the difference between `==` and `===`?",
        answer: "`==` (loose equality) compares values after type conversion, so '5' == 5 is true. `===` (strict equality) compares both value and type without conversion, so '5' === 5 is false. Strict equality is generally preferred as it prevents unexpected results from type coercion and is more predictable.",
        keyPoints: ["type coercion", "comparison behavior", "null/undefined handling", "NaN comparison", "best practices"]
      },
      {
        question: "Can you explain the concept of prototypal inheritance in JavaScript?",
        answer: "Prototypal inheritance is JavaScript's mechanism for sharing properties and methods between objects. Each object has a hidden [[Prototype]] link to another object (its prototype). When accessing a property, if not found on the object itself, JavaScript looks up the prototype chain until it finds it or reaches null. This enables behavior reuse without traditional class-based inheritance. Modern JavaScript uses classes as syntactic sugar over this system.",
        keyPoints: ["prototype chain", "Object.create()", "constructor functions", "__proto__ vs prototype", "instanceof operator"]
      },
      {
        question: "What is the purpose of the `bind()`, `call()`, and `apply()` methods in JavaScript?",
        answer: "These methods allow explicit setting of `this` context for function execution. `call()` invokes the function immediately with a specified `this` value and arguments provided individually. `apply()` works like `call()` but takes arguments as an array. `bind()` returns a new function with the specified `this` context permanently bound, without immediate execution, allowing partial application of arguments.",
        keyPoints: ["this context control", "immediate vs delayed execution", "argument passing differences", "function borrowing", "partial application"]
      },
      {
        question: "How does JavaScript handle asynchronous operations with async/await?",
        answer: "async/await is syntactic sugar over Promises, making asynchronous code look synchronous. An `async` function always returns a Promise. The `await` keyword can only be used inside async functions and pauses execution until the Promise resolves, allowing sequential-looking code flow. Error handling is done with try/catch blocks. It simplifies Promise chains while maintaining non-blocking behavior.",
        keyPoints: ["Promise-based", "sequential execution", "error handling", "top-level await", "parallel execution techniques"]
      },
      {
        question: "What is event delegation in JavaScript?",
        answer: "Event delegation is a technique where you attach a single event listener to a parent element to handle events for multiple child elements, including future elements. It leverages event bubbling, where events propagate up the DOM tree. This improves performance and memory usage by reducing the number of event listeners, and automatically handles dynamically added elements.",
        keyPoints: ["event bubbling", "performance benefits", "dynamic elements", "event.target vs event.currentTarget", "implementation patterns"]
      },
      {
        question: "Explain how `this` works in JavaScript.",
        answer: "`this` refers to the object that is executing the current function, determined dynamically at runtime based on how the function is called. In global context, it refers to the global object. In object methods, it refers to the object. In event handlers, it refers to the element that received the event. Arrow functions don't have their own `this`; they inherit from the parent scope. The value can be explicitly set using call(), apply(), or bind().",
        keyPoints: ["context determination", "global context", "method invocation", "constructor context", "explicit binding", "arrow function behavior"]
      },
      {
        question: "What are ES6 modules and how do they work?",
        answer: "ES6 modules are JavaScript's official standard for modular code, allowing code to be split into separate files. They use `export` to expose functions, objects, or values, and `import` to bring them into other files. Unlike CommonJS, ES6 modules are static (imports are resolved at compile time), support live bindings (exported values remain connected), and are always in strict mode. They use file-based scoping, where each module has its private scope.",
        keyPoints: ["export/import syntax", "static resolution", "default vs named exports", "live bindings", "browser vs Node.js implementation"]
      }
    ],
    'Python': [
      {
        question: "How do you handle exceptions in Python?",
        answer: "Python uses try/except blocks for exception handling. The try block contains code that might raise exceptions, while except blocks catch and handle specific exceptions. You can have multiple except blocks for different exception types, an else block that runs if no exceptions occur, and a finally block that always executes. You can also raise exceptions explicitly with the raise statement and create custom exceptions by subclassing Exception.",
        keyPoints: ["try/except/else/finally", "exception hierarchy", "custom exceptions", "raise statement", "context managers"]
      },
      {
        question: "What are Python generators and how do they work?",
        answer: "Generators are functions that return an iterator that yields items one at a time, generating values on-the-fly instead of storing them in memory. They use the yield statement to return values and pause execution, resuming where they left off when next() is called again. This makes them memory-efficient for processing large datasets or infinite sequences. They maintain their state between calls.",
        keyPoints: ["yield keyword", "lazy evaluation", "memory efficiency", "state preservation", "generator expressions"]
      },
      {
        question: "Can you explain Python decorators?",
        answer: "Decorators are a design pattern that allow modifying or extending functions or methods without changing their code. They are functions that take another function as an argument, add functionality, and return a new function. Using the @decorator syntax, they can add behavior like logging, timing, access control, or validation. Decorators can also be nested and can take arguments using decorator factories.",
        keyPoints: ["function modification", "@syntax", "wrapper functions", "decorator factories", "class decorators", "functools.wraps"]
      },
      {
        question: "What's the difference between a list and a tuple in Python?",
        answer: "Lists are mutable sequences (can be modified after creation) while tuples are immutable (cannot be changed after creation). Lists use square brackets [], tuples use parentheses (). Tuples are generally faster and can be used as dictionary keys or set elements because of their immutability. Lists have more built-in methods for modification. Tuples are typically used for heterogeneous data, lists for homogeneous sequences.",
        keyPoints: ["mutability difference", "syntax", "performance", "use cases", "hashability"]
      },
      {
        question: "How does Python manage memory?",
        answer: "Python uses automatic memory management with a combination of reference counting and garbage collection. Reference counting tracks how many references point to an object and deallocates it when the count reaches zero. The garbage collector identifies and cleans up reference cycles that reference counting misses. Python also uses memory pooling for small objects and private heaps for efficient allocation. Memory management is handled by the Python Memory Manager.",
        keyPoints: ["reference counting", "garbage collection", "memory pooling", "object lifecycle", "memory optimization"]
      },
      {
        question: "What are list comprehensions in Python?",
        answer: "List comprehensions are concise syntax for creating lists based on existing sequences. They follow the pattern [expression for item in iterable if condition]. This allows filtering and transforming elements in a single line, often replacing multi-line loops. They're more readable and often faster than traditional loops for simple operations. Python also supports similar comprehensions for dictionaries, sets, and generators.",
        keyPoints: ["syntax", "filtering with if", "nested comprehensions", "performance benefits", "readability"]
      },
      {
        question: "What is the difference between `deepcopy` and `copy` in Python?",
        answer: "`copy.copy()` creates a shallow copy, duplicating the container but not the objects it contains (nested objects are referenced, not duplicated). `copy.deepcopy()` creates a deep copy, recursively duplicating all objects contained in the original, resulting in a completely independent structure. Deep copies prevent changes to nested objects from affecting the original, but use more memory and are slower.",
        keyPoints: ["nested object handling", "reference vs duplicate", "when to use each", "performance differences", "copy module"]
      },
      {
        question: "Explain the difference between `is` and `==` in Python.",
        answer: "`==` checks if two objects have the same value (equality of content), while `is` checks if two variables reference exactly the same object in memory (identity). For immutable types like integers or strings, Python may reuse objects (interning), so `is` might return True for equal values in some cases, but this behavior shouldn't be relied upon. Generally, use `==` for value comparison and `is` primarily for comparing with None.",
        keyPoints: ["equality vs identity", "object interning", "memory addresses", "None comparisons", "common pitfalls"]
      },
      {
        question: "What is the Global Interpreter Lock (GIL) in Python?",
        answer: "The GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecode simultaneously. This means CPU-bound Python threads don't run truly in parallel on multi-core systems. The GIL simplifies Python's memory management but limits multi-threaded performance. It doesn't affect I/O-bound threads or multiprocessing. Alternative Python implementations like Jython or IronPython don't have a GIL.",
        keyPoints: ["thread limitations", "impact on parallelism", "CPU-bound vs IO-bound", "multiprocessing alternative", "implementation reasons"]
      },
      {
        question: "What are lambda functions in Python?",
        answer: "Lambda functions are small, anonymous functions defined with the lambda keyword. They can take any number of arguments but can only have one expression. The syntax is `lambda arguments: expression`. They're useful for short functions that are used only once, especially in higher-order functions like map(), filter(), or sorted(). They're more limited than regular functions: no statements, no multi-line expressions, and no docstrings.",
        keyPoints: ["anonymous functions", "single expression", "higher-order function use", "limitations", "functional programming"]
      },
      {
        question: "How do you implement multithreading in Python?",
        answer: "Python supports multithreading through the threading module. You create Thread objects, passing a function and its arguments, then call start() to begin execution and join() to wait for completion. Threads share the same memory space, requiring synchronization mechanisms like locks, semaphores, events, or conditions to prevent race conditions. Due to the GIL, threads are most beneficial for I/O-bound tasks, not CPU-bound operations where multiprocessing is better.",
        keyPoints: ["threading module", "Thread class", "synchronization primitives", "GIL limitations", "daemon threads"]
      },
      {
        question: "What are the differences between Python 2 and Python 3?",
        answer: "Key differences: Python 3 uses Unicode for strings by default while Python 2 uses ASCII. Print is a function in Python 3 (requiring parentheses) versus a statement in Python 2. Division of integers returns a float in Python 3 by default. Exception handling syntax changes (as does raising exceptions). Range returns an iterator in Python 3 instead of a list. Python 3 has new language features like f-strings, async/await, type hints, and matrix multiplication operator.",
        keyPoints: ["Unicode vs ASCII", "print function", "division behavior", "iterator methods", "syntax differences", "new features"]
      },
      {
        question: "How does Python's garbage collection work?",
        answer: "Python uses both reference counting and generational garbage collection. Reference counting deallocates objects when their count reaches zero. The cyclic garbage collector identifies and collects reference cycles that reference counting misses. It uses a generational approach with three generations, with younger generations being checked more frequently. Objects that survive collections are promoted to older generations. The gc module allows manual control over garbage collection.",
        keyPoints: ["reference counting", "cyclic collection", "generations", "gc module", "weakref module"]
      },
      {
        question: "Explain the use of the `with` statement in Python.",
        answer: "The `with` statement creates a context manager that automatically handles resource setup and cleanup. It guarantees that resources like files, locks, or connections are properly released even if exceptions occur. It works with objects that implement the context management protocol (__enter__ and __exit__ methods). Common uses include file operations, database connections, and thread locks. Multiple context managers can be used in a single with statement.",
        keyPoints: ["resource management", "exception handling", "context manager protocol", "common use cases", "contextlib module"]
      },
      {
        question: "What are f-strings in Python?",
        answer: "F-strings (formatted string literals) were introduced in Python 3.6 as a concise way to embed expressions inside string literals using the prefix f or F. They allow embedding variables, expressions, and even function calls inside curly braces {}. They support format specifiers for alignment, precision, and type control. F-strings are more readable and often faster than older formatting methods like % formatting or str.format().",
        keyPoints: ["expression embedding", "syntax", "format specifiers", "performance advantages", "comparison to other formatting"]
      },
      {
        question: "What are the different types of Python inheritance?",
        answer: "Python supports multiple inheritance types: Single inheritance (one parent class), Multiple inheritance (multiple parent classes), Multilevel inheritance (child inherits from a parent that inherits from another), Hierarchical inheritance (multiple children inherit from one parent), and Hybrid inheritance (combination of different types). Python uses the Method Resolution Order (MRO) and C3 linearization algorithm to determine the order of method lookup in complex inheritance scenarios.",
        keyPoints: ["inheritance models", "method resolution order", "super() function", "diamond problem", "mixins"]
      }
    ],
    'React': [
      {
        question: "What is reconciliation in React?",
        answer: "Reconciliation is React's algorithm for diffing two virtual DOM trees to determine which parts need to be updated in the real DOM. When state or props change, React creates a new virtual DOM and compares it with the previous one. It first compares element types, then props, then recursively processes children. React uses heuristics and keys to optimize this process, making updates efficient by minimizing DOM operations.",
        keyPoints: ["virtual DOM diffing", "key props", "element type comparison", "performance optimization", "fiber reconciliation"]
      },
      {
        question: "What are the benefits of using React over vanilla JavaScript?",
        answer: "React offers a component-based architecture for reusable UI elements, a virtual DOM for efficient updates, declarative programming style, unidirectional data flow for predictable state management, strong ecosystem with tools and libraries, JSX for intuitive UI definition, developer tools for debugging, server-side rendering capabilities, and wide community support. These features improve development efficiency, application performance, and code maintainability compared to manual DOM manipulation with vanilla JavaScript.",
        keyPoints: ["component architecture", "virtual DOM", "declarative syntax", "state management", "ecosystem support"]
      },
      {
        question: "How do you optimize React application performance?",
        answer: "React performance optimization strategies include: Using React.memo, PureComponent, or shouldComponentUpdate to prevent unnecessary renders; Implementing virtualization for long lists; Code-splitting with React.lazy and Suspense; Proper key usage in lists; Debouncing or throttling event handlers; Using the production build; Implementing useMemo and useCallback for expensive calculations and callbacks; Avoiding inline function definitions in render; Optimizing images and assets; Using web workers for CPU-intensive tasks; Implementing state management efficiently.",
        keyPoints: ["memoization techniques", "code splitting", "render optimization", "lazy loading", "profiling tools"]
      },
      {
        question: "What is the difference between controlled and uncontrolled components?",
        answer: "Controlled components have their state managed by React through props and state. Form data is handled by React components, with changes processed through handlers like onChange. This gives complete control over the form data flow. Uncontrolled components store form data in the DOM itself, accessed through refs. They're simpler but offer less control. Controlled components provide validation, conditional disabling, and custom formats, while uncontrolled are better for integrating with non-React code.",
        keyPoints: ["state management differences", "form handling", "validation capabilities", "refs usage", "use cases for each"]
      },
      {
        question: "What is the role of keys in React lists?",
        answer: "Keys are special attributes required when creating lists of elements in React. They help React identify which items have changed, been added, or removed, optimizing the reconciliation process. Keys should be stable, unique, and predictable among siblings. Using array indices as keys is generally discouraged for lists that can reorder, as it can lead to performance issues and bugs. Good key sources include database IDs or unique identifiers from your data.",
        keyPoints: ["reconciliation optimization", "unique identification", "stability requirements", "performance impact", "anti-patterns"]
      },
      {
        question: "How do you handle forms in React?",
        answer: "In React, forms are typically handled as controlled components where form elements' values are controlled by React state. You bind input values to state variables and update them with onChange handlers. For multiple inputs, you can use a single handler with name attributes. Form submission is handled with onSubmit, preventing default behavior. Uncontrolled components using refs are an alternative. For complex forms, libraries like Formik or React Hook Form can help with validation, error handling, and form state management.",
        keyPoints: ["controlled components", "form state", "event handlers", "form submission", "validation techniques"]
      },
      {
        question: "What are portals in React?",
        answer: "React portals provide a way to render children into a DOM node outside the parent component's hierarchy, while maintaining the child's position in the React tree for event bubbling. Created with ReactDOM.createPortal(child, container), they're useful for modals, tooltips, or floating elements that need to visually break out of their parent's constraints like overflow:hidden or z-index stacking. Events still bubble according to the React tree, not the DOM tree.",
        keyPoints: ["DOM placement", "event bubbling", "modal implementation", "createPortal API", "use cases"]
      },
      {
        question: "What are the differences between React's class components and functional components?",
        answer: "Class components use ES6 classes, have lifecycle methods, use this keyword for state/props, and can have local state with this.state. Functional components are simpler JavaScript functions, use hooks for state and effects, don't use this, and were previously stateless before hooks. Functional components are now preferred as they're more concise, easier to test, avoid binding issues, perform better, and simplify code reuse with hooks. Class components are maintained for legacy support.",
        keyPoints: ["hooks vs lifecycle methods", "this binding differences", "state management", "code simplicity", "performance considerations"]
      },
      {
        question: "How does React handle events differently from HTML?",
        answer: "React events (synthetic events) are cross-browser wrappers around native events that work consistently across browsers. They use camelCase naming (onClick vs onclick), take functions as event handlers rather than strings, and require preventDefault() to be called explicitly (cannot return false). Event handlers are bound to components, and events are pooled for performance. React delegates events to a single document listener (event delegation) instead of attaching to individual elements.",
        keyPoints: ["synthetic events", "naming conventions", "event delegation", "binding methods", "event pooling"]
      },
      {
        question: "What is React Suspense?",
        answer: "React Suspense is a feature that allows components to 'suspend' rendering while waiting for something (like data or code loading). It displays fallback content during the wait, simplifying asynchronous UI rendering. Originally for code-splitting with React.lazy(), it's being expanded for data fetching. It works by catching promises thrown during rendering and showing a fallback until resolved. This enables declarative loading states and improves user experience for async operations.",
        keyPoints: ["code splitting", "lazy loading", "fallback UI", "error boundaries", "concurrent mode"]
      },
      {
        question: "How do you handle side effects in React?",
        answer: "In functional components, side effects are managed with the useEffect hook, which runs after render and can be configured to run on specific dependency changes. It handles tasks like data fetching, subscriptions, manual DOM manipulations, and cleanup operations. In class components, side effects are spread across lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount. For complex side effects, custom hooks can encapsulate and reuse effect logic across components.",
        keyPoints: ["useEffect hook", "dependency arrays", "cleanup functions", "lifecycle methods", "custom hooks"]
      },
      {
        question: "What is lazy loading in React?",
        answer: "Lazy loading in React defers the loading of components or resources until they're actually needed, improving initial load performance. React.lazy() combined with Suspense enables component code-splitting, loading component code only when rendered. This is particularly useful for large applications where not all components are needed immediately. It works with dynamic imports (import()) to split the bundle. Routes, modals, and below-the-fold content are common candidates for lazy loading.",
        keyPoints: ["code splitting", "dynamic imports", "React.lazy API", "Suspense integration", "performance benefits"]
      },
      {
        question: "How does server-side rendering (SSR) work in React?",
        answer: "Server-side rendering (SSR) in React generates HTML on the server rather than in the browser. ReactDOMServer.renderToString() renders components to static HTML, which is sent to the client. The client then 'hydrates' this HTML with ReactDOM.hydrate(), attaching event listeners without rebuilding the DOM. SSR improves perceived performance with faster First Contentful Paint, helps SEO with complete HTML for crawlers, and works better with slower devices. Frameworks like Next.js or Remix simplify implementing SSR.",
        keyPoints: ["renderToString/hydrate", "performance benefits", "SEO advantages", "implementation challenges", "frameworks support"]
      },
      {
        question: "What is the purpose of `useReducer` hook?",
        answer: "useReducer is a React hook for complex state logic, based on the reducer pattern. It takes a reducer function (state, action) => newState and initial state, returning the current state and a dispatch function. It's an alternative to useState that centralizes state update logic, making it predictable and easier to test. It's ideal for state with multiple sub-values, complex transitions, or where next state depends on previous state. It helps avoid callback hell in deep component trees.",
        keyPoints: ["complex state management", "reducer pattern", "action dispatching", "predictable updates", "state dependencies"]
      },
      {
        question: "How do you manage global state in React applications?",
        answer: "Global state in React can be managed through Context API for simpler cases, or with state management libraries like Redux, Zustand, Recoil, or Jotai for complex applications. Context API provides built-in state sharing across components without prop drilling but may cause unnecessary renders. Redux offers predictable state updates through reducers and centralized store but adds boilerplate. Modern alternatives like Zustand offer simpler APIs with hooks. The choice depends on application size, state complexity, and team familiarity.",
        keyPoints: ["Context API", "Redux", "state management libraries", "performance considerations", "architectural patterns"]
      },
      {
        question: "What is a higher-order component in React?",
        answer: "A Higher-Order Component (HOC) is a function that takes a component and returns a new enhanced component with additional props, state, or behavior. HOCs enable code reuse, logic abstraction, and cross-cutting concerns like authentication, logging, or data fetching. They follow the pattern: const EnhancedComponent = higherOrderComponent(WrappedComponent). Unlike render props or hooks, HOCs modify the component tree. They should be pure, pass unrelated props through, and use composition to avoid naming collisions.",
        keyPoints: ["component enhancement", "code reuse pattern", "composition", "cross-cutting concerns", "implementation best practices"]
      },
      {
        question: "How do you implement code splitting in React?",
        answer: "Code splitting in React divides your app into smaller bundles loaded on demand. It's implemented using dynamic import() with React.lazy() for component-based splitting, and Suspense for loading states. Routes are common splitting points using React Router with lazy loading. Performance benefits include faster initial load times and reduced bundle sizes. Analyzing your bundle with tools like webpack-bundle-analyzer helps identify splitting opportunities. Prefetching can be implemented for anticipated user paths.",
        keyPoints: ["dynamic imports", "React.lazy", "Suspense", "route-based splitting", "performance metrics"]
      },
      {
        question: "How does React handle conditional rendering?",
        answer: "React handles conditional rendering through JavaScript operators. Common patterns include: if statements outside JSX; ternary expressions (condition ? component : alternative); logical && operator for simple cases (condition && component); switch statements for multiple conditions; immediately-invoked functions for complex logic; early returns in functional components; and dedicated rendering functions. These approaches allow dynamically choosing what to render based on props, state, or context.",
        keyPoints: ["ternary operators", "logical && operator", "multiple conditions", "performance considerations", "pattern selection"]
      },
      {
        question: "How does React handle state updates?",
        answer: "React state updates are asynchronous and batched for performance. When setState/useState setter is called, React schedules an update rather than applying it immediately. Updates within the same event handler are batched into a single re-render. State updates based on previous state should use the functional form (prevState => newState) to avoid race conditions. React 18's automatic batching extends this behavior to promises, timeouts, and native events. The process triggers reconciliation to efficiently update the DOM.",
        keyPoints: ["batching", "asynchronous updates", "functional updates", "state dependencies", "rendering cycle"]
      },
      {
        question: "What is the purpose of `React.memo`?",
        answer: "React.memo is a higher-order component that memoizes a functional component, preventing unnecessary re-renders when props haven't changed. It performs a shallow comparison of props by default, only re-rendering when props actually change. It's useful for performance optimization, especially for computationally expensive components. A custom comparison function can be provided as a second argument for more complex prop comparisons. It's the functional component equivalent of PureComponent for class components.",
        keyPoints: ["memoization", "shallow comparison", "performance optimization", "custom comparison", "when to use"]
      },
      {
        question: "How do you prevent unnecessary re-renders in React?",
        answer: "Prevent unnecessary re-renders by using React.memo for functional components or PureComponent for class components to skip renders with unchanged props. Use appropriate keys in lists for efficient updates. Implement shouldComponentUpdate for custom comparison logic. Avoid creating new objects, arrays, or functions during render with useMemo and useCallback hooks. Lift state up or implement proper state management to minimize cascading updates. Use component composition to isolate changing parts. Profile with React DevTools to identify re-render issues.",
        keyPoints: ["memoization techniques", "key management", "dependency optimization", "state structure", "profiling tools"]
      },
      {
        question: "What are synthetic events in React?",
        answer: "Synthetic events are React's cross-browser wrapper around native browser events, providing a consistent interface across different browsers. They follow the same interface as native events but with camelCase naming (onClick instead of onclick). React normalizes these events and handles them through event delegation on the root element for efficiency. Synthetic events are pooled and reused for performance; accessing event properties asynchronously requires event.persist(). They ensure consistent behavior regardless of browser.",
        keyPoints: ["cross-browser consistency", "event delegation", "event pooling", "camelCase naming", "performance optimization"]
      },
      {
        question: "How do you implement authentication in React?",
        answer: "React authentication implementation typically involves: 1) JWT or session-based auth with secure storage in localStorage, cookies, or memory; 2) Context API or state management for auth state; 3) Protected routes with higher-order components or route guards; 4) Interceptors for authenticated API requests; 5) Login/registration forms with validation; 6) Timeout handling and refresh tokens; 7) Logout functionality. Libraries like Auth0, Firebase Authentication, or Okta can simplify implementation. Security considerations include XSS protection, HTTPS, and CSRF protections.",
        keyPoints: ["token management", "protected routes", "context/state for auth", "security practices", "auth libraries"]
      },
      {
        question: "What is the significance of `useCallback` in React?",
        answer: "useCallback is a React hook that returns a memoized callback function, preventing unnecessary re-creation of functions on each render. It takes a function and dependency array, only recreating the function when dependencies change. This optimization prevents unnecessary re-renders of child components that receive the function as props, especially when used with React.memo. It's useful for event handlers passed to optimized child components, callbacks for data fetching, or functions used in useEffect dependencies.",
        keyPoints: ["function memoization", "dependency array", "render optimization", "React.memo integration", "performance comparison with useMemo"]
      },
      {
        question: "How does React Router work?",
        answer: "React Router enables navigation and routing in React applications, rendering different components based on URL paths. It uses the HTML5 History API (or hash history) to synchronize UI with the URL without page reloads. Core components include BrowserRouter (wrapper), Route (path-to-component mapping), Switch/Routes (exclusive routing), Link (navigation without refresh), and useParams/useLocation/useHistory hooks for accessing route information. It supports nested routes, dynamic segments, redirect, private routes, and lazy loading for code-splitting.",
        keyPoints: ["declarative routing", "history management", "route matching", "dynamic parameters", "programmatic navigation"]
      },
      {
        question: "How does React handle context?",
        answer: "React Context provides a way to share data across the component tree without prop drilling. It consists of: 1) React.createContext() creates a Context object with optional default value; 2) Context.Provider wraps components and supplies the value; 3) Components consume this value using Context.Consumer or useContext hook. Context is designed for low-frequency updates like themes, authentication, or localization. While powerful, excessive Context use can harm component reusability and cause unnecessary renders without careful optimization.",
        keyPoints: ["createContext API", "Provider/Consumer pattern", "useContext hook", "performance considerations", "appropriate use cases"]
      },
      {
        question: "What are custom hooks in React?",
        answer: "Custom hooks are JavaScript functions that start with 'use' and may call other hooks, allowing extraction and reuse of stateful logic between components without changing component hierarchy. They enable sharing logic that was previously limited to HOCs or render props. Each call to a custom hook has completely isolated state. Common use cases include form handling, data fetching, subscription management, timers, and device status. They maintain React's compositional nature while solving cross-cutting concerns.",
        keyPoints: ["stateful logic reuse", "hook composition", "naming convention", "isolated state", "common patterns"]
      },
      {
        question: "What is progressive web app (PWA) in React?",
        answer: "A Progressive Web App (PWA) built with React combines web and native app features. Key characteristics include: offline functionality using Service Workers; installability with web app manifest; responsive design; app-like interactions; push notifications; background sync; and improved performance with techniques like code-splitting. React PWAs typically use tools like Workbox for service worker management and libraries like react-helmet for manifest integration. Create React App includes PWA template for easy setup.",
        keyPoints: ["service workers", "web app manifest", "offline capabilities", "installation process", "performance strategies"]
      },
      {
        question: "How do you fetch data in React applications?",
        answer: "Data fetching in React can be implemented with useEffect hook for functional components or lifecycle methods for class components. Common approaches include: using fetch API or Axios library; creating custom hooks for reusable fetching logic; implementing loading/error states; cancelling requests on component unmount; caching with useMemo or external state management. Modern patterns include React Query or SWR libraries for declarative data fetching with automatic caching, pagination, refetching, and optimistic updates.",
        keyPoints: ["useEffect implementation", "axios/fetch usage", "loading/error states", "custom fetch hooks", "specialized libraries"]
      },
      {
        question: "What is the role of Redux in React?",
        answer: "Redux is a state management library commonly used with React for managing application state. It provides a predictable state container with a single store containing the entire state tree, pure reducer functions that specify state changes, and actions dispatched to trigger these changes. Redux helps with complex state logic, shared state across components, predictable state updates, debugging capabilities, middleware support, and time-travel debugging. Modern Redux uses Redux Toolkit to reduce boilerplate and the useSelector/useDispatch hooks for React integration.",
        keyPoints: ["single source of truth", "unidirectional data flow", "reducers/actions/store", "middleware", "devtools and debugging"]
      },
      {
        question: "Can you explain the virtual DOM concept in React?",
        answer: "The Virtual DOM is React's lightweight representation of the actual DOM in memory. When state changes, React creates a new Virtual DOM tree and compares it with the previous one through a process called reconciliation. It identifies the minimal number of operations needed to update the real DOM, batching changes for efficiency. This approach is faster than direct DOM manipulation because most operations happen on the lightweight Virtual DOM, and the expensive DOM operations are minimized and batched. It also provides a declarative API focusing on what the UI should look like.",
        keyPoints: ["lightweight DOM representation", "diffing algorithm", "reconciliation process", "performance benefits", "batched updates"]
      },
      {
        question: "What are React hooks and why were they introduced?",
        answer: "React Hooks are functions that let functional components use state, lifecycle features, and other React features previously available only in class components. They were introduced in React 16.8 to solve problems with class components: complex component logic becomes hard to understand; classes are confusing for humans and machines (this binding, hot reloading issues); and reusing stateful logic between components was difficult. Hooks enable better code organization, reusing stateful logic without changing component hierarchy, and using React features without classes.",
        keyPoints: ["stateful functional components", "code reusability", "simplifying lifecycle logic", "composition over inheritance", "reduced boilerplate"]
      },
      {
        question: "How do you manage state in a React application?",
        answer: "React state management uses useState for local component state and useReducer for more complex state logic. For sharing state between components, options include lifting state up to common ancestors, Context API for intermediate scopes, or state management libraries like Redux, Zustand, Recoil, or MobX for application-wide state. The choice depends on application size, state complexity, and team preferences. Modern approaches favor composing multiple specialized state solutions rather than using a single global state store.",
        keyPoints: ["component state", "lifting state up", "context API", "state management libraries", "composition strategies"]
      },
      {
        question: "What is JSX in React?",
        answer: "JSX (JavaScript XML) is a syntax extension for JavaScript recommended by React that resembles HTML. It allows writing HTML-like code in JavaScript files, making UI code more readable and intuitive. JSX gets transformed by tools like Babel into regular JavaScript function calls (React.createElement()). JSX supports embedding JavaScript expressions within curly braces, spreading props, conditional rendering, and iterative rendering. While optional, it's widely used in React development for its declarative syntax and visual clarity.",
        keyPoints: ["syntax extension", "transpilation process", "expression embedding", "attribute handling", "React.createElement equivalent"]
      },
      {
        question: "What is the significance of `useEffect` in React?",
        answer: "useEffect is a React hook for handling side effects in functional components. It runs after render, handling tasks previously spread across lifecycle methods. It takes a function to run and an optional dependency array that controls when it executes. useEffect supports cleanup via a return function, essential for subscriptions or event listeners. The dependency array can be empty (run once), omitted (run every render), or specified (run when dependencies change). It's used for data fetching, DOM manipulation, subscriptions, and any synchronization with external systems.",
        keyPoints: ["side effect management", "dependency array", "cleanup function", "comparison to lifecycle methods", "common use cases"]
      },
      {
        question: "What are React fragments and why are they useful?",
        answer: "React Fragments (<React.Fragment> or the shorthand <>) let you group multiple elements without adding extra nodes to the DOM. They're useful when: returning multiple elements from a component; creating tables with proper HTML structure; mapping lists without wrapper divs; avoiding unnecessary DOM nesting that can break CSS layouts or accessibility. Fragments improve performance by reducing DOM nodes and memory usage. The shorthand syntax doesn't support keys, while the full syntax does, which is important for lists.",
        keyPoints: ["grouping without extra DOM nodes", "layout preservation", "performance benefits", "syntax variants", "key support"]
      },
      {
        question: "How do React's reconciliation and rendering process work?",
        answer: "React's rendering process: 1) State/props change triggers render phase. 2) React calls component functions to get new elements. 3) Reconciliation compares previous and new element trees using Fiber architecture. 4) React identifies what changed using diffing algorithm (first comparing element types, then props, then recursively processing children). 5) Commit phase applies actual DOM updates. 6) Browser repaints. Optimizations include batching updates, scheduling non-urgent updates, and using keys to track element identity across renders.",
        keyPoints: ["render and commit phases", "diffing algorithm", "fiber architecture", "update scheduling", "DOM batching"]
      },
      {
        question: "How can you optimize the performance of a React application?",
        answer: "React performance optimization techniques include: 1) Using React.memo, PureComponent, or shouldComponentUpdate to prevent unnecessary re-renders; 2) Code-splitting with React.lazy and Suspense; 3) Virtualization for long lists with react-window or react-virtualized; 4) Optimizing state structure and updates; 5) Using useMemo and useCallback for expensive calculations and callbacks; 6) Proper key usage in lists; 7) Web performance optimizations like image optimization, caching strategies, and minimizing bundle size; 8) Using production builds; 9) Server-side rendering for improved initial load; 10) Progressive loading strategies.",
        keyPoints: ["prevent unnecessary renders", "code splitting", "virtualization", "state optimization", "bundle size reduction"]
      },
      {
        question: "What are higher-order components (HOC) in React?",
        answer: "Higher-Order Components (HOCs) are functions that take a component and return a new enhanced component with additional props, state, or behavior. Following the pattern const EnhancedComponent = hoc(WrappedComponent), they enable code reuse, separation of concerns, and cross-cutting functionality like authentication, logging, or data fetching. Unlike hooks or render props, HOCs modify the component tree. Best practices include: composing multiple HOCs, passing unrelated props through, maintaining the original component's static methods, and using displayName for debugging.",
        keyPoints: ["component enhancement pattern", "code reuse", "composition", "wrapping components", "comparison to hooks"]
      },
      {
        question: "What is React Router and how does it work?",
        answer: "React Router is a standard library for routing in React applications, enabling navigation between components based on URL paths without page reloads. It uses the History API (or hash history) to update the URL and UI synchronously. Key components include Router (BrowserRouter/HashRouter), Routes/Route for path-to-component mapping, Link/NavLink for navigation, and hooks like useParams, useNavigate, and useLocation for accessing route information. Features include nested routing, private routes, redirects, dynamic path segments, and route-based code splitting with React.lazy().",
        keyPoints: ["client-side routing", "route configuration", "navigation components", "route parameters", "programmatic navigation"]
      },
      {
        question: "How do you handle global state management in React?",
        answer: "Global state in React can be managed through various approaches: 1) Context API for simpler applications or component trees; 2) Redux for predictable state with actions, reducers, and middleware; 3) Zustand for simpler Redux-like state with hooks; 4) Recoil for atomic state management; 5) Jotai for primitive atom-based state; 6) MobX for reactive state with observables. The choice depends on application size, state complexity, team experience, and performance needs. Modern approaches often combine multiple specialized state solutions rather than using a single global store.",
        keyPoints: ["context API limitations", "Redux patterns", "modern alternatives", "performance considerations", "implementation strategies"]
      },
      {
        question: "What is Context API in React?",
        answer: "Context API provides a way to pass data through the component tree without manually passing props at every level, solving the prop drilling problem. It consists of React.createContext() that creates a Context object, Context.Provider that wraps components and provides value, and useContext hook or Context.Consumer to consume the value. It's ideal for 'global' data like themes, user authentication, or localization. While powerful, it lacks some optimizations of specialized state libraries and can cause unnecessary re-renders if not structured carefully.",
        keyPoints: ["createContext API", "provider component", "consumer patterns", "useContext hook", "appropriate use cases"]
      },
      {
        question: "How does React handle component lifecycle methods?",
        answer: "In class components, React provides lifecycle methods in three phases: Mounting (constructor, getDerivedStateFromProps, render, componentDidMount), Updating (getDerivedStateFromProps, shouldComponentUpdate, render, getSnapshotBeforeUpdate, componentDidUpdate), and Unmounting (componentWillUnmount). In functional components, the useEffect hook replaces most lifecycle methods: effects with empty dependency arrays are like componentDidMount, effects with dependencies are like componentDidUpdate, and effect cleanup functions are like componentWillUnmount. More specialized hooks like useLayoutEffect handle specific cases.",
        keyPoints: ["mounting cycle", "updating cycle", "unmounting cycle", "hooks equivalent", "legacy methods"]
      },
      {
        question: "What are pure components in React?",
        answer: "Pure Components (React.PureComponent) are class components that automatically implement shouldComponentUpdate with a shallow comparison of props and state. They only re-render when props or state actually change, improving performance by avoiding unnecessary renders. Functional components can achieve the same optimization with React.memo(). Pure components work best with immutable data patterns and simple props. They should be used carefully with complex or nested objects since shallow comparison might miss deep changes, leading to missed updates.",
        keyPoints: ["shallow comparison", "performance optimization", "immutability importance", "React.memo equivalent", "potential pitfalls"]
      }
    ],
    'Full Stack': [
      {
        question: "What modules or technologies do you typically use in full stack development?",
        answer: "A typical full stack development stack might include: Frontend technologies like React, Angular, or Vue.js for UI; HTML/CSS/JavaScript; Backend frameworks like Node.js/Express, Django, Ruby on Rails, or Spring Boot; Databases such as PostgreSQL, MongoDB, MySQL, or Redis; State management with Redux, Context API, or MobX; API technologies like REST, GraphQL, or WebSockets; Authentication with JWT, OAuth, or Passport.js; CSS frameworks like Tailwind or Bootstrap; Testing frameworks; Build tools like Webpack or Vite; and deployment technologies like Docker, Kubernetes, AWS/Azure/GCP services.",
        keyPoints: ["frontend frameworks", "backend technologies", "databases", "APIs", "deployment tools"]
      },
      {
        question: "How do you handle communication between frontend and backend?",
        answer: "Communication between frontend and backend typically uses HTTP/HTTPS protocols with REST APIs or GraphQL. REST uses standard HTTP methods (GET, POST, PUT, DELETE) with JSON or XML data formats, while GraphQL provides a single endpoint with precise data requests. Real-time communication can use WebSockets or Server-Sent Events. API clients like Axios or fetch handle requests on the frontend. Best practices include consistent error handling, request/response validation, authentication tokens in headers, CORS configuration, rate limiting, and API versioning. Documentation tools like Swagger/OpenAPI help maintain clarity.",
        keyPoints: ["REST vs GraphQL", "HTTP/HTTPS protocols", "authentication methods", "real-time options", "error handling"]
      },
      {
        question: "What databases have you worked with in your full stack projects?",
        answer: "Full stack projects commonly use various database types: Relational databases (PostgreSQL, MySQL, SQLite) for structured data with complex relationships; NoSQL databases (MongoDB, CouchDB) for flexible schema and horizontal scaling; Time-series databases (InfluxDB, TimescaleDB) for metrics and logs; In-memory databases (Redis, Memcached) for caching and session storage; Graph databases (Neo4j) for highly connected data; and search engines (Elasticsearch) for full-text search capabilities. Selection factors include data structure, query patterns, scaling needs, consistency requirements, and development team expertise.",
        keyPoints: ["relational vs NoSQL", "specific database strengths", "use case matching", "schema design", "performance considerations"]
      },
      {
        question: "How do you approach authentication in a full stack application?",
        answer: "Full stack authentication approaches include: Session-based authentication with cookies; Token-based authentication (JWT) stored in localStorage/cookies; OAuth/OpenID Connect for third-party authentication; Passwordless authentication via email/SMS; Multi-factor authentication for sensitive applications. Implementation typically involves secure credential storage with password hashing (bcrypt/Argon2), HTTPS for all communication, CSRF protection, secure cookie flags (httpOnly, secure, sameSite), token expiration and refresh mechanisms, and proper logging. Libraries like Passport.js, Auth0, or Firebase Authentication can simplify implementation while maintaining security.",
        keyPoints: ["token vs session", "security best practices", "OAuth flow", "password handling", "MFA implementation"]
      },
      {
        question: "What is RESTful API, and how does it work?",
        answer: "RESTful API is an architectural style for networked applications based on representational state transfer (REST) principles. It uses standard HTTP methods: GET (retrieve), POST (create), PUT/PATCH (update), and DELETE (remove). Resources are identified by URLs, operations are stateless, responses include status codes, and data is typically formatted as JSON or XML. REST principles include client-server architecture, statelessness, cacheability, layered system, uniform interface, and HATEOAS (Hypermedia as the Engine of Application State). Properly designed REST APIs are predictable, scalable, and maintainable.",
        keyPoints: ["HTTP methods", "resource representation", "statelessness", "status codes", "REST principles"]
      },
      {
        question: "How does GraphQL compare to REST?",
        answer: "GraphQL differs from REST in several key ways: It uses a single endpoint instead of multiple resource-based endpoints; clients specify exactly what data they need, reducing over-fetching and under-fetching; it enables fetching related resources in a single request; has a strongly typed schema that serves as documentation and enables validation; offers real-time capabilities with subscriptions. REST advantages include better caching, simpler implementation for simple APIs, and wider adoption. GraphQL excels with complex data requirements, multiple client platforms with different data needs, and rapidly evolving APIs.",
        keyPoints: ["query specificity", "single endpoint", "over/under-fetching", "type system", "performance trade-offs"]
      },
      {
        question: "How do you implement role-based access control in a full stack app?",
        answer: "Role-based access control (RBAC) implementation involves: 1) Defining roles and permissions in the database; 2) Implementing backend middleware to verify permissions before allowing access to routes/resources; 3) Adding role verification in business logic; 4) Storing user roles in JWT tokens or session data; 5) Implementing UI-level permission checks to show/hide elements based on user roles; 6) Creating protected routes in frontend routing. Best practices include principle of least privilege, role hierarchy, separation of duties, proper permission granularity, and comprehensive testing of access controls across the application.",
        keyPoints: ["permission modeling", "middleware implementation", "frontend integration", "token-based roles", "security considerations"]
      },
      {
        question: "How do you secure sensitive data in a web application?",
        answer: "Securing sensitive data in web applications involves multiple layers: 1) HTTPS/TLS for all communications; 2) Proper authentication and authorization; 3) Password hashing with strong algorithms (bcrypt, Argon2); 4) Input validation and sanitization to prevent injection attacks; 5) Encryption for sensitive stored data; 6) Secure headers (Content-Security-Policy, X-XSS-Protection); 7) Protection against CSRF attacks; 8) Proper session management; 9) Limited error messages that don't leak information; 10) Regular security audits and updates; 11) Data minimization; 12) Compliance with regulations like GDPR or HIPAA for applicable data.",
        keyPoints: ["transport security", "data encryption", "authentication security", "secure coding practices", "regulatory compliance"]
      },
      {
        question: "How do you optimize API performance in a full stack application?",
        answer: "API performance optimization strategies include: Implementing proper database indexing; Using query optimization techniques; Implementing caching with Redis, Memcached, or CDNs; Data pagination and limiting response size; Compression of API responses (gzip/brotli); Connection pooling for databases; Asynchronous processing for time-consuming operations; Horizontal scaling with load balancers; Database sharding for large datasets; Using efficient data serialization; Query batching to reduce round trips; Optimizing ORM/database access patterns; Implementing proper HTTP cache headers; Database denormalization where appropriate; and monitoring/profiling to identify bottlenecks.",
        keyPoints: ["caching strategies", "database optimization", "pagination techniques", "compression", "asynchronous processing"]
      },
      {
        question: "What caching mechanisms do you use in full stack development?",
        answer: "Full stack caching strategies include: Browser caching with HTTP headers (Cache-Control, ETag); CDN caching for static assets; Application-level caching with memory stores like Redis or Memcached; Database query caching; API response caching; Data fetching libraries with built-in caching (React Query, SWR); Service worker caching for offline capabilities; HTML/page caching for server-rendered content; and object caching in memory. Effective implementation requires cache invalidation strategies, versioning for static assets, and consideration of cache hit ratios and storage requirements.",
        keyPoints: ["browser caching", "server-side caching", "CDNs", "cache invalidation", "memory vs persistent cache"]
      },
      {
        question: "How do you handle database migrations in a full stack project?",
        answer: "Database migration strategies involve: Using migration tools specific to your stack (like Sequelize, Knex.js, Django Migrations, Rails ActiveRecord, Flyway, or Liquibase); Version controlling migration files; Implementing both up and down migrations for changes and rollbacks; Testing migrations in staging environments; Automating migration execution in deployment pipelines; Handling data migration separately from schema changes for large datasets; Implementing backward compatibility periods during major changes; Creating migration documentation; and having backup strategies before running migrations in production.",
        keyPoints: ["migration tools", "version control", "testing strategy", "rollback capability", "deployment integration"]
      },
      {
        question: "What are web sockets, and how do they work?",
        answer: "WebSockets are a communication protocol providing full-duplex communication over a single, long-lived TCP connection between client and server. Unlike HTTP's request-response model, WebSockets allow bidirectional data flow, making them ideal for real-time applications like chat, live updates, gaming, or collaborative editing. The connection starts as an HTTP request that upgrades to WebSocket protocol. Libraries like Socket.IO, ws, or SockJS simplify implementation with features like fallbacks for unsupported browsers, automatic reconnection, and event-based messaging. WebSockets significantly reduce latency for real-time data exchange.",
        keyPoints: ["bidirectional communication", "connection upgrade process", "real-time capabilities", "implementation libraries", "use cases"]
      },
      {
        question: "What is the difference between monolithic and microservices architecture?",
        answer: "Monolithic architecture packages all application components (UI, business logic, data access) in a single codebase and deployment unit. This simplifies development, testing, and deployment but becomes complex and difficult to scale as the application grows. Microservices architecture splits the application into independent services, each handling specific functionality and potentially using different technologies. Microservices offer better scalability, technology flexibility, and team autonomy, but introduce complexity in service communication, deployment orchestration, and monitoring. The choice depends on application size, team structure, scaling requirements, and development velocity needs.",
        keyPoints: ["architectural differences", "scalability comparison", "development complexity", "deployment considerations", "appropriate use cases"]
      },
      {
        question: "How do you manage environment variables in full stack applications?",
        answer: "Environment variable management in full stack applications involves: Using .env files with tools like dotenv while ensuring they're not committed to version control; Having different configurations for development, testing, and production environments; Securely storing sensitive variables in services like AWS Secrets Manager, Azure Key Vault, or HashiCorp Vault; Injecting variables through CI/CD pipelines; Using environment-specific variables in frontend builds; Creating fallback values for non-critical variables; Documenting required variables; and implementing validation to ensure required variables exist before application startup.",
        keyPoints: ["configuration management", "security for secrets", "environment-specific configs", "deployment considerations", "validation strategies"]
      },
      {
        question: "What tools do you use for CI/CD in full stack development?",
        answer: "CI/CD tools in full stack development include: Git-based platforms like GitHub Actions, GitLab CI, or Bitbucket Pipelines; dedicated CI servers like Jenkins or CircleCI; containerization with Docker and orchestration with Kubernetes; infrastructure as code tools like Terraform or AWS CloudFormation; configuration management tools like Ansible or Chef; artifact repositories like Nexus or JFrog; monitoring and alerting tools; automated testing frameworks; and deployment strategies like blue-green or canary deployments. The pipeline typically includes code linting, testing, building, security scanning, and deploying to staging and production environments.",
        keyPoints: ["CI/CD platforms", "pipeline stages", "testing integration", "deployment strategies", "containerization"]
      }
    ],
    'Default': [
      {
        question: "What are the different types of encryption techniques?",
        answer: "Encryption techniques include: Symmetric encryption (AES, 3DES) using the same key for encryption and decryption; Asymmetric encryption (RSA, ECC) using public and private key pairs; Hash functions (SHA-256, bcrypt) for one-way transformation; Digital signatures combining hashing and asymmetric encryption; Homomorphic encryption allowing computation on encrypted data; End-to-end encryption for secure communication; and Quantum encryption using quantum mechanics principles. Each serves different purposes in security, from secure data storage and communication to authentication and integrity verification.",
        keyPoints: ["symmetric vs asymmetric", "common algorithms", "use cases", "key management", "performance considerations"]
      },
      {
        question: "What is the difference between symmetric and asymmetric encryption?",
        answer: "Symmetric encryption uses a single key for both encryption and decryption, making it faster but requiring secure key exchange. Common algorithms include AES, DES, and 3DES. Asymmetric encryption uses a key pair (public and private), where data encrypted with the public key can only be decrypted with the corresponding private key. It's slower but solves the key distribution problem. Common algorithms include RSA, ECC, and DSA. In practice, hybrid systems often use asymmetric encryption to exchange symmetric keys, then symmetric encryption for bulk data due to its efficiency.",
        keyPoints: ["key management", "performance differences", "algorithm examples", "practical applications", "security trade-offs"]
      },
      {
        question: "How does HTTPS ensure secure communication?",
        answer: "HTTPS ensures secure communication through: TLS (Transport Layer Security) protocol establishing an encrypted connection; Certificate validation where browsers verify website identity using digital certificates issued by trusted Certificate Authorities; Public-key cryptography to securely exchange the symmetric encryption key; Symmetric encryption for the actual data transfer; Message authentication codes (MACs) ensuring data integrity; Perfect forward secrecy preventing decryption of past communications if keys are compromised; and HTTP Strict Transport Security (HSTS) forcing secure connections. This protects against eavesdropping, man-in-the-middle attacks, and data tampering.",
        keyPoints: ["TLS handshake", "certificate validation", "encryption layers", "integrity checks", "protocol vulnerabilities"]
      },
      {
        question: "What are common OWASP Top 10 security vulnerabilities?",
        answer: "The OWASP Top 10 (2021) includes: 1) Broken Access Control allowing unauthorized access; 2) Cryptographic Failures from poor implementation of encryption; 3) Injection flaws like SQL injection; 4) Insecure Design addressing security requirements in development; 5) Security Misconfiguration from improper setup; 6) Vulnerable and Outdated Components with known vulnerabilities; 7) Identification and Authentication Failures like weak passwords; 8) Software and Data Integrity Failures; 9) Security Logging and Monitoring Failures; and 10) Server-Side Request Forgery (SSRF). These vulnerabilities represent the most critical security risks to web applications.",
        keyPoints: ["injection attacks", "authentication weaknesses", "access control", "cryptographic issues", "mitigation strategies"]
      },
      {
        question: "What is SQL injection and how do you prevent it?",
        answer: "SQL injection is an attack where malicious SQL code is inserted into application inputs to manipulate the database. Prevention methods include: Using parameterized queries/prepared statements that separate SQL code from user data; Input validation to reject suspicious characters; Using ORMs (Object-Relational Mappers) that handle query sanitization; Implementing least privilege database accounts; Using stored procedures; Escaping special characters in inputs; Regular security testing; and implementing WAF (Web Application Firewalls) to detect and block attempts. Modern frameworks provide built-in protections, but custom SQL still requires careful handling.",
        keyPoints: ["parameterized queries", "input validation", "ORM usage", "principle of least privilege", "detection techniques"]
      },
      {
        question: "What are the differences between hashing and encryption?",
        answer: "Hashing creates a fixed-length, one-way digest of data that cannot be reversed, making it ideal for password storage and data integrity verification. Encryption transforms data using an algorithm and key that can be reversed with the proper key, designed for data that needs to be retrieved in its original form. Hashing always produces the same output for the same input, while encryption produces different outputs based on the key used. Common hashing algorithms include SHA-256 and bcrypt (with salting for passwords), while encryption uses algorithms like AES and RSA.",
        keyPoints: ["reversibility", "use cases", "key requirements", "salting in hashing", "algorithm examples"]
      },
      {
        question: "What is two-factor authentication (2FA) and how does it work?",
        answer: "Two-factor authentication (2FA) is a security method requiring users to provide two different authentication factors: something they know (password), something they have (mobile device, security key), or something they are (biometrics). Implementation typically involves: Account login with password; Generation of a temporary verification code via app, SMS, email, or hardware token; Verification of the code to complete authentication. This protects accounts even if passwords are compromised. Common methods include authenticator apps (TOTP), SMS codes, push notifications, hardware security keys (FIDO2/U2F), and biometric verification.",
        keyPoints: ["authentication factors", "implementation methods", "TOTP explanation", "security considerations", "user experience balance"]
      },
      {
        question: "How do you secure API endpoints?",
        answer: "Securing API endpoints involves multiple strategies: Implementing proper authentication (API keys, JWT, OAuth); Authorization with role-based access control; HTTPS/TLS for all communications; Input validation and sanitization; Rate limiting to prevent abuse; Implementing proper CORS policies; Using secure headers (Content-Security-Policy); API versioning; Implementing request timeouts; Avoiding exposing sensitive data in responses; Implementing proper error handling that doesn't leak information; Regular security audits and penetration testing; and keeping detailed logs for security monitoring and incident response.",
        keyPoints: ["authentication methods", "rate limiting", "input validation", "transport security", "monitoring and logging"]
      },
      {
        question: "What is Cross-Site Scripting (XSS) and how do you prevent it?",
        answer: "Cross-Site Scripting (XSS) is an attack where malicious scripts are injected into trusted websites and execute in users' browsers, potentially stealing cookies, session tokens, or personal information. Prevention methods include: Input validation and sanitization; Output encoding based on context (HTML, JavaScript, CSS, URL); Using Content-Security-Policy headers to restrict script execution; Implementing HttpOnly and Secure flags for cookies; Using modern frameworks with built-in XSS protections; Employing the X-XSS-Protection header; Using template systems that automatically escape content; and regular security testing to identify vulnerabilities.",
        keyPoints: ["attack vectors", "types of XSS", "input sanitization", "output encoding", "CSP implementation"]
      },
    ]
};

export default questionBank;




