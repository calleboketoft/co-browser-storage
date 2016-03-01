declare var System

System.config({
  baseURL: '/',
  defaultJSExtensions: true,
  warnings: true,
  map: {
    'angular2': 'node_modules/angular2',
    'rxjs': 'node_modules/rxjs',
    '@ngrx/store': 'node_modules/@ngrx/store/dist'
  },
  packages: {
    '@ngrx/store': {
      main: 'index.js',
      defaultExtension: 'js'
    }
  }
})
