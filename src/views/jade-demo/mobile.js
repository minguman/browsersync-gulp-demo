var homeTpl = require('./demo.hbs');

var html = homeTpl({ data:'注意：这段文字是通过/demo.hbs来渲染的!'});


$('#bhs').html(html)