//author bh-lay
var http = require('http');
var layFile= require('./conf/layFile');
var session= require('./conf/session');

/*301  URL redirection*/
var url_redirect = require('./conf/301url');

/* render config*/
var dealModule = [
	{
		'name' : 'ajax',
		'reg': /^\/ajax\//,
		'require' :'ajax.js'
	},
	{
		'name' : 'admin',
		'reg': /^\/admin/,
		'require' :'admin.js'
	},
	{
		'name' : 'index',
		'reg': /^(\/|)$/,
		'require' :'templates/index.html.js'
	},
	{
		'name' : 'blogList',
		'reg': /^\/blog(\/|)$/,
		'require' :'templates/blogList.html.js'
	},
	{
		'name' : 'blogDetail',
		'reg': /^\/blog\/(\w+)/,
		'require' :'templates/blogDetail.html.js'
	},
	{
		'name' : 'shareList',
		'reg': /^\/share(\/|)$/,
		'require' :'templates/shareList.html.js'
	},
	{
		'name' : 'shareDetail',
		'reg': /^\/share\/(\w+)/,
		'require' :'templates/shareDetail.html.js'
	},
	{
		'name' : 'opusList',
		'reg': /^\/opus(\/|)$/,
		'require' :'templates/opusList.html.js'
	},
	{
		'name' : 'shareDetail',
		'reg': /^\/opus\/(\w+)/,
		'require' :'templates/opusDetail.html.js'
	},
];

/* templates config */
var templates = [
	/^(\/|)$/,
	/^\/admin/,
	/^\/blog(\/|)$/,
	/^\/blog\/(\w+)/,
	/^\/share(\/|)$/,
	/^\/share\/(\w+)/,
	/^\/opus(\/|)$/,
	/^\/opus\/(\w+)/,
];


/*server start*/
var server=http.createServer(function (req,res) {
	var pathname = req.url.split('?')[0];
	pathname = pathname.replace(/\.\./g, "");

//router
	var bingo=false;

	//first check 301 router
	if(url_redirect[pathname]){
		bingo = true;
		res.writeHead(301, {'location':url_redirect[pathname]});
		res.end();
	}else{
	//then check module next
		for(var i = 0,total = dealModule.length; i < total ;i++){
			if(!bingo&&pathname.match(dealModule[i]['reg'])){
				require('./'+dealModule[i]['require']).deal(req,res,pathname);
				bingo = true;
				break;
			}
		}
		// read static file 
		if(!bingo){
			layFile.read(req,res);
		}
	}
	//FIXME logger is not complete
	var logger={
		'time':new Date(),
		'ip':req['connection']['remoteAddress'],
		'url':req.url,
		'user-agent':req.headers['user-agent'],
	};
	console.log(logger);
}).listen(3000, '0.0.0.0');

