const path = require('path');

result = {}

result.entry = {
  'app': path.join(__dirname, '../src/app.js'),
  'main': path.join(__dirname, '../src/js/main.js'),
  'equipment': path.join(__dirname, '../src/js/equipment.js'),
  'kit': path.join(__dirname, '../src/js/kit.js'),
  'timing': path.join(__dirname, '../src/js/timing.js'),
  'employee': path.join(__dirname, '../src/js/employee.js'),
}

result.pages = [
  {chunks: ['app'], page: 'index.html', template: path.join(__dirname, '../src/index.html'), },
  {chunks: ['main'], page: 'pages/main.html', template: path.join(__dirname, '../src/pages/main.html'), },
  {chunks: ['equipment'], page: 'pages/equipment.html', template: path.join(__dirname, '../src/pages/equipment.html'), },
  {chunks: ['kit'], page: 'pages/kit.html', template: path.join(__dirname, '../src/pages/kit.html'), },
  {chunks: ['timing'], page: 'pages/timing.html', template: path.join(__dirname, '../src/pages/timing.html'), },
  {chunks: ['employee'], page: 'pages/employee.html', template: path.join(__dirname, '../src/pages/employee.html'), },
]

module.exports = result
