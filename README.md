# imProgress

imProgress is a wrapper of [NProgress.js][nprogress]
that automatically increases the bar's progress with each completed request (using an interceptor).

The loading bar increases a tiny bit with each completed request.

## How to use

Install:

```shell
bower install --save imProgress
```

Add the module to your app:

```javascript
angular.module('myApp', ['imProgress']);
```

## Configuration

Configuration can be done via the provider:

```javascript
angular.config(function (imProgressProvider) {
  imProgressProvider.configure({
    /* any configuration for NProgress */
  })
});
```

Documentation for NProgress can be found in [their repository][nprogress].

## Minimizing

Closure Compiler is used to minimize the code. It is minimized using this command

```bash
closure-compiler --js_output_file=angular-im-progress.min.js --compilation_level SIMPLE angular-im-progress.js
```

Advanced optimizations are not used because as of now the AngularJS codebase does not support it.

## Issues

Please file issues using GitHub's issue tracker.

## Contributing

Pull requests are more than welcome!

[nprogress]: https://github.com/rstacruz/nprogress
