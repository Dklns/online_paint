import {
  Reaction,
  configure,
  getDependencyTree,
  makeObservable,
  observable,
  runInAction
} from "./chunk-YHIQ4YLE.js";
import {
  require_react_dom
} from "./chunk-RVSLBP3T.js";
import {
  require_react
} from "./chunk-ST3U5LCA.js";
import {
  __toESM
} from "./chunk-DFKQJ226.js";

// node_modules/mobx-react-lite/es/utils/assertEnvironment.js
var import_react = __toESM(require_react());
if (!import_react.useState) {
  throw new Error("mobx-react-lite requires React with Hooks support");
}
if (!makeObservable) {
  throw new Error("mobx-react-lite@3 requires mobx at least version 6 to be available");
}

// node_modules/mobx-react-lite/es/utils/reactBatchedUpdates.js
var import_react_dom = __toESM(require_react_dom());

// node_modules/mobx-react-lite/es/utils/observerBatching.js
function defaultNoopBatch(callback) {
  callback();
}
function observerBatching(reactionScheduler) {
  if (!reactionScheduler) {
    reactionScheduler = defaultNoopBatch;
    if (true) {
      console.warn("[MobX] Failed to get unstable_batched updates from react-dom / react-native");
    }
  }
  configure({ reactionScheduler });
}
var isObserverBatched = function() {
  if (true) {
    console.warn("[MobX] Deprecated");
  }
  return true;
};

// node_modules/mobx-react-lite/es/utils/utils.js
var deprecatedMessages = [];
function useDeprecated(msg) {
  if (!deprecatedMessages.includes(msg)) {
    deprecatedMessages.push(msg);
    console.warn(msg);
  }
}

// node_modules/mobx-react-lite/es/useObserver.js
var import_react2 = __toESM(require_react());

// node_modules/mobx-react-lite/es/utils/printDebugValue.js
function printDebugValue(v) {
  return getDependencyTree(v);
}

// node_modules/mobx-react-lite/es/utils/UniversalFinalizationRegistry.js
var REGISTRY_FINALIZE_AFTER = 1e4;
var REGISTRY_SWEEP_INTERVAL = 1e4;
var TimerBasedFinalizationRegistry = (
  /** @class */
  function() {
    function TimerBasedFinalizationRegistry2(finalize) {
      var _this = this;
      Object.defineProperty(this, "finalize", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: finalize
      });
      Object.defineProperty(this, "registrations", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /* @__PURE__ */ new Map()
      });
      Object.defineProperty(this, "sweepTimeout", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "sweep", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: function(maxAge) {
          if (maxAge === void 0) {
            maxAge = REGISTRY_FINALIZE_AFTER;
          }
          clearTimeout(_this.sweepTimeout);
          _this.sweepTimeout = void 0;
          var now = Date.now();
          _this.registrations.forEach(function(registration, token) {
            if (now - registration.registeredAt >= maxAge) {
              _this.finalize(registration.value);
              _this.registrations.delete(token);
            }
          });
          if (_this.registrations.size > 0) {
            _this.scheduleSweep();
          }
        }
      });
      Object.defineProperty(this, "finalizeAllImmediately", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: function() {
          _this.sweep(0);
        }
      });
    }
    Object.defineProperty(TimerBasedFinalizationRegistry2.prototype, "register", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function(target, value, token) {
        this.registrations.set(token, {
          value,
          registeredAt: Date.now()
        });
        this.scheduleSweep();
      }
    });
    Object.defineProperty(TimerBasedFinalizationRegistry2.prototype, "unregister", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function(token) {
        this.registrations.delete(token);
      }
    });
    Object.defineProperty(TimerBasedFinalizationRegistry2.prototype, "scheduleSweep", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function() {
        if (this.sweepTimeout === void 0) {
          this.sweepTimeout = setTimeout(this.sweep, REGISTRY_SWEEP_INTERVAL);
        }
      }
    });
    return TimerBasedFinalizationRegistry2;
  }()
);
var UniversalFinalizationRegistry = typeof FinalizationRegistry !== "undefined" ? FinalizationRegistry : TimerBasedFinalizationRegistry;

// node_modules/mobx-react-lite/es/utils/observerFinalizationRegistry.js
var observerFinalizationRegistry = new UniversalFinalizationRegistry(function(adm) {
  var _a2;
  (_a2 = adm.reaction) === null || _a2 === void 0 ? void 0 : _a2.dispose();
  adm.reaction = null;
});

// node_modules/mobx-react-lite/es/staticRendering.js
var globalIsUsingStaticRendering = false;
function enableStaticRendering(enable) {
  globalIsUsingStaticRendering = enable;
}
function isUsingStaticRendering() {
  return globalIsUsingStaticRendering;
}

