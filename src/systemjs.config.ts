declare var System

System.config({
  baseURL: '/',
  warnings: true,
  map: {
    'angular2': 'node_modules/angular2',
    'rxjs': 'node_modules/rxjs',
    '@ngrx/store': 'node_modules/@ngrx/store/dist'
  },
  packages: {
    'angular2': {
      defaultExtension: 'js'
    },
    '@ngrx/store': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    'rxjs': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    'src': {
      defaultExtension: 'js'
    }
  }
})
