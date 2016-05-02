declare var System

System.config({
  baseURL: '/',
  warnings: true,
  map: {
    'angular2': 'node_modules/angular2',
    'rxjs': 'node_modules/rxjs',
    '@ngrx/store': 'node_modules/@ngrx/store'
  },
  packages: {
    'angular2': {
      defaultExtension: 'js'
    },
    '@ngrx/store': {
      defaultExtension: 'js',
      main: 'index.js'
    },
    'rxjs': {
      defaultExtension: 'js',
      main: 'index.js'
    },
    'src': {
      defaultExtension: 'js'
    }
  }
})