// node_modules/mobx-react-lite/es/useObserver.js
var __read = function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};
function observerComponentNameFor(baseComponentName) {
  return "observer".concat(baseComponentName);
}
var ObjectToBeRetainedByReact = (
  /** @class */
  function() {
    function ObjectToBeRetainedByReact2() {
    }
    return ObjectToBeRetainedByReact2;
  }()
);
function objectToBeRetainedByReactFactory() {
  return new ObjectToBeRetainedByReact();
}
function useObserver(fn, baseComponentName) {
  if (baseComponentName === void 0) {
    baseComponentName = "observed";
  }
  if (isUsingStaticRendering()) {
    return fn();
  }
  var _a2 = __read(import_react2.default.useState(objectToBeRetainedByReactFactory), 1), objectRetainedByReact = _a2[0];
  var _b = __read(import_react2.default.useState(), 2), setState = _b[1];
  var forceUpdate = function() {
    return setState([]);
  };
  var admRef = import_react2.default.useRef(null);
  if (!admRef.current) {
    admRef.current = {
      reaction: null,
      mounted: false,
      changedBeforeMount: false
    };
  }
  var adm = admRef.current;
  if (!adm.reaction) {
    adm.reaction = new Reaction(observerComponentNameFor(baseComponentName), function() {
      if (adm.mounted) {
        forceUpdate();
      } else {
        adm.changedBeforeMount = true;
      }
    });
    observerFinalizationRegistry.register(objectRetainedByReact, adm, adm);
  }
  import_react2.default.useDebugValue(adm.reaction, printDebugValue);
  import_react2.default.useEffect(function() {
    observerFinalizationRegistry.unregister(adm);
    adm.mounted = true;
    if (adm.reaction) {
      if (adm.changedBeforeMount) {
        adm.changedBeforeMount = false;
        forceUpdate();
      }
    } else {
      adm.reaction = new Reaction(observerComponentNameFor(baseComponentName), function() {
        forceUpdate();
      });
      forceUpdate();
    }
    return function() {
      adm.reaction.dispose();
      adm.reaction = null;
      adm.mounted = false;
      adm.changedBeforeMount = false;
    };
  }, []);
  var rendering;
  var exception;
  adm.reaction.track(function() {
    try {
      rendering = fn();
    } catch (e) {
      exception = e;
    }
  });
  if (exception) {
    throw exception;
  }
  return rendering;
}

// node_modules/mobx-react-lite/es/observer.js
var import_react3 = __toESM(require_react());
var warnObserverOptionsDeprecated = true;
var hasSymbol = typeof Symbol === "function" && Symbol.for;
var ReactForwardRefSymbol = hasSymbol ? Symbol.for("react.forward_ref") : typeof import_react3.forwardRef === "function" && (0, import_react3.forwardRef)(function(props) {
  return null;
})["$$typeof"];
var ReactMemoSymbol = hasSymbol ? Symbol.for("react.memo") : typeof import_react3.memo === "function" && (0, import_react3.memo)(function(props) {
  return null;
})["$$typeof"];
function observer(baseComponent, options) {
  var _a2;
  if (warnObserverOptionsDeprecated && options) {
    warnObserverOptionsDeprecated = false;
    console.warn("[mobx-react-lite] `observer(fn, { forwardRef: true })` is deprecated, use `observer(React.forwardRef(fn))`");
  }
  if (ReactMemoSymbol && baseComponent["$$typeof"] === ReactMemoSymbol) {
    throw new Error("[mobx-react-lite] You are trying to use `observer` on a function component wrapped in either another `observer` or `React.memo`. The observer already applies 'React.memo' for you.");
  }
  if (isUsingStaticRendering()) {
    return baseComponent;
  }
  var useForwardRef = (_a2 = options === null || options === void 0 ? void 0 : options.forwardRef) !== null && _a2 !== void 0 ? _a2 : false;
  var render = baseComponent;
  var baseComponentName = baseComponent.displayName || baseComponent.name;
  if (ReactForwardRefSymbol && baseComponent["$$typeof"] === ReactForwardRefSymbol) {
    useForwardRef = true;
    render = baseComponent["render"];
    if (typeof render !== "function") {
      throw new Error("[mobx-react-lite] `render` property of ForwardRef was not a function");
    }
  }
  var observerComponent = function(props, ref) {
    return useObserver(function() {
      return render(props, ref);
    }, baseComponentName);
  };
  if (baseComponentName !== "") {
    ;
    observerComponent.displayName = baseComponentName;
  }
  if (baseComponent.contextTypes) {
    ;
    observerComponent.contextTypes = baseComponent.contextTypes;
  }
  if (useForwardRef) {
    observerComponent = (0, import_react3.forwardRef)(observerComponent);
  }
  observerComponent = (0, import_react3.memo)(observerComponent);
  copyStaticProperties(baseComponent, observerComponent);
  if (true) {
    Object.defineProperty(observerComponent, "contextTypes", {
      set: function() {
        var _a3;
        throw new Error("[mobx-react-lite] `".concat(this.displayName || ((_a3 = this.type) === null || _a3 === void 0 ? void 0 : _a3.displayName) || "Component", ".contextTypes` must be set before applying `observer`."));
      }
    });
  }
  return observerComponent;
}
var hoistBlackList = {
  $$typeof: true,
  render: true,
  compare: true,
  type: true,
  // Don't redefine `displayName`,
  // it's defined as getter-setter pair on `memo` (see #3192).
  displayName: true
};
function copyStaticProperties(base, target) {
  Object.keys(base).forEach(function(key) {
    if (!hoistBlackList[key]) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(base, key));
    }
  });
}

// node_modules/mobx-react-lite/es/ObserverComponent.js
function ObserverComponent(_a2) {
  var children = _a2.children, render = _a2.render;
  var component = children || render;
  if (typeof component !== "function") {
    return null;
  }
  return useObserver(component);
}
if (true) {
  ObserverComponent.propTypes = {
    children: ObserverPropsCheck,
    render: ObserverPropsCheck
  };
}
ObserverComponent.displayName = "Observer";
function ObserverPropsCheck(props, key, componentName, location, propFullName) {
  var extraKey = key === "children" ? "render" : "children";
  var hasProp = typeof props[key] === "function";
  var hasExtraProp = typeof props[extraKey] === "function";
  if (hasProp && hasExtraProp) {
    return new Error("MobX Observer: Do not use children and render in the same time in`" + componentName);
  }
  if (hasProp || hasExtraProp) {
    return null;
  }
  return new Error("Invalid prop `" + propFullName + "` of type `" + typeof props[key] + "` supplied to `" + componentName + "`, expected `function`.");
}

// node_modules/mobx-react-lite/es/useLocalObservable.js
var import_react4 = __toESM(require_react());
function useLocalObservable(initializer, annotations) {
  return (0, import_react4.useState)(function() {
    return observable(initializer(), annotations, { autoBind: true });
  })[0];
}

// node_modules/mobx-react-lite/es/useLocalStore.js
var import_react6 = __toESM(require_react());

// node_modules/mobx-react-lite/es/useAsObservableSource.js
var import_react5 = __toESM(require_react());
var __read2 = function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
};
function useAsObservableSource(current) {
  if (true)
    useDeprecated("[mobx-react-lite] 'useAsObservableSource' is deprecated, please store the values directly in an observable, for example by using 'useLocalObservable', and sync future updates using 'useEffect' when needed. See the README for examples.");
  var _a2 = __read2((0, import_react5.useState)(function() {
    return observable(current, {}, { deep: false });
  }), 1), res = _a2[0];
  runInAction(function() {
    Object.assign(res, current);
  });
  return res;
}

// node_modules/mobx-react-lite/es/useLocalStore.js
function useLocalStore(initializer, current) {
  if (true)
    useDeprecated("[mobx-react-lite] 'useLocalStore' is deprecated, use 'useLocalObservable' instead.");
  var source = current && useAsObservableSource(current);
  return (0, import_react6.useState)(function() {
    return observable(initializer(source), void 0, { autoBind: true });
  })[0];
}

// node_modules/mobx-react-lite/es/index.js
var _a;
observerBatching(import_react_dom.unstable_batchedUpdates);
var clearTimers = (_a = observerFinalizationRegistry["finalizeAllImmediately"]) !== null && _a !== void 0 ? _a : function() {
};
function useObserver2(fn, baseComponentName) {
  if (baseComponentName === void 0) {
    baseComponentName = "observed";
  }
  if (true) {
    useDeprecated("[mobx-react-lite] 'useObserver(fn)' is deprecated. Use `<Observer>{fn}</Observer>` instead, or wrap the entire component in `observer`.");
  }
  return useObserver(fn, baseComponentName);
}
function useStaticRendering(enable) {
  if (true) {
    console.warn("[mobx-react-lite] 'useStaticRendering' is deprecated, use 'enableStaticRendering' instead");
  }
  enableStaticRendering(enable);
}
export {
  ObserverComponent as Observer,
  clearTimers,
  enableStaticRendering,
  isObserverBatched,
  isUsingStaticRendering,
  observer,
  observerBatching,
  useAsObservableSource,
  useLocalObservable,
  useLocalStore,
  useObserver2 as useObserver,
  useStaticRendering
};
//# sourceMappingURL=mobx-react-lite.js.map
